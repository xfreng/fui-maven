package com.fui.service;

import com.fui.common.JsonUtils;
import com.fui.dao.organization.OrganizationMapper;
import com.fui.model.Organization;
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
public class OrganizationService {
    private final Logger logger = LoggerFactory.getLogger(OrganizationService.class);

    @Autowired
    private OrganizationMapper organizationMapper;

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
}
