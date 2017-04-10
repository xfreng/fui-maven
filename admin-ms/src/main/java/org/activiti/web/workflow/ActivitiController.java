package org.activiti.web.workflow;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipInputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamReader;

import org.activiti.bpmn.converter.BpmnXMLConverter;
import org.activiti.bpmn.model.BpmnModel;
import org.activiti.cmd.JumpActivityCmd;
import org.activiti.editor.constants.ModelDataJsonConstants;
import org.activiti.editor.language.json.converter.BpmnJsonConverter;
import org.activiti.engine.ManagementService;
import org.activiti.engine.ProcessEngineConfiguration;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.identity.User;
import org.activiti.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.activiti.engine.impl.context.Context;
import org.activiti.engine.impl.interceptor.Command;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.DeploymentBuilder;
import org.activiti.engine.repository.Model;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.activiti.image.impl.DefaultProcessDiagramGenerator;
import org.activiti.service.activiti.WorkflowProcessDefinitionService;
import org.activiti.service.activiti.WorkflowTraceService;
import org.activiti.spring.ProcessEngineFactoryBean;
import org.activiti.util.UserUtil;
import org.activiti.util.WorkflowUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.baosight.iplat4j.core.FrameworkInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fui.common.JSON;

/**
 * 流程管理控制器
 *
 * @author sf.xiong
 */
@Controller
@RequestMapping(value = "/workflow")
public class ActivitiController {

	protected Logger logger = LoggerFactory.getLogger(getClass());

	protected WorkflowProcessDefinitionService workflowProcessDefinitionService;

	protected RepositoryService repositoryService;

	protected RuntimeService runtimeService;

	protected TaskService taskService;

	protected WorkflowTraceService traceService;

	@Autowired
	ManagementService managementService;

	protected static Map<String, ProcessDefinition> PROCESS_DEFINITION_CACHE = new HashMap<String, ProcessDefinition>();

	@Autowired
	ProcessEngineFactoryBean processEngine;

	@Autowired
	ProcessEngineConfiguration processEngineConfiguration;

	/* 导出目录 */
	protected String exportDir = FrameworkInfo.getInfoGenDir() + File.separator + "bm2p";

	/**
	 * 流程定义列表
	 *
	 * @return
	 */
	@RequestMapping(value = "/process-list")
	public ModelAndView processList(HttpServletRequest request) {
		String flowName = request.getParameter("flowName");
		String flowKey = request.getParameter("flowKey");
		String flowCategory = request.getParameter("flowCategory");

		Map<String, Object> flow = new HashMap<String, Object>();
		flow.put("flowName", flowName);
		flow.put("flowKey", flowKey);
		flow.put("flowCategory", flowCategory);

		ModelAndView mav = new ModelAndView("workflow/process-list");
		/*
		 * 保存两个对象，一个是ProcessDefinition（流程定义），一个是Deployment（流程部署）
		 */
		List<Object[]> objects = new ArrayList<Object[]>();

		/*Page<Object[]> page = new Page<Object[]>(PageUtil.PAGE_SIZE);
		int[] pageParams = PageUtil.init(page, request);

		ProcessDefinitionQuery processDefinitionQuery = repositoryService.createProcessDefinitionQuery();
		if (StringUtils.isNotBlank(flowKey)) {
			processDefinitionQuery = processDefinitionQuery.processDefinitionKeyLike("%" + flowKey + "%");
		}
		if (StringUtils.isNotBlank(flowName)) {
			processDefinitionQuery = processDefinitionQuery.processDefinitionNameLike("%" + flowName + "%");
		}
		if (StringUtils.isNotBlank(flowCategory)) {
			processDefinitionQuery = processDefinitionQuery.processDefinitionCategory(flowCategory);
		}
		List<ProcessDefinition> processDefinitionList = processDefinitionQuery
				.processDefinitionCategoryNotEquals(WorkFlowConstant.CATEGORY_NOT_EQUALS).orderByDeploymentId().desc()
				.listPage(pageParams[0], pageParams[1]);
		for (ProcessDefinition processDefinition : processDefinitionList) {
			String deploymentId = processDefinition.getDeploymentId();
			Deployment deployment = repositoryService.createDeploymentQuery().deploymentId(deploymentId).singleResult();
			objects.add(new Object[] { processDefinition, deployment });
		}

		page.setTotalCount(processDefinitionQuery.count());
		page.setResult(objects);
		mav.addObject("page", page);
		mav.addObject("flow", flow);*/

		return mav;
	}

