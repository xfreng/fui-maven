package com.fui.shiro;

import com.fui.common.StringUtils;
import org.apache.shiro.authz.Permission;

/**
 * @Title 自定义权限解析及授权匹配
 * @Description 用于实现基于Shiro的自定义权限解析、授权匹配
 * @Author sf.xiong on 2017/04/25.
 */
public class FuiPermission implements Permission {
    private String code;  //权限编码
    private String url;   //权限对应的资源url

    public FuiPermission(String code, String url) {
        this.code = code;
        this.url = url;
    }

    public FuiPermission(String permissionStr) {
        if (permissionStr.startsWith("/")) {  //url以/开头
            url = permissionStr;
        } else {
            code = permissionStr;
        }
    }

    /**
     * 自定义授权是否匹配的逻辑
     * 这里的实现，是将 Realm 中给出的 Permission 和 自定义的 FuiPermissionResolver 中指定的 FuiPermission 进行比对
     * 比对的规则完全自定义
     *
     * @param permission
     * @return
     */
    @Override
    public boolean implies(Permission permission) {
        if (!(permission instanceof FuiPermission)) {
            return false;
        }
        FuiPermission mp = (FuiPermission) permission;
        if (StringUtils.isNullOrEmpty(mp.code)) {// 解决oracle下会报npe异常
            mp = new FuiPermission("", mp.url);
        }
        if (StringUtils.isNullOrEmpty(url)) {// 解决oracle下会报npe异常
            this.url = "";
        }
        //编码及url匹配其一，即认为成功
        if (code.equals(mp.code) || url.equals(mp.url)) {
            return true;
        }
        return false;
    }

    @Override
    public String toString() {
        return "FuiPermission{" +
                "code='" + code + '\'' +
                ", url='" + url + '\'' +
                '}';
    }
}
