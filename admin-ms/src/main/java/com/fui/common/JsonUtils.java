package com.fui.common;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collection;
import java.util.Date;
import java.util.List;

/**
 * @Title
 * @Author sf.xiong on 2017/5/3.
 */
public class JsonUtils {
    private static final Logger logger = LoggerFactory.getLogger(JsonUtils.class);

    /**
     * 默认的 {@code JSON} 日期/时间字段的格式化模式。
     */
    public static final String DEFAULT_DATE_PATTERN = "yyyy-MM-dd HH:mm:ss";

    /**
     * 转成json数组
     *
     * @param list
     * @return
     */
    public static List toJsonArray(Collection list) {
        return toJsonArray(list, null);
    }

    /**
     * 转成json数组
     *
     * @param list
     * @param datePattern
     * @return
     */
    public static List toJsonArray(Collection list, String datePattern) {
        JsonConfig jsonConfig = new JsonConfig();
        if (StringUtils.isNullOrEmpty(datePattern)) {
            datePattern = DEFAULT_DATE_PATTERN;
        }
        jsonConfig.registerJsonValueProcessor(Date.class, new JsonDateValueProcessor(datePattern));
        List jsonArray = JSONArray.fromObject(list, jsonConfig);
        return jsonArray;
    }
}
