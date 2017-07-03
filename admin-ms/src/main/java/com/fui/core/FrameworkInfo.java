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
    }

    public static String getInfoGenDir() {
        return MemCachedUtils.getText("infogen.dir", System.getProperty("user.home") + File.separator + "infogen");
    }

    public static String getProjectName() {
        return MemCachedUtils.getText("projectName", "fuiPlat4j");
    }

    public static String getLogo() {
        return MemCachedUtils.getText("logo", "logo.png");
    }

    public static String getDev() {
        return MemCachedUtils.getText("dev", "框架研发");
    }
}