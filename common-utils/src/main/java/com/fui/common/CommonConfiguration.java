package com.fui.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.util.Properties;

/**
 * @Title 读取属性文件
 * @Author sf.xiong on 2017/09/05.
 */
public class CommonConfiguration {
    private static Properties env = null;

    private static ThreadLocal<Properties> currentThread = new ThreadLocal<Properties>();

    private static final Logger logger = LoggerFactory.getLogger(CommonConfiguration.class);

    static {
        env = currentThread.get();
        if (currentThread.get() == null) {
            currentThread.set(env = new Properties());
        }
        BufferedReader inStream = null;
        try {
            InputStream is = new BufferedInputStream(new FileInputStream(Thread.currentThread().getContextClassLoader().getResource("").getPath() + CommonConstants.CONFIG_FILE_NAME));
            inStream = new BufferedReader(new InputStreamReader(is, "UTF-8"));//解决读取properties文件中产生中文乱码的问题
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
        if (StringUtils.isNullOrEmpty(val)) {
            return defaultValue;
        }
        return val;
    }

    /**
     * 根据Key 获取值
     *
     * @param key
     * @param defaultValue 如果获取值为NULL, 返回defaultValue
     * @return
     */
    public static Integer getIntegerValue(String key, Integer defaultValue) {
        String val = env.getProperty(key);
        if (StringUtils.isNullOrEmpty(val)) {
            return defaultValue;
        }
        return Integer.valueOf(val);
    }
}