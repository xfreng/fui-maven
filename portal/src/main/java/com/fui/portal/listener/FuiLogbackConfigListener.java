package com.fui.portal.listener;

import ch.qos.logback.core.joran.spi.JoranException;
import ch.qos.logback.ext.spring.LogbackConfigurer;
import ch.qos.logback.ext.spring.web.WebLogbackConfigurer;
import org.springframework.util.ClassUtils;
import org.springframework.util.ReflectionUtils;
import org.springframework.util.ResourceUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.util.WebUtils;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import java.io.FileNotFoundException;
import java.lang.reflect.Method;

/**
 * @Title logback日志监听
 * @Author sf.xiong on 2017/08/07.
 */
public class FuiLogbackConfigListener implements ServletContextListener {

    private static boolean exposeWebAppRoot(ServletContext var0) {
        String var1 = var0.getInitParameter("logbackExposeWebAppRoot");
        return var1 == null || Boolean.valueOf(var1).booleanValue();
    }

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        ServletContext context = servletContextEvent.getServletContext();
        if (exposeWebAppRoot(context)) {
            WebUtils.setWebAppRootSystemProperty(context);
        }

        String var1 = context.getInitParameter("logbackConfigLocation");
        if (var1 != null) {
            String[] var2 = StringUtils.tokenizeToStringArray(var1, ",; \t\n");
            int var3 = var2.length;
            int var4 = 0;

            while (var4 < var3) {
                String var5 = var2[var4];

                try {
                    //var5 = ServletContextPropertyUtils.resolvePlaceholders(var5, var0);
                    if (!ResourceUtils.isUrl(var5)) {
                        var5 = WebUtils.getRealPath(context, var5);
                    }

                    context.log("Initializing Logback from [" + var5 + "]");
                    LogbackConfigurer.initLogging(var5);
                    break;
                } catch (FileNotFoundException var8) {
                    context.log("No logback configuration file found at [" + var5 + "]");
                    ++var4;
                } catch (JoranException var9) {
                    throw new RuntimeException("Unexpected error while configuring logback", var9);
                }
            }
        }

        try {
            Class var10 = ClassUtils.forName("org.slf4j.bridge.SLF4JBridgeHandler", ClassUtils.getDefaultClassLoader());
            Method var11 = ReflectionUtils.findMethod(var10, "removeHandlersForRootLogger");
            if (var11 != null) {
                context.log("Removing all previous handlers for JUL to SLF4J bridge");
                ReflectionUtils.invokeMethod(var11, (Object) null);
            }

            Method var12 = ReflectionUtils.findMethod(var10, "install");
            if (var12 != null) {
                context.log("Installing JUL to SLF4J bridge");
                ReflectionUtils.invokeMethod(var12, (Object) null);
            }
        } catch (ClassNotFoundException var7) {
            context.log("JUL to SLF4J bridge is not available on the classpath");
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        WebLogbackConfigurer.shutdownLogging(servletContextEvent.getServletContext());
    }
}
