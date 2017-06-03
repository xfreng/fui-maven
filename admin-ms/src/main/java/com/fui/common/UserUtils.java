package com.fui.common;

import com.fui.model.ManageToken;
import com.fui.model.User;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;

public class UserUtils {

    public static Subject getSubject() {
        return SecurityUtils.getSubject();
    }

    /**
     * 更换主题后刷新当前用户信息
     *
     * @param style
     * @param menuType
     */
    public static void updateCurrent(String style, String menuType) {
        User user = getCurrent();
        user.setStyle(style);
        user.setMenuType(menuType);
    }

    /**
     * 获取当前用户信息
     *
     * @return 当前用户信息
     */
    public static User getCurrent() {
        return (User) getSubject().getPrincipal();
    }

    /**
     * 是否拥有某个权限
     *
     * @param perm 权限id
     * @return 是true 否false
     */
    public static boolean hasPermission(String perm) {
        return getSubject().isPermitted(perm);
    }

    /**
     * 获取session中的token
     *
     * @return ManageToken
     */
    public static ManageToken getManageToken() {
        Object manageTokenObject = WebUtils.getCurrentRequest().getSession(false).getAttribute(Constants.USER_SESSION_ID);
        return manageTokenObject == null ? null : (ManageToken) manageTokenObject;
    }
}
