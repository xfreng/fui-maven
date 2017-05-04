package com.fui.shiro;

import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

/**
 * @Title 自定义FormAuthenticationFilter
 * @Description 用于自定义实现基于Shiro的表单验证
 * @Author sf.xiong on 2017/04/25.
 */
public class FuiFormAuthenticationFilter extends FormAuthenticationFilter {
    private String loginSubmitUrl;  //登录提交url（FormAuthenticationFilter将登录页面url及提交url定义为一个属性）

    public String getLoginSubmitUrl() {
        return loginSubmitUrl;
    }

    public void setLoginSubmitUrl(String loginSubmitUrl) {
        this.loginSubmitUrl = loginSubmitUrl;
    }

    @Override
    protected boolean isLoginRequest(ServletRequest request, ServletResponse response) {
        return this.pathsMatch(this.getLoginSubmitUrl(), request);
    }

}
