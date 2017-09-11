package com.fui.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.fui.common.AbstractSuperService;
import com.fui.common.GsonUtils;
import com.fui.dao.project.ProjectMapper;
import com.fui.model.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Title
 * @Author sf.xiong on 2017/4/13.
 */
@Service("projectService")
public class ProjectService extends AbstractSuperService {
    @Autowired
    private ProjectMapper projectMapper;

    /**
     * 查询所有数据
     *
     * @return list
     */
    public List<Project> selectAll() {
        return projectMapper.selectAll();
    }

    /**
     * 保存项目信息
     *
     * @param data
     * @return 操作信息
     */
    public JSONObject save(String data) {
        JSONObject json = new JSONObject();
        try {
            List systemArray = GsonUtils.fromJson(data, JSONArray.class);
            for (Object object : systemArray) {
                Project project = GsonUtils.fromJson(GsonUtils.toJson(object), Project.class);
                projectMapper.updateByPrimaryKeySelective(project);
            }
        } catch (Exception e) {
            json.put("message", "保存项目信息出错");
            logger.warn("保存项目信息出错 {}", e);
        }
        json.put("message", "保存成功");
        return json;
    }
}
