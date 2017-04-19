package com.fui.common;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * @Title
 * @Author 熊世凤 on 2017/4/15.
 * @Copyright © 蜂投网 2015 ~ 2017
 */
public class GsonUtils {
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
}
