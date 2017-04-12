package com.fui.common;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

public class WebUtils {

	/**
	 * 获取当前请求对象
	 * @return HttpServletRequest
	 */
	public static HttpServletRequest getCurrentRequest() {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
				.getRequest();
		return request;
	}
}
