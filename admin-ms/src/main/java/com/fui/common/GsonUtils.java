package com.fui.common;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @Title 通用转换类
 * @Author sf.xiong on 2017/4/15.
 */
public class GsonUtils {
    private static final Logger logger = LoggerFactory.getLogger(GsonUtils.class);

    /**
     * 默认的 {@code JSON} 日期/时间字段的格式化模式。
     */
    public static final String DEFAULT_DATE_PATTERN = "yyyy-MM-dd HH:mm:ss";

    /**
     * 将给定的目标对象根据指定的条件参数转换成 {@code JSON} 格式的字符串
     *
     * @param target 目标对象
     * @return 目标对象的 {@code JSON} 格式的字符串
     */
    public static String toJson(Object target) {
        GsonBuilder builder = new GsonBuilder();
        builder.setDateFormat(DEFAULT_DATE_PATTERN);
        Gson gson = builder.create();
        return gson.toJson(target);
    }

    /**
     * 将给定的 {@code JSON} 字符串转换成指定的类型对象。<strong>此方法通常用来转换普通的 {@code JavaBean}
     * 对象。</strong>
     *
     * @param <T>   要转换的目标类型。
     * @param json  给定的 {@code JSON} 字符串。
     * @param clazz 要转换的目标类。
     * @return 给定的 {@code JSON} 字符串表示的指定的类型对象。
     */
    public static <T> T fromJson(String json, Class<T> clazz) {
        return fromJson(json, clazz, null);
    }

    /**
     * 将给定的 {@code JSON} 字符串转换成指定的类型对象。<strong>此方法通常用来转换普通的 {@code JavaBean}
     * 对象。</strong>
     *
     * @param <T>         要转换的目标类型。
     * @param json        给定的 {@code JSON} 字符串。
     * @param clazz       要转换的目标类。
     * @param datePattern 日期格式模式。
     * @return 给定的 {@code JSON} 字符串表示的指定的类型对象。
     */
    public static <T> T fromJson(String json, Class<T> clazz, String datePattern) {
        if (!StringUtils.isNotEmpty(json)) {
            return null;
        }
        GsonBuilder builder = new GsonBuilder();
        if (StringUtils.isNotEmpty(datePattern)) {
            datePattern = DEFAULT_DATE_PATTERN;
        }
        builder.setDateFormat(datePattern);
        Gson gson = builder.create();
        try {
            return gson.fromJson(json, clazz);
        } catch (Exception ex) {
            logger.error(json + " 无法转换为 " + clazz.getName() + " 对象!", ex);
            return null;
        }
    }
}
