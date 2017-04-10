package org.activiti.web.workflow;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.activiti.engine.RuntimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.fui.common.JSON;

@Controller
@RequestMapping(value = "/workflow/processinstance")
public class ProcessInstanceController {

	@Autowired
	private RuntimeService runtimeService;

	@RequestMapping(value = "running")
	public ModelAndView running(Model model, HttpServletRequest request) {
		String flowName = request.getParameter("flowName");
		String flowKey = request.getParameter("flowKey");
		String flowCategory = request.getParameter("flowCategory");

		Map<String, Object> flow = new HashMap<String, Object>();
		flow.put("flowName", flowName);
		flow.put("flowKey", flowKey);
		flow.put("flowCategory", flowCategory);

		ModelAndView mav = new ModelAndView("/workflow/running-manage");
		/*Page<ProcessInstance> page = new Page<ProcessInstance>(PageUtil.PAGE_SIZE);
		int[] pageParams = PageUtil.init(page, request);

		ProcessInstanceQuery processInstanceQuery = runtimeService.createProcessInstanceQuery();
		if (StringUtils.isNotBlank(flowKey)) {
			processInstanceQuery = processInstanceQuery.processDefinitionKey(flowKey);
		}
		if (StringUtils.isNotBlank(flowName)) {
			processInstanceQuery = processInstanceQuery.processDefinitionName(flowName);
		}
		if (StringUtils.isNotBlank(flowCategory)) {
			processInstanceQuery = processInstanceQuery.processDefinitionCategory(flowCategory);
		}
		List<ProcessInstance> list = processInstanceQuery.listPage(pageParams[0], pageParams[1]);
		page.setResult(list);
		page.setTotalCount(processInstanceQuery.count());
		mav.addObject("page", page);
		mav.addObject("flow", flow);*/
		return mav;
	}

	/**
	 * 挂起、激活流程实例
	 */
	@RequestMapping(value = "update/{state}/{processInstanceId}", method = RequestMethod.POST)
	public void updateState(@PathVariable("state") String state,
			@PathVariable("processInstanceId") String processInstanceId, PrintWriter out) {
		Map<String, Object> data = new HashMap<String, Object>();
		if (state.equals("active")) {
			data.put("message", "已激活ID为[" + processInstanceId + "]的流程实例。");
			runtimeService.activateProcessInstanceById(processInstanceId);
		} else if (state.equals("suspend")) {
			runtimeService.suspendProcessInstanceById(processInstanceId);
			data.put("message", "已挂起ID为[" + processInstanceId + "]的流程实例。");
		}
		out.write(JSON.encode(data));
	}
}
