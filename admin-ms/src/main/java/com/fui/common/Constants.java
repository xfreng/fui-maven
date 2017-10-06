package com.fui.common;

/**
 * @Title 通用变量
 * @Author sf.xiong on 2017/4/15.
 */
public interface Constants {
    // 响应JSON格式
    String MediaType_APPLICATION_JSON = "application/json;charset=utf-8";

    // 响应HTML格式
    String MediaType_APPLICATION_HTML = "text/html;charset=UTF-8";

    // 超级管理员用户名
    String SUPER_USER_ID = "admin";

    // 默认用户密码
    String DEFAULT_USER_PWD = "888888";

    // 用户session对象ID
    String USER_SESSION_ID = "userObject";

    // 随机数字符串
    String RAND_STRING = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    // 默认样式
    String DEFAULT_STYLE = "default";

    // 树根节点id
    String TREE_ROOT_ID = "root";

    // 前台分页总条数
    String PAGE_TOTAL = "total";

    // 前台分页json名
    String PAGE_KEY_NAME = "data";

    // 图片上传请求参数
    String UPLOADS = "file";
}
