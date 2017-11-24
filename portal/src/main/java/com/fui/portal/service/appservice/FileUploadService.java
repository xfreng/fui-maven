package com.fui.portal.service.appservice;

import com.fui.common.GeneratorUniqueID;
import com.fui.portal.service.appservice.common.AbstractSuperService;
import com.fui.portal.service.appservice.common.ErrCodeAndMsg;
import com.fui.portal.service.appservice.common.PortalConstants;
import com.fui.portal.service.appservice.message.APPMessage;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.io.IOException;
import java.util.List;

/**
 * @Title 文件上传服务处理类
 * @Author sf.xiong on 2017-11-23.
 */
@Service("fileUploadService")
public class FileUploadService extends AbstractSuperService {
    /**
     * 上传服务
     */
    public void handleRequest(MultipartHttpServletRequest request, APPMessage responseMsg) {
        //上传文件
        try {
            List<MultipartFile> files = request.getFiles("file");
            String[] filePath = new String[files.size()];
            for (int i = 0; i < files.size(); i++) {
                MultipartFile multipartFile = files.get(i);
                String filePathStr = fileHandle(multipartFile);
                if (StringUtils.isBlank(filePathStr)) {
                    responseMsg.setErrCodeAndMsg(ErrCodeAndMsg.FAIL);
                    return;
                }
                filePath[i] = filePathStr;
                if (logger.isDebugEnabled()) {
                    logger.debug(" filePath = {}", filePathStr);
                }
            }
            responseMsg.setErrCodeAndMsg(ErrCodeAndMsg.SUCCESS);
        } catch (Exception e) {
            responseMsg.setErrCodeAndMsg(ErrCodeAndMsg.FAIL);
        }
    }

    protected String fileHandle(MultipartFile multipartFile) {
        String serverHost = PortalConstants.SERVER_HOST + PortalConstants.FILE_UPLOAD_CONTEXT_PATH + "/" + com.fui.common.StringUtils.generatorSubDir();
        String filePath = PortalConstants.FILE_UPLOAD_DIR + File.separator + PortalConstants.FILE_UPLOAD_CONTEXT_PATH + File.separator + com.fui.common.StringUtils.generatorSubDir();
        //生成保存的文件名
        String fileName = getFileName(multipartFile.getOriginalFilename());
        if (multipartFile != null) {
            File file = new File(filePath);
            if (!file.exists()) {
                file.mkdirs();
            }
            filePath += fileName;
            serverHost += fileName;
            try {
                File saveFile = new File(filePath);
                multipartFile.transferTo(saveFile);
            } catch (IOException e) {
                logger.error(e.getMessage());
            }
            if (logger.isDebugEnabled()) {
                logger.debug("filePath = {}", filePath);
            }
        }
        return serverHost;
    }

    protected String getFileName(String fileName) {
        int len = fileName.lastIndexOf(".");
        if (len != -1) {
            String suffix = fileName.substring(len);
            fileName = GeneratorUniqueID.createToken() + suffix;
        }
        return fileName;
    }
}