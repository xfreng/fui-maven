package org.activiti.web.workflow;

import com.baosight.iplat4j.core.threadlocal.UserSession;
import com.fasterxml.jackson.core.JsonParser.Feature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fui.common.JSON;
import org.activiti.bpmn.converter.BpmnXMLConverter;
import org.activiti.bpmn.model.BpmnModel;
import org.activiti.editor.constants.ModelDataJsonConstants;
import org.activiti.editor.language.json.converter.BpmnJsonConverter;
import org.activiti.engine.ActivitiException;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.DeploymentBuilder;
import org.activiti.engine.repository.Model;
import org.activiti.engine.repository.ModelQuery;
import org.activiti.util.StringUtil;
import org.activiti.util.WorkFlowConstant;
import org.apache.batik.transcoder.TranscoderInput;
import org.apache.batik.transcoder.TranscoderOutput;
import org.apache.batik.transcoder.image.PNGTranscoder;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.*;

/**
 * 流程模型控制器
 *
 * @author sf.xiong
 */
@Controller
public class ModelController {

	protected Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	RepositoryService repositoryService;

	@Autowired
	private ObjectMapper objectMapper;

	/**
	 * 模型列表
	 */
	@RequestMapping(value = "wmlist", method = RequestMethod.POST)
	public void modelList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 分页
		String pageIndexStr = request.getParameter("pageIndex");
		String pageSizeStr = request.getParameter("pageSize");
		int pageIndex = StringUtils.isNotBlank(pageIndexStr) ? Integer.parseInt(request.getParameter("pageIndex")) : 0;
		int pageSize = StringUtils.isNotBlank(pageSizeStr) ? Integer.parseInt(request.getParameter("pageSize")) : 20;

		String flowName = request.getParameter("flowName");
		String flowKey = request.getParameter("flowKey");
		String flowCategory = request.getParameter("flowCategory");

		Map<String, Object> flow = new HashMap<String, Object>();
		flow.put("flowName", flowName);
		flow.put("flowKey", flowKey);
		flow.put("flowCategory", flowCategory);

