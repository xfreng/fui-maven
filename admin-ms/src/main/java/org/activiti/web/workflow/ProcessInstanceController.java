package org.activiti.web.workflow;

import com.fui.common.AbstractSuperController;
import com.fui.common.Constants;
import org.activiti.engine.RuntimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value = "/supervisor/workflow/processInstance")
public class ProcessInstanceController extends AbstractSuperController {

    @Autowired
    private RuntimeService runtimeService;

    @RequestMapping(value = "/running")
    public ModelAndView running() {
        String flowName = request.getParameter("flowName");
        String flowKey = request.getParameter("flowKey");
        String flowCategory = request.getParameter("flowCategory");

        Map<String, Object> flow = new HashMap<String, Object>();
        flow.put("flowName", flowName);
        flow.put("flowKey", flowKey);
        flow.put("flowCategory", flowCategory);

        ModelAndView mav = new ModelAndView("/workflow/running-manage");
        return mav;
    }

    /**
     * 挂起、激活流程实例
     */
    @RequestMapping(value = "/update/{state}/{processInstanceId}", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String updateState(@PathVariable("state") String state,
                              @PathVariable("processInstanceId") String processInstanceId) {
        Map<String, Object> data = new HashMap<String, Object>();
        if (state.equals("active")) {
            data.put("message", "已激活ID为[" + processInstanceId + "]的流程实例。");
            runtimeService.activateProcessInstanceById(processInstanceId);
        } else if (state.equals("suspend")) {
            runtimeService.suspendProcessInstanceById(processInstanceId);
            data.put("message", "已挂起ID为[" + processInstanceId + "]的流程实例。");
        }
        return success(data);
    }
}
