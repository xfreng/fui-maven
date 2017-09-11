package com.fui.service;

import com.alibaba.fastjson.JSONObject;
import com.fui.common.AbstractSuperService;
import com.fui.common.JsonUtils;
import com.fui.common.StringUtils;
import com.fui.dao.shiro.PermissionsMapper;
import com.fui.model.Permissions;
import com.fui.model.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service("rightService")
public class RightService extends AbstractSuperService {
    @Autowired
    private PermissionsMapper rightMapper;

    @Autowired
    private RoleService roleService;

    /**
     * 分页查询权限信息
     *
     * @param params 查询条件
     * @return 权限信息列表
     */
    public List<Permissions> getRightsList(Map<String, Object> params) {
        List<Permissions> rightsList = rightMapper.getRightsList(params);
        return rightsList;
    }

    /**
     * 查询指定id对应的权限
     *
     * @param id       主键
     * @param roleCode 角色编码
     * @return 相匹配的权限信息
     */
    public List<Map<String, Object>> selectRightByKey(String id, String roleCode) {
        List<Map<String, Object>> rights = new ArrayList<Map<String, Object>>();
        if (StringUtils.isNotEmpty(roleCode)) {
            Roles roles = roleService.findRolesByCode(roleCode);
            if (roles != null) {
                String permissions = roles.getPermissions();
                if (StringUtils.isNotEmpty(permissions)) {
                    List<String> permissionList = StringUtils.asList(permissions, ",");
                    List<Permissions> rightList = rightMapper.selectAllRight();
                    for (Permissions rightTree : rightList) {
                        net.sf.json.JSONObject treeNode = net.sf.json.JSONObject.fromObject(rightTree);
                        checkHasRole(treeNode, permissionList);
                        rights.add(treeNode);
                    }
                }
            }
        } else {
            List<Permissions> rightTrees = rightMapper.selectByKey(Long.valueOf(id));
            List rightList = JsonUtils.toJsonArray(rightTrees);
            for (Object rightTree : rightList) {
                net.sf.json.JSONObject treeNode = (net.sf.json.JSONObject) rightTree;
                List<Permissions> nodes = rightMapper.selectByKey(treeNode.getLong("id"));
                if (nodes.size() > 0) {
                    treeNode.put("isLeaf", false);
                    treeNode.put("expanded", false);
                }
                rights.add(treeNode);
            }
        }
        return rights;
    }

    /**
     * 检查角色是否已授权角色
     *
     * @param permission
     * @param permissionList
     */
    private void checkHasRole(net.sf.json.JSONObject permission, List<String> permissionList) {
        List<Permissions> nodes = rightMapper.selectByKey(permission.getLong("id"));
        if (nodes.size() > 0) {
            permission.put("isLeaf", false);
            permission.put("expanded", true);
            for (Permissions right : nodes) {
                net.sf.json.JSONObject node = net.sf.json.JSONObject.fromObject(right);
                checkHasRole(node, permissionList);
            }
        } else {
            if (permissionList.contains(permission.getString("id"))) {
                permission.put("checked", true);
            }
        }
    }

    /**
     * 根据角色编码查询权限
     *
     * @param roleCode
     * @return 相匹配的权限信息
     */
    public List<Map<String, Object>> selectRightByRoleCode(String roleCode) {
        List<Map<String, Object>> rights = new ArrayList<Map<String, Object>>();
        Roles roles = roleService.findRolesByCode(roleCode);
        if (roles != null) {
            String permissions = roles.getPermissions();
            List<String> permissionList = StringUtils.asList(permissions, ",");
            for (String rightId : permissionList) {
                Permissions right = rightMapper.selectByPrimaryKey(Long.valueOf(rightId));
                if (right != null) {
                    net.sf.json.JSONObject treeNode = net.sf.json.JSONObject.fromObject(right);
                    List<Permissions> nodes = rightMapper.selectByKey(treeNode.getLong("id"));
                    if (nodes.size() > 0) {
                        treeNode.put("isLeaf", false);
                        treeNode.put("expanded", true);
                    }
                    rights.add(treeNode);
                }
            }
        }
        return rights;
    }

    /**
     * 查询根目录权限
     *
     * @return 所有根目录权限信息
     */
    public List<Permissions> selectRootRight() {
        return rightMapper.selectRootRight();
    }

    /**
     * 根据权限编码查询权限信息
     *
     * @param rightCode
     * @return Permissions
     */
    public Permissions findRightsByCode(String rightCode) {
        return rightMapper.findRightsByCode(rightCode);
    }

    /**
     * 新增权限
     *
     * @param rights
     * @return 操作信息
     */
    public JSONObject addRights(Permissions rights) {
        JSONObject json = new JSONObject();
        Permissions oldRights = findRightsByCode(rights.getCode());
        if (oldRights != null) {
            json.put("result", "0");
            json.put("message", "权限编码已经存在");
            return json;
        }
        int i = rightMapper.insert(rights);
        json.put("message", i > 0 ? "权限添加成功" : "权限添加失败");
        return json;
    }

    /**
     * 修改权限
     *
     * @param rights
     * @return 操作信息
     */
    public JSONObject updateRights(Permissions rights) {
        JSONObject json = new JSONObject();
        int i = rightMapper.updateByPrimaryKeySelective(rights);
        json.put("message", i > 0 ? "权限修改成功" : "权限修改失败");
        return json;
    }
}
