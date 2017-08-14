package com.fui.core;

import com.fui.common.MemCachedUtils;
import org.apache.log4j.Logger;

import java.io.File;

/**
 * @Author sf.xiong on 2017/6/29.
 */
public class FrameworkInfo {
    private static final Logger logger = Logger.getLogger(FrameworkInfo.class);

    private FrameworkInfo() {
        logger.info("********框架配置类********");
    }

    public static String getInfoGenDir() {
        return MemCachedUtils.getText("infogen.dir", System.getProperty("user.home") + File.separator + "infogen");
    }

    public static String getLoginBackground() {
        return MemCachedUtils.getText("login.background", "background");
    }

    public static String getProjectName() {
        return MemCachedUtils.getText("project.name", "jcoffee Demo");
    }

    public static String getLogo() {
        return MemCachedUtils.getText("logo", "logo.png");
    }

    public static String getDev() {
        return MemCachedUtils.getText("dev", "框架研发");
    }
}