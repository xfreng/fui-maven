package com.fui.portal.service.appservice.common;

import com.fui.common.CommonConfiguration;

/**
 * @Title 前段常量
 * @Author sf.xiong on 2017/10/24.
 */
public interface PortalConstants {

    //APP请求传输是否加密
    boolean IS_ENCRYPTION = "1".equals(CommonConfiguration.getValue("yn.encryption"));

    //APP请求传输是否解密
    boolean IS_DECRYPTION = "1".equals(CommonConfiguration.getValue("yn.decryption"));

    //文件上传目录
    String FILE_UPLOAD_DIR = CommonConfiguration.getValue("file.upload.dir");
    String FILE_UPLOAD_CONTEXT_PATH = CommonConfiguration.getValue("file.upload.context.path");
    String SERVER_HOST = CommonConfiguration.getValue("server.host");
}