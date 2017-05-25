package com.fui.shiro;

import com.fui.common.Constants;
import com.fui.dao.shiro.PermissionsMapper;
import com.fui.dao.shiro.RolesMapper;
import com.fui.dao.shiro.UserRolesMapper;
import com.fui.dao.user.UserMapper;
import com.fui.model.Permissions;
import com.fui.model.User;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.Permission;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

/**
 * @Title 自定义realms
 * @Description 用于实现基于Shiro的认证及授权
 * @Author sf.xiong on 2017/04/25.
 */
public class FuiRealm extends AuthorizingRealm {
    private static final Logger logger = LoggerFactory.getLogger(FuiRealm.class);

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private UserRolesMapper userRolesMapper;
    @Autowired
    private RolesMapper rolesMapper;
    @Autowired
    private PermissionsMapper permissionsMapper;

    //实现用户的认证
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken) throws AuthenticationException {
        logger.info("doGetAuthenticationInfo: {}", authcToken.toString());
        String userCode = ((UsernamePasswordToken) authcToken).getUsername();
        //从DB获取当前用户的认证信息
        User user = userMapper.findUserByCode(userCode);
        if (user != null) {
            if (!user.getErased()) {
                return new SimpleAuthenticationInfo(user, user.getPassword(), getName());
            } else {
                throw new LockedAccountException(); //账户被禁用
            }
        } else {
            return null;
        }
    }

    //实现用户的授权
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        User user = (User) principals.getPrimaryPrincipal();
        List<Permissions> permissionsList;
        //从DB获取当前用户的权限信息
        if (Constants.SUPER_USER_ID.equals(user.getEname())) {  //超级管理员拥有所有权限
            permissionsList = permissionsMapper.selectAllRight();
        } else {  //其他用户根据角色获取权限
            permissionsList = new ArrayList<Permissions>();
            List<Long> roleIdList = userRolesMapper.selectRolesByAgentId(user.getId());
            String[] rolePermissions;
            List<String> permissionIdList = new ArrayList<String>();
            Permissions permission;
            for (Long roleId : roleIdList) {
                rolePermissions = rolesMapper.selectByPrimaryKey(roleId).getPermissions().split(",");
                for (String rolePermission : rolePermissions) {
                    if (!permissionIdList.contains(rolePermission)) {
                        permissionIdList.add(rolePermission);
                        permission = permissionsMapper.selectByPrimaryKey(Long.valueOf(rolePermission));
                        if (permission != null) {
                            permissionsList.add(permission);
                        }
                    }
                }
            }
        }

        //转换为自定义shiro权限
        List<Permission> fuiPermissionList = new ArrayList<Permission>();
        for (Permissions permitInfo : permissionsList) {
            if (StringUtils.isNotBlank(permitInfo.getUrl()) && permitInfo.getUrl().contains(",")) {
                //一个权限可能涉及多个URL
                String[] permits = permitInfo.getUrl().split(",");
                for (String permit : permits) {
                    fuiPermissionList.add(new FuiPermission(permitInfo.getCode(), permit));
                }
            } else {
                fuiPermissionList.add(new FuiPermission(permitInfo.getCode(), permitInfo.getUrl()));
            }
        }

        //为当前用户设置权限
        SimpleAuthorizationInfo simpleAuthorInfo = new SimpleAuthorizationInfo();
        simpleAuthorInfo.addObjectPermissions(fuiPermissionList); //.addStringPermissions(permissionCodeList);
        logger.info("SimpleAuthorizationInfo: permissions={}", fuiPermissionList.toString());
        return simpleAuthorInfo;
    }

}