	/**
	 * 读取资源，通过部署ID
	 *
	 * @param processDefinitionId
	 *            流程定义
	 * @param resourceType
	 *            资源类型(xml|image)
	 * @throws Exception
	 */
	@RequestMapping(value = "/resource/read")
	public void loadByDeployment(@RequestParam("processDefinitionId") String processDefinitionId,
			@RequestParam("resourceType") String resourceType, HttpServletResponse response) throws Exception {
		ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery()
				.processDefinitionId(processDefinitionId).singleResult();
		String resourceName = "";
		if (resourceType.equals("image")) {
			resourceName = processDefinition.getDiagramResourceName();
		} else if (resourceType.equals("xml")) {
			resourceName = processDefinition.getResourceName();
		}
		InputStream resourceAsStream = repositoryService.getResourceAsStream(processDefinition.getDeploymentId(),
				resourceName);
		byte[] b = new byte[1024];
		int len = -1;
		while ((len = resourceAsStream.read(b, 0, 1024)) != -1) {
			response.getOutputStream().write(b, 0, len);
		}
	}

	/**
	 * 读取资源，通过流程ID
	 *
	 * @param resourceType
	 *            资源类型(xml|image)
	 * @param processInstanceId
	 *            流程实例ID
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/resource/process-instance")
	public void loadByProcessInstance(@RequestParam("type") String resourceType,
			@RequestParam("pid") String processInstanceId, HttpServletResponse response) throws Exception {
		InputStream resourceAsStream = null;
		ProcessInstance processInstance = runtimeService.createProcessInstanceQuery()
				.processInstanceId(processInstanceId).singleResult();
		ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery()
				.processDefinitionId(processInstance.getProcessDefinitionId()).singleResult();

		String resourceName = "";
		if (resourceType.equals("image")) {
			resourceName = processDefinition.getDiagramResourceName();
		} else if (resourceType.equals("xml")) {
			resourceName = processDefinition.getResourceName();
		}
		resourceAsStream = repositoryService.getResourceAsStream(processDefinition.getDeploymentId(), resourceName);
		byte[] b = new byte[1024];
		int len = -1;
		while ((len = resourceAsStream.read(b, 0, 1024)) != -1) {
			response.getOutputStream().write(b, 0, len);
		}
	}

	/**
	 * 删除部署的流程，级联删除流程实例
	 *
	 * @param deploymentId
	 *            流程部署ID
	 */
	@RequestMapping(value = "/process/delete", method = RequestMethod.POST)
	public void delete(@RequestParam("deploymentId") String deploymentId, PrintWriter out) {
		Map<String, Object> data = new HashMap<String, Object>();
		try {
			repositoryService.deleteDeployment(deploymentId, true);
			data.put("message", "删除成功，流程部署ID=" + deploymentId);
		} catch (Exception e) {
			data.put("message", "删除失败，流程部署ID=" + deploymentId);
		}
		out.write(JSON.encode(data));
	}

	/**
	 * 输出跟踪流程信息
	 *
	 * @param processInstanceId
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/process/trace")
	@ResponseBody
	public List<Map<String, Object>> traceProcess(@RequestParam("pid") String processInstanceId) throws Exception {
		List<Map<String, Object>> activityInfos = traceService.traceProcess(processInstanceId);
		return activityInfos;
	}

	/**
	 * 读取带跟踪的图片
	 */
	@RequestMapping(value = "/process/trace/auto/{executionId}")
	public void readResource(@PathVariable("executionId") String executionId, HttpServletResponse response)
			throws Exception {
		ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().processInstanceId(executionId)
				.singleResult();
		BpmnModel bpmnModel = repositoryService.getBpmnModel(processInstance.getProcessDefinitionId());
		List<String> activeActivityIds = runtimeService.getActiveActivityIds(executionId);

		processEngineConfiguration = processEngine.getProcessEngineConfiguration();
		Context.setProcessEngineConfiguration((ProcessEngineConfigurationImpl) processEngineConfiguration);

		DefaultProcessDiagramGenerator diagramGenerator = new DefaultProcessDiagramGenerator();
		InputStream imageStream = diagramGenerator.generateDiagram(bpmnModel, "png", activeActivityIds,
				Collections.<String>emptyList(),
				processEngineConfiguration.getProcessEngineConfiguration().getActivityFontName(),
				processEngineConfiguration.getProcessEngineConfiguration().getLabelFontName(), null, null, 1.0);
		// 输出资源内容到相应对象
		byte[] b = new byte[1024];
		int len;
		while ((len = imageStream.read(b, 0, 1024)) != -1) {
			response.getOutputStream().write(b, 0, len);
		}
	}