		ModelQuery modelQuery = repositoryService.createModelQuery();
		if (StringUtils.isNotBlank(flowKey)) {
			modelQuery = modelQuery.modelKey(flowKey);
		}
		if (StringUtils.isNotBlank(flowName)) {
			modelQuery = modelQuery.modelNameLike("%" + flowName + "%");
		}
		if (StringUtils.isNotBlank(flowCategory)) {
			modelQuery = modelQuery.modelCategory(flowCategory);
		}
		List<Model> models = modelQuery.modelCategoryNotEquals(WorkFlowConstant.CATEGORY_NOT_EQUALS).orderByCreateTime()
				.desc().listPage(pageIndex, pageSize);
		Map<String, Object> modelList = new HashMap<String, Object>();
		modelList.put("modelList", models);
		modelList.put("total", modelQuery.count());
		String json = JSON.encode(modelList);
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html");
		response.getWriter().write(json);
	}

	/**
	 * 创建模型
	 */
	@RequestMapping(value = "wmcreate", method = RequestMethod.POST)
	public void create(@RequestParam("name") String name, @RequestParam("key") String key,
			@RequestParam("description") String description, HttpServletRequest request, HttpServletResponse response) {
		try {
			String category = request.getParameter("category");

			ObjectMapper objectMapper = new ObjectMapper();
			ObjectNode editorNode = objectMapper.createObjectNode();
			editorNode.put("id", "canvas");
			editorNode.put("resourceId", "canvas");
			ObjectNode processNode = objectMapper.createObjectNode();
			processNode.put("process_id", key);
			processNode.put("name", name);
			processNode.put("process_namespace", category);// 流程类型
			processNode.put("process_author", UserSession.getLoginName());// 流程创建者
			editorNode.put("properties", processNode);
			ObjectNode stencilSetNode = objectMapper.createObjectNode();
			stencilSetNode.put("namespace", "http://b3mn.org/stencilset/bpmn2.0#");
			editorNode.put("stencilset", stencilSetNode);
			Model modelData = repositoryService.newModel();

			ObjectNode modelObjectNode = objectMapper.createObjectNode();
			modelObjectNode.put(ModelDataJsonConstants.MODEL_NAME, name);
			modelObjectNode.put(ModelDataJsonConstants.MODEL_REVISION, 1);
			description = StringUtils.defaultString(description);
			modelObjectNode.put(ModelDataJsonConstants.MODEL_DESCRIPTION, description);
			modelData.setMetaInfo(modelObjectNode.toString());
			modelData.setName(name);
			modelData.setKey(StringUtils.defaultString(key));
			modelData.setCategory(category);
			modelData.setTenantId(UserSession.getLoginName());

			repositoryService.saveModel(modelData);
			repositoryService.addModelEditorSource(modelData.getId(), editorNode.toString().getBytes("utf-8"));

			response.sendRedirect(request.getContextPath() + "/bpm/tree-modeler.jsp?modelId=" + modelData.getId());
		} catch (Exception e) {
			logger.error("创建模型失败：", e);
		}
	}

	/**
	 * 另存模型
	 * 
	 * @param values
	 * @param out
	 */
	@RequestMapping(value = { "workflow/model/{modelId}/saveas" }, method = { RequestMethod.PUT })
	@ResponseStatus(HttpStatus.OK)
	public void saveAsModel(@RequestBody MultiValueMap<String, String> values, PrintWriter out) {
		try {
			String modelKey = values.getFirst("key");
			Model model = repositoryService.createModelQuery().modelKey(modelKey).singleResult();
			if (model != null) {
				Map<String, Object> data = new HashMap<String, Object>();
				data.put("state", 1);
				out.write(JSON.encode(data));
			} else {
				String modelId = values.getFirst("modelId");
				model = repositoryService.getModel(modelId);

				Model modelData = repositoryService.newModel();
				ObjectNode modelObjectNode = objectMapper.createObjectNode();
				modelObjectNode.put(ModelDataJsonConstants.MODEL_NAME, values.getFirst("name"));
				modelObjectNode.put(ModelDataJsonConstants.MODEL_REVISION, 1);
				modelObjectNode.put(ModelDataJsonConstants.MODEL_DESCRIPTION, values.getFirst("description"));
				modelData.setMetaInfo(modelObjectNode.toString());
				modelData.setName(values.getFirst("name"));
				modelData.setKey(modelKey);
				modelData.setCategory(model.getCategory());

				repositoryService.saveModel(modelData);
				String jsonXML = editorJsonXML(values.getFirst("json_xml"), false);
				repositoryService.addModelEditorSource(modelData.getId(), jsonXML.getBytes("utf-8"));
				InputStream svgStream = new ByteArrayInputStream(values.getFirst("svg_xml").getBytes("utf-8"));
				TranscoderInput input = new TranscoderInput(svgStream);
				PNGTranscoder transcoder = new PNGTranscoder();
				// Setup output
				ByteArrayOutputStream outStream = new ByteArrayOutputStream();
				TranscoderOutput output = new TranscoderOutput(outStream);
				// Do the transformation
				transcoder.transcode(input, output);
				final byte[] result = outStream.toByteArray();
				repositoryService.addModelEditorSourceExtra(modelData.getId(), result);
				outStream.close();
				out.write(JSON.encode(modelData));
			}
		} catch (Exception e) {
			logger.error("Error saving model", e);
			throw new ActivitiException("Error saving model", e);
		}
	}

	/**
	 * 删除模型
	 * 
	 * @param values
	 * @param out
	 */
	@RequestMapping(value = "workflow-model-deleteModel", method = RequestMethod.POST)
	public void deleteModel(HttpServletRequest request, PrintWriter out) {
		Map<String, Object> data = new HashMap<String, Object>();
		try {
			String modelIdArgs = request.getParameter("modelIdArgs");
			List<String> modelIdList = Arrays.asList(modelIdArgs.split(","));
			for (String modelId : modelIdList) {
				loopDeleteModel(modelId);
			}
			data.put("message", "删除成功！");
		} catch (Exception e) {
			data.put("message", "Error deleting model！");
			logger.error("Error deleting model", e);
		}
		out.write(JSON.encode(data));
	}

	/**
	 * 另存模型(副本)
	 * 
	 * @param values
	 * @param out
	 */
	@RequestMapping(value = "workflow-model-copyModel", method = RequestMethod.POST)
	public void copyModel(HttpServletRequest request, PrintWriter out) {
		Map<String, Object> data = new HashMap<String, Object>();
		try {
			String modelIdArgs = request.getParameter("modelIdArgs");
			List<String> modelIdList = Arrays.asList(modelIdArgs.split(","));
			for (String modelId : modelIdList) {
				Model model = repositoryService.getModel(modelId);

				String key = StringUtil.getUUID();
				String name = model.getName();
				String metaInfo = model.getMetaInfo();
				Model modelData = repositoryService.newModel();
				modelData.setMetaInfo(metaInfo);
				modelData.setName(name);
				modelData.setKey(key);
				modelData.setCategory(model.getCategory());

				repositoryService.saveModel(modelData);
				String jsonXML = editorJsonXML(key,
						new String(repositoryService.getModelEditorSource(modelId), "utf-8"), false);
				repositoryService.addModelEditorSource(modelData.getId(), jsonXML.getBytes("utf-8"));
			}
			data.put("message", "另存副本成功！");
		} catch (Exception e) {
			data.put("message", "Error saving model！");
			logger.error("Error saving model", e);
		}
		out.write(JSON.encode(data));
	}

	/**
	 * 另存模型(模板)
	 * 
	 * @param values
	 * @param out
	 */
	@RequestMapping(value = "workflow-model-copyModel2Template", method = RequestMethod.POST)
	public void copyModel2Template(HttpServletRequest request, PrintWriter out) {
		Map<String, Object> data = new HashMap<String, Object>();
		try {
			String modelIdArgs = request.getParameter("modelIdArgs");
			List<String> modelIdList = Arrays.asList(modelIdArgs.split(","));
			for (String modelId : modelIdList) {
				Model model = repositoryService.getModel(modelId);

				String key = StringUtil.getUUID();
				String name = model.getName();
				String metaInfo = model.getMetaInfo();
				Model modelData = repositoryService.newModel();
				modelData.setMetaInfo(metaInfo);
				modelData.setName(name);
				modelData.setKey(key);
				modelData.setCategory("M" + model.getCategory());

				repositoryService.saveModel(modelData);
				String jsonXML = editorJsonXML(key,
						new String(repositoryService.getModelEditorSource(modelId), "utf-8"), true);
				repositoryService.addModelEditorSource(modelData.getId(), jsonXML.getBytes("utf-8"));
			}
			data.put("message", "保存模板成功！");
		} catch (Exception e) {
			data.put("message", "Error saving model！");
			logger.error("Error saving model", e);
		}
		out.write(JSON.encode(data));
	}

	/**
	 * 解析查询出另存模型的子流程个数
	 * 
	 * @param jsonXML
	 * @return
	 */
	protected String editorJsonXML(String jsonXML, boolean isTemplate) {
		return editorJsonXML(null, jsonXML, isTemplate);
	}

	/**
	 * 解析查询出另存模型的子流程个数
	 * 
	 * @param jsonXML
	 * @return
	 */
	protected String editorJsonXML(String mkey, String jsonXML, boolean isTemplate) {
		try {
			ObjectNode editorJsonNode = (ObjectNode) objectMapper.readTree(jsonXML);
			if (StringUtils.isNotBlank(mkey)) {
				ObjectNode editor = editorJsonNode.findParent("process_id");
				editor.put("process_id", mkey);
			}
			if (isTemplate) {
				ObjectNode editor = editorJsonNode.findParent("process_id");
				String category = editor.get("process_namespace").asText();
				if (WorkFlowConstant.CATEGORY_NOT_EQUALS.equals(category)) {
					editor.put("process_namespace", WorkFlowConstant.CATEGORY_NOT_EQUALS);// 子流程模板类型
				} else {
					editor.put("process_namespace", "M" + category);// 主流程模板类型
				}
			}
			Iterator<String> iterator = editorJsonNode.fieldNames();
			while (iterator.hasNext()) {
				String key = iterator.next();
				if ("childShapes".equals(key)) {
					JsonNode jsonNode = editorJsonNode.get(key);
					Iterator<JsonNode> childShapesIterator = jsonNode.elements();
					while (childShapesIterator.hasNext()) {
						JsonNode childShapesJsonNode = childShapesIterator.next();
						Iterator<String> childShapesJsonNodeIterator = childShapesJsonNode.fieldNames();
						while (childShapesJsonNodeIterator.hasNext()) {
							String childShapesKey = childShapesJsonNodeIterator.next();
							JsonNode node = childShapesJsonNode.get(childShapesKey);
							JsonNode callactivitycalledelementNode = node.get("callactivitycalledelement");
							if (callactivitycalledelementNode != null) {
								String modelKey = callactivitycalledelementNode.asText();
								if (StringUtils.isNotBlank(modelKey)) {
									String uuidmodelKey = StringUtil.getUUID();
									ObjectNode editor = (ObjectNode) node;
									editor.put("callactivitycalledelement", uuidmodelKey);
									Model model = repositoryService.createModelQuery().modelKey(modelKey)
											.singleResult();
									if (model != null) {
										loopSaveAsModel(uuidmodelKey, model, isTemplate);
									}
								}
							}
						}
					}
				}
			}
			jsonXML = editorJsonNode.toString();
		} catch (Exception e) {
			logger.error("Error creating model JSON", e);
			throw new ActivitiException("Error creating model JSON", e);
		}
		return jsonXML;
	}

	/**
	 * 删除模型
	 * 
	 * @param jsonXML
	 * @return
	 */
	protected String deleteByJsonXML(String jsonXML) {
		try {
			ObjectNode editorJsonNode = (ObjectNode) objectMapper.readTree(jsonXML);
			Iterator<String> iterator = editorJsonNode.fieldNames();
			while (iterator.hasNext()) {
				String key = iterator.next();
				if ("childShapes".equals(key)) {
					JsonNode jsonNode = editorJsonNode.get(key);
					Iterator<JsonNode> childShapesIterator = jsonNode.elements();
					while (childShapesIterator.hasNext()) {
						JsonNode childShapesJsonNode = childShapesIterator.next();
						Iterator<String> childShapesJsonNodeIterator = childShapesJsonNode.fieldNames();
						while (childShapesJsonNodeIterator.hasNext()) {
							String childShapesKey = childShapesJsonNodeIterator.next();
							JsonNode node = childShapesJsonNode.get(childShapesKey);
							JsonNode callactivitycalledelementNode = node.get("callactivitycalledelement");
							if (callactivitycalledelementNode != null) {
								String modelKey = callactivitycalledelementNode.asText();
								if (StringUtils.isNotBlank(modelKey)) {
									Model model = repositoryService.createModelQuery().modelKey(modelKey)
											.singleResult();
									if (model != null) {
										loopDeleteModel(model.getId());
									}
								}
							}
						}
					}
				}
			}
			jsonXML = editorJsonNode.toString();
		} catch (Exception e) {
			logger.error("Error creating model JSON", e);
			throw new ActivitiException("Error creating model JSON", e);
		}
		return jsonXML;
	}

	/**
	 * 递归保存子流程
	 * 
	 * @param values
	 */
	protected void loopSaveAsModel(String uuidmodelKey, Model model, boolean isTemplate) {
		try {
			MultiValueMap<String, String> values = new LinkedMultiValueMap<String, String>();
			values.add("key", uuidmodelKey);
			String modelId = model.getId();
			String name = model.getName();
			String metaInfo = model.getMetaInfo();
			values.add("modelId", modelId);
			values.add("name", name);
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(Feature.ALLOW_SINGLE_QUOTES, true);
			objectMapper.configure(Feature.ALLOW_UNQUOTED_CONTROL_CHARS, true);
			ObjectNode objectNode = objectMapper.readValue(metaInfo, ObjectNode.class);
			values.add("description", objectNode.get("description").asText());
			String childJsonXML = new String(repositoryService.getModelEditorSource(modelId), "utf-8");
			ObjectNode editorJsonNode = (ObjectNode) objectMapper.readTree(childJsonXML);
			ObjectNode editor = editorJsonNode.findParent("process_id");
			editor.put("process_id", uuidmodelKey);
			if (isTemplate) {
				editor.put("process_namespace", WorkFlowConstant.CATEGORY_NOT_EQUALS);// 字流程类型
			}
			values.add("json_xml", editorJsonNode.toString());

			String modelKey = values.getFirst("key");

			Model modelData = repositoryService.newModel();
			ObjectNode modelObjectNode = objectMapper.createObjectNode();
			modelObjectNode.put(ModelDataJsonConstants.MODEL_NAME, values.getFirst("name"));
			modelObjectNode.put(ModelDataJsonConstants.MODEL_REVISION, 1);
			modelObjectNode.put(ModelDataJsonConstants.MODEL_DESCRIPTION, values.getFirst("description"));
			modelData.setMetaInfo(modelObjectNode.toString());
			modelData.setName(values.getFirst("name"));
			modelData.setKey(modelKey);
			if (isTemplate) {
				modelData.setCategory(WorkFlowConstant.CATEGORY_NOT_EQUALS);
			} else {
				modelData.setCategory(model.getCategory());
			}

			repositoryService.saveModel(modelData);
			String jsonXML = editorJsonXML(values.getFirst("json_xml"), isTemplate);
			repositoryService.addModelEditorSource(modelData.getId(), jsonXML.getBytes("utf-8"));
		} catch (Exception e) {
			logger.error("Error creating model JSON", e);
			throw new ActivitiException("Error creating model JSON", e);
		}
	}

	/**
	 * 递归删除子流程
	 * 
	 * @param values
	 */
	protected void loopDeleteModel(String modelId) {
		try {
			String childJsonXML = new String(repositoryService.getModelEditorSource(modelId), "utf-8");
			repositoryService.deleteModel(modelId);
			deleteByJsonXML(childJsonXML);
		} catch (Exception e) {
			logger.error("Error creating model JSON", e);
			throw new ActivitiException("Error creating model JSON", e);
		}
	}

	/**
	 * 根据Model部署流程
	 */
	@RequestMapping(value = "deploy/{modelId}", method = RequestMethod.POST)
	public void deploy(@PathVariable("modelId") String modelId, PrintWriter out) {
		Map<String, Object> data = new HashMap<String, Object>();
		try {
			Model modelData = repositoryService.getModel(modelId);
			ObjectNode modelNode = (ObjectNode) new ObjectMapper()
					.readTree(repositoryService.getModelEditorSource(modelData.getId()));
			byte[] bpmnBytes = null;

			BpmnModel model = new BpmnJsonConverter().convertToBpmnModel(modelNode);
			bpmnBytes = new BpmnXMLConverter().convertToXML(model, "GBK");

			String processName = modelData.getName() + ".bpmn20.xml";
			DeploymentBuilder deploymentBuilder = repositoryService.createDeployment();
			deploymentBuilder = deploymentBuilder.name(modelData.getName()).addString(processName,
					new String(bpmnBytes));
			deploymentBuilder = deploymentBuilder.category(modelData.getCategory())
					.tenantId(UserSession.getLoginName());
			Deployment deployment = deploymentBuilder.deploy();
			data.put("message", "部署成功，部署ID=" + deployment.getId());
		} catch (Exception e) {
			logger.error("根据模型部署流程失败：modelId={}", modelId, e);
			data.put("message", "根据模型部署流程失败：modelId=" + modelId);
		}
		out.write(JSON.encode(data));
	}

	/**
	 * 导出model对象为指定类型
	 *
	 * @param modelId
	 *            模型ID
	 * @param type
	 *            导出文件类型(bpmn\json)
	 */
	@RequestMapping(value = "export/{modelId}/{type}")
	public void export(@PathVariable("modelId") String modelId, @PathVariable("type") String type,
			HttpServletResponse response) {
		try {
			Model modelData = repositoryService.getModel(modelId);
			BpmnJsonConverter jsonConverter = new BpmnJsonConverter();
			byte[] modelEditorSource = repositoryService.getModelEditorSource(modelData.getId());

			JsonNode editorNode = new ObjectMapper().readTree(modelEditorSource);
			BpmnModel bpmnModel = jsonConverter.convertToBpmnModel(editorNode);

			// 处理异常
			if (bpmnModel.getMainProcess() == null) {
				response.setStatus(HttpStatus.UNPROCESSABLE_ENTITY.value());
				response.getOutputStream().println("no main process, can't export for type: " + type);
				response.flushBuffer();
				return;
			}

			String filename = "";
			byte[] exportBytes = null;

			String mainProcessId = bpmnModel.getMainProcess().getId();

			if (type.equals("bpmn")) {

				BpmnXMLConverter xmlConverter = new BpmnXMLConverter();
				exportBytes = xmlConverter.convertToXML(bpmnModel);

				filename = mainProcessId + ".bpmn20.xml";
			} else if (type.equals("json")) {

				exportBytes = modelEditorSource;
				filename = mainProcessId + ".json";

			}

			ByteArrayInputStream in = new ByteArrayInputStream(exportBytes);
			IOUtils.copy(in, response.getOutputStream());

			response.setHeader("Content-Disposition", "attachment; filename=" + filename);
			response.flushBuffer();
		} catch (Exception e) {
			logger.error("导出model的xml文件失败：modelId=" + modelId + ", type=" + type, e);
		}
	}

	@RequestMapping(value = "delete/{modelId}", method = RequestMethod.POST)
	public void delete(@PathVariable("modelId") String modelId, PrintWriter out) {
		Map<String, Object> data = new HashMap<String, Object>();
		try {
			repositoryService.deleteModel(modelId);
			data.put("message", "删除成功，模型ID=" + modelId);
		} catch (Exception e) {
			data.put("message", "删除失败，模型ID=" + modelId);
		}
		out.write(JSON.encode(data));
	}

}
