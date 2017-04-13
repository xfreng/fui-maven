package com.fui.interceptor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LoginInterceptor extends HandlerInterceptorAdapter {
    private final Logger log = LoggerFactory.getLogger(LoginInterceptor.class);
    private String[] allowUrls;

    public void setAllowUrls(String[] allowUrls) {
        this.allowUrls = allowUrls;
    }

    /**
     * 在业务处理器处理请求之前被调用 如果返回false 从当前的拦截器往回执行所有拦截器的afterCompletion(),再退出拦截器链
     * <p>
     * 如果返回true 执行下一个拦截器,直到所有的拦截器都执行完毕 再执行被拦截的Controller 然后进入拦截器链,
     * 从最后一个拦截器往回执行所有的postHandle() 接着再从最后一个拦截器往回执行所有的afterCompletion()
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        log.trace("==============执行顺序: 1、preHandle================");
        String requestUri = request.getRequestURI();

        log.trace("requestUri:" + requestUri);

        String xrequestedwith = request.getHeader("x-requested-with");

        log.trace("xrequestedwith:" + xrequestedwith);

        for (String url : allowUrls) {
            if (requestUri.endsWith(url)) {
                return true;
            }
        }

        Object userObject = request.getSession().getAttribute("userObject");
        if (userObject == null) {
            log.trace("Interceptor：跳转到login页面！");
            if ("XMLHttpRequest".equalsIgnoreCase(xrequestedwith)) {
                response.sendRedirect(request.getContextPath() + "/timeout");
                /*BufferedWriter writer = null;
                response.setContentType("application/json; charset=utf-8");
                try {
                    writer = new BufferedWriter(new OutputStreamWriter(response.getOutputStream(), "UTF-8"));
                    writer.write("登录超时，请重新登录！");
                    writer.flush();
                } catch (IOException e) {
                    log.error("将信息 {} 写入response异常", "登录超时，请重新登录！", e);
                } finally {
                    writer.close();
                }*/
            } else {
                response.sendRedirect(request.getContextPath() + "/timeout");
            }
            return false;
        } else {
            return true;
        }
    }

    /**
     * 在业务处理器处理请求执行完成后,生成视图之前执行的动作 可在modelAndView中加入数据，比如当前时间
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {
        log.trace("==============执行顺序: 2、postHandle================");
    }

    /**
     * 在DispatcherServlet完全处理完请求后被调用,可用于清理资源等
     * <p>
     * 当有拦截器抛出异常时,会从当前拦截器往回执行所有的拦截器的afterCompletion()
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
        log.trace("==============执行顺序: 3、afterCompletion================");
    }

}
