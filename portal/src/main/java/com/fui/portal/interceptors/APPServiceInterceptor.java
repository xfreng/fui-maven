package com.fui.portal.interceptors;

import com.alibaba.fastjson.JSONObject;
import com.fui.portal.service.appservice.common.DES3EncryptAndEdcrypt;
import com.fui.portal.service.appservice.common.DigestUtils;
import com.fui.portal.service.appservice.common.GsonUtils;
import com.fui.portal.service.appservice.common.PortalConstants;
import com.fui.portal.service.appservice.message.APPMessage;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.InputStreamReader;

/**
 * @Title APP接口服务拦截器
 * @Description 所有APP接口服务均被拦截处理
 * @Author sf.xiong on 2017/08/04.
 */
public class APPServiceInterceptor extends HandlerInterceptorAdapter {
    private static final Logger logger = LoggerFactory.getLogger(APPServiceInterceptor.class); //日志服务
    private static final int KEY_LENGTH = 32;  //MD5签名长度

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        boolean flag = true;
        boolean encrypt = false;

        //接收客户端请求消息（JSON）
        String requestUrl = String.valueOf(request.getRequestURL());

        String reqJsonEncrypt = request.getParameter("data");//H5的jQuery Ajax接收请求数据
        if (StringUtils.isBlank(reqJsonEncrypt)) {//原生app或非jQuery Ajax的H5接收请求数据
            StringBuilder requestJsonBuilder = new StringBuilder();
            BufferedReader in = new BufferedReader(new InputStreamReader(request.getInputStream(), "UTF-8"));
            String inputLine = null;
            while ((inputLine = in.readLine()) != null) {
                requestJsonBuilder.append(inputLine);
            }
            in.close();
            reqJsonEncrypt = requestJsonBuilder.toString();
        }
        logger.info("APP请求 => url:{} \t params:{} ", requestUrl, reqJsonEncrypt);

        //消息解析、基础校验
        if (StringUtils.isBlank(reqJsonEncrypt)) {
            logger.error("reqJsonEncrypt is empty");
            return flag;
        }
        if (StringUtils.isBlank(reqJsonEncrypt) || reqJsonEncrypt.length() <= KEY_LENGTH) {
            logger.error("reqJsonEncrypt format error");
            return flag;
        }

        //消息解密
        String dataJson = null;
        String key = "";
        if (PortalConstants.IS_DECRYPTION) {//需要解密
            key = reqJsonEncrypt.substring(0, KEY_LENGTH);
            String dataJsonEncrypt = reqJsonEncrypt.substring(KEY_LENGTH);
            logger.info("key: " + key);
            encrypt = true;
            try {
                dataJson = DES3EncryptAndEdcrypt.DES3DecryptMode(dataJsonEncrypt);
                logger.info("data原文: " + dataJson);
            } catch (Exception e) {
                logger.error("解密错误：" + e);
                return flag;
            }
        } else {
            dataJson = reqJsonEncrypt;
        }


        //转换为消息对象
        APPMessage requestMsg = null;
        try {
            JSONObject json = GsonUtils.fromJson(dataJson, JSONObject.class);
            if (json.get("data") != null) {
                requestMsg = GsonUtils.fromJson(json.getJSONObject("data").toJSONString(), APPMessage.class);
            } else {
                requestMsg = GsonUtils.fromJson(dataJson, APPMessage.class);
            }
            requestMsg.setKey(key);
        } catch (Exception e) {
            logger.error("转换消息对象异常：" + e);
            return flag;
        }

        //transcode必填校验
        String transcode = requestMsg.getTranscode();
        if (StringUtils.isBlank(transcode)) {
            logger.error("transcode is required");
            return flag;
        }
        if (encrypt) {
            //MD5校验(data的值+transcode的值)
            String keyCheck = null;
            try {
                keyCheck = DigestUtils.md5(dataJson + transcode).toUpperCase();
            } catch (Exception e) {
                logger.error("MD5异常：" + e);
                return flag;
            }
            if (!key.equals(keyCheck)) {
                logger.error("key error");
                return flag;
            }
        }

        //将消息对象放入request，供APP接口服务使用
        request.setAttribute("requestMsg", requestMsg);

        return flag;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        super.postHandle(request, response, handler, modelAndView);
    }

}