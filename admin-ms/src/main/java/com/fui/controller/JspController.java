package com.fui.controller;

import com.alibaba.fastjson.JSONObject;
import com.fui.common.AbstractSuperController;
import com.fui.common.Constants;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;

@Controller
@RequestMapping(value = "/supervisor")
public class JspController extends AbstractSuperController {

    @RequestMapping("/timeout")
    public String timeout() {
        return "error/timeout";
    }

    @RequestMapping("/unAuthorized")
    public String unAuthorized() {
        return "error/unAuthorized";
    }

    @RequestMapping("/404")
    public String notFound() {
        return "error/404";
    }

    @RequestMapping("/500")
    public String serverError() {
        return "error/500";
    }

    @RequestMapping("/webuploader")
    public String webuploader() {
        return "webuploader/webuploader";
    }

    @RequestMapping("/webuploader/demo")
    public String webuploaderDemo() {
        return "demo/webuploader/demo";
    }

    /**
     * 上传图片
     *
     * @param request -- 必须写在方法参数里，否则会出现类型转换异常
     * @return url
     */
    @RequestMapping(value = "/uploadImages", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String uploadImages(HttpServletRequest request) throws Exception {
        JSONObject json = new JSONObject();
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
        MultipartFile multipartFile = multipartRequest.getFile(Constants.UPLOADS);
        String filePath = request.getSession().getServletContext().getRealPath("/upload") + File.separator;
        if (multipartFile != null) {
            File file = new File(filePath);
            if (!file.exists()) {
                file.mkdirs();
            }
            filePath += multipartFile.getOriginalFilename();
            try {
                multipartFile.transferTo(new File(filePath));
            } catch (IOException e) {
                logger.error(e.getMessage());
            }
            json.put("imageUrl", filePath);
            if (logger.isDebugEnabled()) {
                logger.debug("filePath = {}", filePath);
            }
        }
        return success(json);
    }
}
