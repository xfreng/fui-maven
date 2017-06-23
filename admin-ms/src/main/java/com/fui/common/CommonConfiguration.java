package com.fui.common;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * @Title 读取属性文件
 * @Author sf.xiong on 2016/10/24.
 */
public class CommonConfiguration {
    private static Properties env = new Properties();

    private static final Logger logger = LoggerFactory.getLogger(CommonConfiguration.class);

    static {
        InputStream inStream = null;
        try {
            inStream = Thread.currentThread().getContextClassLoader().getResourceAsStream(Constants.CONFIG_FILE_NAME);
            env.load(inStream);
        } catch (IOException e) {
            logger.error("loading configuration file exception!", e);
        } finally {
            if (inStream != null) {
                try {
                    inStream.close();
                } catch (IOException e) {
                    logger.error("close stream for configuration file exception!", e);
                }
            }
        }
    }

    public static String getValue(String key) {
        return getValue(key, "");
    }

    /**
     * 根据Key 获取值
     *
     * @param key
     * @param defaultValue 如果获取值为NULL, 返回defaultValue
     * @return
     */
    public static String getValue(String key, String defaultValue) {
        String val = env.getProperty(key);
        if (StringUtils.isBlank(val)) {
            return defaultValue;
        }
        return val;
    }
}
