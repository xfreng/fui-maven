package com.fui.service;

import com.alibaba.fastjson.JSONObject;
import com.fui.common.AbstractSuperService;
import com.fui.dao.shiro.RolesMapper;
import com.fui.model.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("roleService")
public class RoleService extends AbstractSuperService {
    @Autowired
    private RolesMapper rolesMapper;

    /**
     * 分页查询角色信息
     *
     * @param params 查询条件
     * @return 角色信息列表
     */
    public List<Roles> getRolesList(Map<String, Object> params) {
        return rolesMapper.getRolesList(params);
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
     * @return 操作信息
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
        json.put("message", i > 0 ? "角色添加成功" : "角色添加失败");
        return json;
    }

    /**
     * 修改角色
     *
     * @param roles
     * @return 操作信息
     */
    public JSONObject updateRoles(Roles roles) {
        JSONObject json = new JSONObject();
        int i = rolesMapper.updateByPrimaryKeySelective(roles);
        json.put("message", i > 0 ? "角色修改成功" : "角色修改失败");
        return json;
    }

    /**
     * 获取用户权限
     *
     * @param userId
     * @return 用户权限
     */
    public String getUserRights(Long userId) {
        return rolesMapper.getUserRights(userId);
    }
}
