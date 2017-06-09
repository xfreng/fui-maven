package org.activiti.web;

import com.baosight.iplat4j.logging.Logger;
import com.baosight.iplat4j.logging.LoggerFactory;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fui.common.AbstractSuperController;
import com.fui.common.Constants;
import com.fui.common.GsonUtils;
import org.activiti.editor.constants.ModelDataJsonConstants;
import org.activiti.engine.ActivitiException;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.repository.Model;
import org.activiti.model.TreeNodeModel;
import org.activiti.util.WorkflowUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

@Controller("treeModelController")
@RequestMapping("/supervisor/treeModel")
public class TreeModelController extends AbstractSuperController implements ModelDataJsonConstants {
    protected static final Logger LOGGER = LoggerFactory.getLogger(TreeModelController.class);

    @Autowired
    private RepositoryService repositoryService;

    @Autowired
    private ObjectMapper objectMapper;

    @RequestMapping(value = "/getModel", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String getModelJson() {
        String modelId = request.getParameter("modelId");
        try {
            List<TreeNodeModel> treeNodeModels = getModelNodeByModelId(modelId);
            String json = GsonUtils.toJson(treeNodeModels);
            return success(json);
        } catch (Exception e) {
            LOGGER.error("Error creating model JSON", e);
            throw new ActivitiException("Error creating model JSON", e);
        }
    }

    @RequestMapping(value = "/checkModelByModelId", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String checkModelByModelId() {
        String modelId = request.getParameter("modelId");
        try {
            Map<String, Object> data = new HashMap<String, Object>();
            Model model = getModelById(modelId);
            if (model != null) {
                data.put("state", 1);
            } else {
                data.put("state", 0);
            }
            String json = GsonUtils.toJson(data);
            return success(json);
        } catch (Exception e) {
            LOGGER.error("Error creating model JSON", e);
            throw new ActivitiException("Error creating model JSON", e);
        }
    }

    /**
     * 根据modelId获取Model对象
     *
     * @param modelId
     * @return Model对象
     */
    protected Model getModelById(String modelId) {
        Model model = null;
        if (StringUtils.isNotBlank(modelId)) {
            model = repositoryService.getModel(modelId);
        }
        return model;
    }

    /**
     * 根据modelKey获取Model对象
     *
     * @param modelKey
     * @return Model对象
     */
    protected Model getModelByKey(String modelKey) {
        Model model = null;
        if (StringUtils.isNotBlank(modelKey)) {
            model = repositoryService.createModelQuery().modelKey(modelKey).singleResult();
        }
        return model;
    }

    /**
     * 递归所有外调子流程节点
     *
     * @param modelId
     * @return 节点对象
     */
    protected List<TreeNodeModel> getModelNodeByModelId(String modelId) {
        List<TreeNodeModel> treeNodeModels = new ArrayList<TreeNodeModel>();
        Model model = repositoryService.getModel(modelId);
        if (model != null) {
            try {
                TreeNodeModel treeNodeModel = new TreeNodeModel();
                treeNodeModel.setResourceId(model.getId());
                treeNodeModel.setText(model.getName());
                ObjectNode editorJsonNode = (ObjectNode) objectMapper
                        .readTree(new String(repositoryService.getModelEditorSource(model.getId()), "utf-8"));
                treeNodeModel.setId(editorJsonNode.get("resourceId").asText());
                Iterator<String> iterator = editorJsonNode.fieldNames();
                List<TreeNodeModel> children = new ArrayList<TreeNodeModel>();
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
                                if ("properties".equals(childShapesKey)) {
                                    JsonNode stencilNode = childShapesJsonNode.get("stencil");
                                    String typeId = stencilNode.get("id").asText();
                                    if (WorkflowUtils.checkTypeShow(typeId)) {
                                        TreeNodeModel nodeModel = new TreeNodeModel();
                                        String overrideid = node.get("overrideid").asText();
                                        String name = node.get("name").asText();
                                        String resourceId = childShapesJsonNode.get("resourceId").asText();
                                        JsonNode callactivitycalledelementNode = node.get("callactivitycalledelement");
                                        if (callactivitycalledelementNode != null) {
                                            String modelKey = callactivitycalledelementNode.asText();
                                            Model childModel = getModelByKey(modelKey);
                                            if (childModel != null) {
                                                List<TreeNodeModel> nodeChildren = getModelNodeByModelId(childModel.getId());
                                                if (nodeChildren.size() > 0) {
                                                    nodeModel.setChildren(nodeChildren);
                                                }
                                            }
                                        }
                                        nodeModel.setId(resourceId);
                                        nodeModel.setText(name);
                                        nodeModel.setResourceId(overrideid);
                                        children.add(nodeModel);
                                    }
                                }
                            }
                        }
                    }
                }
                if (children.size() > 0) {
                    treeNodeModel.setChildren(children);
                }
                treeNodeModels.add(treeNodeModel);
            } catch (Exception e) {
                LOGGER.error("Error creating model JSON", e);
                throw new ActivitiException("Error creating model JSON", e);
            }
        }
        return treeNodeModels;
    }
}
