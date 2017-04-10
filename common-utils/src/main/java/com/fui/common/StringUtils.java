package com.fui.common;

public class StringUtils {
	/**
	 * 判断字符串是不为空
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isNotEmpty(String str) {
		boolean bool = false;
		if (str != null && str.trim().length() > 0) {
			bool = true;
		}
		return bool;
	}

	public static boolean isNullOrEmpty(Object obj) {
		return obj == null || "".equals(obj.toString());
	}
}