	@RequestMapping(value = "/deploy", method = RequestMethod.POST)
	public void deploy(@RequestParam(value = "category", required = false) String category,
			@RequestParam(value = "file", required = false) MultipartFile file, PrintWriter out) {
		Map<String, Object> data = new HashMap<String, Object>();
		String fileName = file.getOriginalFilename();
		try {
			if (StringUtils.isNotBlank(fileName) && StringUtils.isNotBlank(category)) {
				InputStream fileInputStream = file.getInputStream();
				DeploymentBuilder deploymentBuilder = null;

				String extension = FilenameUtils.getExtension(fileName);
				if (extension.equals("zip") || extension.equals("bar")) {
					ZipInputStream zip = new ZipInputStream(fileInputStream);
					deploymentBuilder = repositoryService.createDeployment().addZipInputStream(zip);
				} else {
					deploymentBuilder = repositoryService.createDeployment().addInputStream(fileName, fileInputStream);
				}
				Deployment deployment = deploymentBuilder.category(category).deploy();
				List<ProcessDefinition> list = repositoryService.createProcessDefinitionQuery()
						.deploymentId(deployment.getId()).list();

				for (ProcessDefinition processDefinition : list) {
					WorkflowUtils.exportDiagramToFile(repositoryService, processDefinition, exportDir);
				}
				data.put("message", "部署成功。");
				data.put("state", "1");
			} else {
				data.put("message", "请选择要部署的流程类型及文件。\r(支持的文件格式：zip、bar、bpmn、bpmn20.xml)");
			}
		} catch (Exception e) {
			logger.error("error on deploy process, because of file input stream", e);
			data.put("message", "error on deploy process, because of file input stream。");
		}
		out.write(JSON.encode(data));
	}

	@RequestMapping(value = "/process/convert-to-model/{processDefinitionId}", method = RequestMethod.POST)
	public void convertToModel(@PathVariable("processDefinitionId") String processDefinitionId, PrintWriter out) {
		Map<String, Object> data = new HashMap<String, Object>();
		try {
			ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery()
					.processDefinitionId(processDefinitionId).singleResult();
			InputStream bpmnStream = repositoryService.getResourceAsStream(processDefinition.getDeploymentId(),
					processDefinition.getResourceName());
			XMLInputFactory xif = XMLInputFactory.newInstance();
			InputStreamReader in = new InputStreamReader(bpmnStream, "UTF-8");
			XMLStreamReader xtr = xif.createXMLStreamReader(in);
			BpmnModel bpmnModel = new BpmnXMLConverter().convertToBpmnModel(xtr);

			BpmnJsonConverter converter = new BpmnJsonConverter();
			com.fasterxml.jackson.databind.node.ObjectNode modelNode = converter.convertToJson(bpmnModel);
			Model modelData = repositoryService.newModel();
			modelData.setKey(processDefinition.getKey());
			modelData.setName(processDefinition.getResourceName());
			modelData.setCategory(processDefinition.getDeploymentId());

			ObjectNode modelObjectNode = new ObjectMapper().createObjectNode();
			modelObjectNode.put(ModelDataJsonConstants.MODEL_NAME, processDefinition.getName());
			modelObjectNode.put(ModelDataJsonConstants.MODEL_REVISION, 1);
			modelObjectNode.put(ModelDataJsonConstants.MODEL_DESCRIPTION, processDefinition.getDescription());
			modelData.setMetaInfo(modelObjectNode.toString());

			repositoryService.saveModel(modelData);

			repositoryService.addModelEditorSource(modelData.getId(), modelNode.toString().getBytes("utf-8"));

			data.put("message", "转换成功。");
		} catch (Exception e) {
			data.put("message", "转换失败。");
		}
		out.write(JSON.encode(data));
	}

