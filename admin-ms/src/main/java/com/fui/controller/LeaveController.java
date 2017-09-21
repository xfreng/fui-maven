package com.fui.controller;

import com.alibaba.fastjson.JSONObject;
import com.fui.common.AbstractSuperController;
import com.fui.common.Constants;
import com.fui.common.GsonUtils;
import com.fui.common.UserUtils;
import com.fui.model.Leave;
import com.fui.model.User;
import com.fui.service.LeaveService;
import org.activiti.engine.ActivitiException;
import org.activiti.engine.TaskService;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.util.WorkflowUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

/**
 * @Author sf.xiong on 2017-09-19.
 */
@Controller
@RequestMapping(value = "/supervisor/oa/leave")
public class LeaveController extends AbstractSuperController {
    @Autowired
    private LeaveService leaveService;
    @Autowired
    private TaskService taskService;

    @RequestMapping("/index")
    public ModelAndView index() {
        ModelAndView mv = new ModelAndView("oa/leave/startLeaveApply");
        return init(mv);
    }

    @RequestMapping("/task/list")
    public ModelAndView taskList() {
        ModelAndView mv = new ModelAndView("oa/leave/taskList");
        return init(mv);
    }

    /**
     * 启动请假流程
     *
     * @param submitData
     */
    @RequestMapping(value = "/start", method = RequestMethod.POST, produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String startWorkflow(String submitData) {
        JSONObject json = new JSONObject();
        try {
            Leave leave = GsonUtils.fromJson(submitData, Leave.class);
            User user = UserUtils.getCurrent();
            leave.setUserId(user.getId().toString());
            Map<String, Object> variables = new HashMap<String, Object>();
            ProcessInstance processInstance = leaveService.startWorkflow(leave, variables);
            json.put("message", "流程已启动，流程ID：" + processInstance.getId());
        } catch (ActivitiException e) {
            if (e.getMessage().contains("no processes deployed with key")) {
                json.put("message", "没有部署流程，请重新部署流程！");
            } else {
                logger.error("启动请假流程失败：", e);
                json.put("message", "系统内部错误！");
            }
        } catch (Exception e) {
            logger.error("启动请假流程失败：", e);
            json.put("message", "系统内部错误！");
        }
        return success(json);
    }

    /**
     * 任务列表
     *
     * @param currPage
     * @param pageSize
     */
    @RequestMapping(value = "/list/task", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String taskList(@RequestParam(value = "pageIndex", defaultValue = "1") int currPage,
                           @RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {
        JSONObject taskResult = leaveService.findTodoTasks(UserUtils.getCurrent().getId().toString(), currPage, pageSize);
        return success(taskResult.getJSONArray("results"), taskResult.getLong("total"), "taskList");
    }

    /**
     * 签收任务
     */
    @RequestMapping(value = "/task/claim/{id}", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String claim(@PathVariable("id") String taskId) {
        JSONObject json = new JSONObject();
        String userId = UserUtils.getCurrent().getId().toString();
        taskService.claim(taskId, userId);
        json.put("message", "任务已签收");
        return success(json);
    }

    /**
     * 读取详细数据
     *
     * @param id
     */
    @RequestMapping(value = "/detail/{id}", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String getLeave(@PathVariable("id") Long id) {
        Leave leave = leaveService.getLeave(id);
        leave.setUserId(leaveService.setUserShowName(leave.getUserId()));
        return success(leave);
    }

    /**
     * 读取详细数据(带流程变量)
     *
     * @param id
     * @param taskId
     */
    @RequestMapping(value = "/detail-with-vars/{id}/{taskId}", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String getLeaveWithVars(@PathVariable("id") Long id, @PathVariable("taskId") String taskId) {
        Leave leave = leaveService.getLeave(id);
        leave.setUserId(leaveService.setUserShowName(leave.getUserId()));
        Map<String, Object> variables = taskService.getVariables(taskId);
        leave.setVariables(variables);
        return success(leave);
    }

    /**
     * 完成任务
     *
     * @param taskId
     * @param vars
     */
    @RequestMapping(value = "/task/complete/{id}", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String complete(@PathVariable("id") String taskId, String vars) {
        JSONObject json = new JSONObject();
        Map<String, Object> variables = WorkflowUtils.getVariables(vars);
        try {
            taskService.complete(taskId, variables);
            json.put("message", "完成任务");
        } catch (Exception e) {
            logger.error("error on complete task {}, variables={}", taskId, variables, e);
            json.put("message", "完成任务出错");
        }
        return success(json);
    }
}