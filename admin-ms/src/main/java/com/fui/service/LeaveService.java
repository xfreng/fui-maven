package com.fui.service;

import com.alibaba.fastjson.JSONObject;
import com.fui.common.AbstractSuperService;
import com.fui.dao.oa.LeaveMapper;
import com.fui.dao.shiro.RolesMapper;
import com.fui.dao.user.UserMapper;
import com.fui.model.Leave;
import org.activiti.engine.IdentityService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.activiti.engine.task.TaskQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @Author sf.xiong on 2017-09-19.
 */
@Service("leaveService")
public class LeaveService extends AbstractSuperService {

    @Autowired
    private LeaveMapper leaveMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private RolesMapper rolesMapper;
    @Autowired
    private RepositoryService repositoryService;
    @Autowired
    private TaskService taskService;
    @Autowired
    private RuntimeService runtimeService;
    @Autowired
    private IdentityService identityService;

    public Leave getLeave(Long id) {
        Leave leave = leaveMapper.selectByPrimaryKey(id);
        return leave;
    }

    public void saveLeave(Leave entity) {
        if (entity.getId() == null) {
            entity.setApplyTime(new Date());
            leaveMapper.insert(entity);
        } else {
            leaveMapper.updateByPrimaryKeySelective(entity);
        }
    }

    /**
     * 启动流程
     *
     * @param entity
     */
    public ProcessInstance startWorkflow(Leave entity, Map<String, Object> variables) {
        saveLeave(entity);
        logger.debug("save entity: {}", entity);
        String businessKey = entity.getId().toString();

        ProcessInstance processInstance = null;
        try {
            // 用来设置启动流程的人员ID，引擎会自动把用户ID保存到activiti:initiator中
            identityService.setAuthenticatedUserId(entity.getUserId());

            processInstance = runtimeService.startProcessInstanceByKey("leave", businessKey, variables);
            String processInstanceId = processInstance.getId();
            entity.setProcessInstanceId(processInstanceId);
            saveLeave(entity);
            logger.debug("start process of {key={}, bkey={}, pid={}, variables={}}", "leave", businessKey, processInstanceId, variables);
        } finally {
            identityService.setAuthenticatedUserId(null);
        }
        return processInstance;
    }

    /**
     * 查询待办任务
     *
     * @param userId 用户ID
     * @return
     */
    public JSONObject findTodoTasks(String userId, int currPage, int pageSize) {
        JSONObject taskResult = new JSONObject();
        List<Leave> results = new ArrayList<Leave>();

        // 根据当前人的ID查询所在组
        List<String> groups = rolesMapper.getRolesByUserId(Long.valueOf(userId));
        TaskQuery taskQuery = taskService.createTaskQuery().taskCandidateOrAssigned(userId);
        int total = taskQuery.list().size();
        if (total == 0) {
            taskQuery = taskService.createTaskQuery().taskCandidateGroupIn(groups);
            total = taskQuery.list().size();
        }
        taskResult.put("total", total);
        List<Task> tasks = taskQuery.listPage(currPage, pageSize);

        // 根据流程的业务ID查询实体并关联
        for (Task task : tasks) {
            String processInstanceId = task.getProcessInstanceId();
            ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().processInstanceId(processInstanceId).active().singleResult();
            if (processInstance == null) {
                continue;
            }
            String businessKey = processInstance.getBusinessKey();
            if (businessKey == null) {
                continue;
            }
            ProcessDefinition processDefinition = getProcessDefinition(processInstance.getProcessDefinitionId());
            if (processDefinition == null) {
                continue;
            }
            Leave leave = leaveMapper.selectByPrimaryKey(new Long(businessKey));
            leave.setTaskId(task.getId());
            leave.setTaskName(task.getName());
            leave.setProcessInstanceId(processInstanceId);
            leave.setSuspended(processInstance.isSuspended());
            leave.setAssignee(task.getAssignee());
            leave.setTaskDefinitionKey(task.getTaskDefinitionKey());
            leave.setProcessDefinitionId(processInstance.getProcessDefinitionId());
            leave.setCreateTime(task.getCreateTime());
            leave.setUserId(setUserShowName(leave.getUserId()));
            leave.setVersion(processDefinition.getVersion());
            results.add(leave);
        }
        taskResult.put("results", results);
        return taskResult;
    }

    /**
     * 设置用户显示名称
     *
     * @param userId
     */
    public String setUserShowName(String userId) {
        return userMapper.selectByPrimaryKey(Long.valueOf(userId)).getEname();
    }

    /**
     * 查询流程定义对象
     *
     * @param processDefinitionId 流程定义ID
     */
    protected ProcessDefinition getProcessDefinition(String processDefinitionId) {
        ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery().processDefinitionId(processDefinitionId).singleResult();
        return processDefinition;
    }
}