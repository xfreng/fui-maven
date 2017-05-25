package com.fui.service;

import com.alibaba.fastjson.JSONObject;
import com.fui.dao.shiro.RolesMapper;
import com.fui.model.Roles;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("roleService")
public class RoleService {
    private final Logger logger = LoggerFactory.getLogger(RoleService.class);

    @Autowired
    private RolesMapper rolesMapper;

    /**
     * 分页查询角色信息
     *
     * @param params 查询条件
     * @return 角色信息列表
     */
    public List<Roles> getRolesList_page(Map<String, Object> params) {
        List<Roles> rolesList = rolesMapper.getRolesList_page(params);
        return rolesList;
    }

    /**
     * 根据角色编码查询角色信息
     *
     * @param roleCode
     * @return Roles
     */
    public Roles findRolesByCode(String roleCode) {
        return rolesMapper.findRolesByCode(roleCode);
    }

    /**
     * 新增角色
     *
     * @param roles
     * @return
     */
    public JSONObject addRoles(Roles roles) {
        JSONObject json = new JSONObject();
        Roles oldRoles = findRolesByCode(roles.getRoleCode());
        if (oldRoles != null) {
            json.put("result", "0");
            json.put("message", "角色编码已经存在");
            return json;
        }
        int i = rolesMapper.insert(roles);
        json.put("result", i > 0 ? "1" : "0");
        return json;
    }
}
