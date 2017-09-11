package com.fui.service;

import com.alibaba.fastjson.JSONObject;
import com.fui.common.AbstractSuperService;
import com.fui.common.JsonUtils;
import com.fui.common.StringUtils;
import com.fui.dao.organization.OrganizationMapper;
import com.fui.dao.organization.UserOrganizationsMapper;
import com.fui.model.Organization;
import com.fui.model.UserOrganizations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @Author sf.xiong on 2017/6/28.
 */
@Service("organizationService")
public class OrganizationService extends AbstractSuperService {
    @Autowired
    private OrganizationMapper organizationMapper;
    @Autowired
    private UserOrganizationsMapper userOrganizationsMapper;

    /**
     * 根据上级机构id查询机构信息
     *
     * @param id
     * @return 相匹配的机构信息
     */
    public List<Map<String, Object>> selectOrganizationByKey(String id) {
        List<Map<String, Object>> organizations = new ArrayList<Map<String, Object>>();
        List<Organization> organizationList = organizationMapper.selectByKey(Long.valueOf(id));
        List organizationJsonArray = JsonUtils.toJsonArray(organizationList);
        for (Object organizationTree : organizationJsonArray) {
            net.sf.json.JSONObject treeNode = (net.sf.json.JSONObject) organizationTree;
            List<Organization> nodes = organizationMapper.selectByKey(treeNode.getLong("id"));
            if (nodes.size() > 0) {
                treeNode.put("isLeaf", false);
                treeNode.put("expanded", false);
            }
            organizations.add(treeNode);
        }
        return organizations;
    }

    /**
     * 根据机构id查询机构信息
     *
     * @param id
     * @return Organization
     */
    public Organization selectByPrimaryKey(String id) {
        return organizationMapper.selectByPrimaryKey(Long.parseLong(id));
    }

    /**
     * 根据机构编码查询机构信息
     *
     * @param orgCode
     * @return Organization
     */
    public Organization findOrganizationByCode(String orgCode) {
        return organizationMapper.findOrganizationByCode(orgCode);
    }

    /**
     * 新增机构
     *
     * @param organization
     * @return 操作信息
     */
    public JSONObject addOrganization(Organization organization) {
        JSONObject json = new JSONObject();
        Organization oldRights = findOrganizationByCode(organization.getCode());
        if (oldRights != null) {
            json.put("result", "0");
            json.put("message", "机构编码已经存在");
            return json;
        }
        int i = organizationMapper.insert(organization);
        saveUserOrganizations(organization);
        json.put("message", i > 0 ? "机构添加成功" : "机构添加失败");
        return json;
    }

    /**
     * 修改机构
     *
     * @param organization
     * @return 操作信息
     */
    public JSONObject updateOrganization(Organization organization) {
        JSONObject json = new JSONObject();
        int i = organizationMapper.updateByPrimaryKeySelective(organization);
        userOrganizationsMapper.deleteByOrgId(organization.getId());// 更新之前，清除用户结构关联信息
        saveUserOrganizations(organization);
        json.put("message", i > 0 ? "机构修改成功" : "机构修改失败");
        return json;
    }

    /**
     * 新增用户机构关系
     *
     * @param organization
     */
    private void saveUserOrganizations(Organization organization) {
        String users = organization.getUsers();
        if (StringUtils.isNotEmpty(users)) {
            List<String> userOrganizationList = StringUtils.asList(users, ",");
            UserOrganizations userOrganizations = new UserOrganizations();
            userOrganizations.setOrganizationId(organization.getId());
            for (String userId : userOrganizationList) {
                userOrganizations.setUserId(Long.valueOf(userId));
                userOrganizationsMapper.insert(userOrganizations);
            }
        }
    }

    /**
     * 删除机构
     *
     * @param organization
     * @return 操作信息
     */
    public JSONObject deleteOrganization(Organization organization) {
        JSONObject json = new JSONObject();
        try {
            List<Organization> organizationList = organizationMapper.selectByKey(organization.getId());
            if (organizationList != null && organizationList.size() > 0) {
                json.put("count", organizationList.size());
            } else {
                organizationMapper.deleteByPrimaryKey(organization.getId());
                userOrganizationsMapper.deleteByOrgId(organization.getId());
                json.put("count", 0);
            }
        } catch (Exception e) {
            logger.error("删除菜单出错 {} ", e);
        }
        return json;
    }
}