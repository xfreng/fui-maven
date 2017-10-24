package com.fui.portal.service.appservice.common;

import com.fui.common.CommonConfiguration;

/**
 * @Title 前段常量
 * @Author sf.xiong on 2017/10/24.
 */
public interface PortalConstants {

    //APP请求传输是否加密
    boolean YN_ENCRYPTION = "1".equals(CommonConfiguration.getValue("yn.encryption"));

    //APP请求传输是否解密
    boolean YN_DECRYPT = "1".equals(CommonConfiguration.getValue("yn.decrypt"));
}