package com.fui.common;

import com.fui.model.User;

public class UserUtils {
	public static User getSessionUser() {
		return (User) WebUtils.getCurrentRequest().getSession(false).getAttribute("userObject");
	}

	public static String getLoginId() {
		return getSessionUser().getEname();
	}

	public static String getLoginName() {
		return getSessionUser().getCname();
	}
}