	/**
	 * 待办任务--Portlet
	 */
	@RequestMapping(value = "/task/todo/list")
	@ResponseBody
	public List<Map<String, Object>> todoList(HttpSession session) throws Exception {
		User user = UserUtil.getUserFromSession(session);
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm");

		// 已经签收的任务
		List<Task> todoList = taskService.createTaskQuery().taskAssignee(user.getId()).active().list();
		for (Task task : todoList) {
			String processDefinitionId = task.getProcessDefinitionId();
			ProcessDefinition processDefinition = getProcessDefinition(processDefinitionId);

			Map<String, Object> singleTask = packageTaskInfo(sdf, task, processDefinition);
			singleTask.put("status", "todo");
			result.add(singleTask);
		}

		// 等待签收的任务
		List<Task> toClaimList = taskService.createTaskQuery().taskCandidateUser(user.getId()).active().list();
		for (Task task : toClaimList) {
			String processDefinitionId = task.getProcessDefinitionId();
			ProcessDefinition processDefinition = getProcessDefinition(processDefinitionId);

			Map<String, Object> singleTask = packageTaskInfo(sdf, task, processDefinition);
			singleTask.put("status", "claim");
			result.add(singleTask);
		}

		return result;
	}

	private Map<String, Object> packageTaskInfo(SimpleDateFormat sdf, Task task, ProcessDefinition processDefinition) {
		Map<String, Object> singleTask = new HashMap<String, Object>();
		singleTask.put("id", task.getId());
		singleTask.put("name", task.getName());
		singleTask.put("createTime", sdf.format(task.getCreateTime()));
		singleTask.put("pdname", processDefinition.getName());
		singleTask.put("pdversion", processDefinition.getVersion());
		singleTask.put("pid", task.getProcessInstanceId());
		return singleTask;
	}

	private ProcessDefinition getProcessDefinition(String processDefinitionId) {
		ProcessDefinition processDefinition = PROCESS_DEFINITION_CACHE.get(processDefinitionId);
		if (processDefinition == null) {
			processDefinition = repositoryService.createProcessDefinitionQuery()
					.processDefinitionId(processDefinitionId).singleResult();
			PROCESS_DEFINITION_CACHE.put(processDefinitionId, processDefinition);
		}
		return processDefinition;
	}

	/**
	 * 挂起、激活流程实例
	 */
	@RequestMapping(value = "processdefinition/update/{state}/{processDefinitionId}", method = RequestMethod.POST)
	public void updateState(@PathVariable("state") String state,
			@PathVariable("processDefinitionId") String processDefinitionId, PrintWriter out) {
		Map<String, Object> data = new HashMap<String, Object>();
		if (state.equals("active")) {
			data.put("message", "已激活ID为[" + processDefinitionId + "]的流程定义。");
			repositoryService.activateProcessDefinitionById(processDefinitionId, true, null);
		} else if (state.equals("suspend")) {
			repositoryService.suspendProcessDefinitionById(processDefinitionId, true, null);
			data.put("message", "已挂起ID为[" + processDefinitionId + "]的流程定义。");
		}
		out.write(JSON.encode(data));
	}

	/**
	 * 导出图片文件到硬盘
	 *
	 * @return
	 */
	@RequestMapping(value = "export/diagrams")
	@ResponseBody
	public List<String> exportDiagrams() throws IOException {
		List<String> files = new ArrayList<String>();
		List<ProcessDefinition> list = repositoryService.createProcessDefinitionQuery().list();

		for (ProcessDefinition processDefinition : list) {
			files.add(WorkflowUtils.exportDiagramToFile(repositoryService, processDefinition, exportDir));
		}

		return files;
	}

	@RequestMapping(value = "activity/jump")
	@ResponseBody
	public boolean jump(@RequestParam("executionId") String executionId,
			@RequestParam("activityId") String activityId) {
		Command<Object> cmd = new JumpActivityCmd(executionId, activityId);
		managementService.executeCommand(cmd);
		return true;
	}

	@RequestMapping(value = "bpmn/model/{processDefinitionId}")
	@ResponseBody
	public BpmnModel queryBpmnModel(@PathVariable("processDefinitionId") String processDefinitionId) {
		BpmnModel bpmnModel = repositoryService.getBpmnModel(processDefinitionId);
		return bpmnModel;
	}

	@Autowired
	public void setWorkflowProcessDefinitionService(WorkflowProcessDefinitionService workflowProcessDefinitionService) {
		this.workflowProcessDefinitionService = workflowProcessDefinitionService;
	}

	@Autowired
	public void setRepositoryService(RepositoryService repositoryService) {
		this.repositoryService = repositoryService;
	}

	@Autowired
	public void setRuntimeService(RuntimeService runtimeService) {
		this.runtimeService = runtimeService;
	}

	@Autowired
	public void setTraceService(WorkflowTraceService traceService) {
		this.traceService = traceService;
	}

	@Autowired
	public void setTaskService(TaskService taskService) {
		this.taskService = taskService;
	}

}