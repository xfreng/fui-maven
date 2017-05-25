package com.fui.service;

import com.alibaba.fastjson.JSONObject;
import com.fui.common.JsonUtils;
import com.fui.dao.shiro.PermissionsMapper;
import com.fui.model.Permissions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service("rightService")
public class RightService {
    private final Logger logger = LoggerFactory.getLogger(RightService.class);

    @Autowired
    private PermissionsMapper rightMapper;

    /**
     * 分页查询权限信息
     *
     * @param params 查询条件
     * @return 权限信息列表
     */
    public List<Permissions> getRightsList_page(Map<String, Object> params) {
        List<Permissions> rightsList = rightMapper.getRightsList_page(params);
        return rightsList;
    }

    /**
     * 查询指定id对应的权限
     *
     * @param id 主键
     * @return 相匹配的权限信息
     */
    public List<Map<String, Object>> selectRightByKey(String id) {
        List<Map<String, Object>> rights = new ArrayList<Map<String, Object>>();
        List rightTrees = rightMapper.selectByKey(Long.valueOf(id));
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
     * @return JSONObject
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
        json.put("result", i > 0 ? "1" : "0");
        return json;
    }

    /**
     * 修改权限
     *
     * @param rights
     * @return JSONObject
     */
    public JSONObject updateRights(Permissions rights) {
        JSONObject json = new JSONObject();
        int i = rightMapper.updateByPrimaryKey(rights);
        json.put("result", i > 0 ? "1" : "0");
        return json;
    }
}
