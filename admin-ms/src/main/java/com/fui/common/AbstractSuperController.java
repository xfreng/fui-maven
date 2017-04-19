package com.fui.common;

import com.talkyun.apus.mybatis.plugin.Page;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;


public abstract class AbstractSuperController {

    @Autowired
    protected HttpServletRequest request;

    /**
     * 分页功能
     *
     * @param currPage 当前页数
     * @param pageSize 每页显示数量
     * @return 分页结果
     */
    protected Page createPagination(Integer currPage, Integer pageSize) {
        Page page = new Page();
        page.setCurrentPage(currPage == 0 ? 1 : currPage);
        page.setShowCount(pageSize);
        return page;
    }

    /**
     * json对象处理
     *
     * @param target 数据对象
     * @return 数据集对象的json
     */
    protected String success(Object target) {
        return GsonUtils.toJson(target);
    }

    /**
     * json对象处理
     *
     * @param list 数据集
     * @param key  json对应的key
     * @return 数据集对象的json
     */
    protected String success(Collection list, String key) {
        return success(list, 0, key);
    }

    /**
     * 分页处理
     *
     * @param list        分页查询结果
     * @param totalResult 总条数
     * @return 页面分页展示的json
     */
    protected String success(Collection list, Integer totalResult) {
        return success(list, totalResult, "data");
    }

    /**
     * 分页处理
     *
     * @param list        分页查询结果
     * @param totalResult 总条数
     * @param key         json对应的key
     * @return 分页展示的json
     */
    protected String success(Collection list, Integer totalResult, String key) {
        Map<String, Object> target = new HashMap<String, Object>();
        if (totalResult.intValue() != 0) {
            target.put("total", totalResult);
        }
        if (StringUtils.isNotEmpty(key)) {
            target.put(key, list);
        }
        return GsonUtils.toJson(target);
    }

}