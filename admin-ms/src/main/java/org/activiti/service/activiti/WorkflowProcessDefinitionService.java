package org.activiti.service.activiti;

import org.activiti.engine.HistoryService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.repository.ProcessDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 工作流中流程以及流程实例相关Service
 *
 * @author sf.xiong
 */
@Service
public class WorkflowProcessDefinitionService {

    protected Logger logger = LoggerFactory.getLogger(WorkflowProcessDefinitionService.class);

    @Autowired
    protected RepositoryService repositoryService;

    @Autowired
    protected HistoryService historyService;

    /**
     * 根据流程实例ID查询流程定义对象{@link ProcessDefinition}
     *
     * @param processInstanceId 流程实例ID
     * @return 流程定义对象{@link ProcessDefinition}
     */
    public ProcessDefinition findProcessDefinitionByPid(String processInstanceId) {
        HistoricProcessInstance historicProcessInstance = historyService.createHistoricProcessInstanceQuery().processInstanceId(processInstanceId).singleResult();
        String processDefinitionId = historicProcessInstance.getProcessDefinitionId();
        ProcessDefinition processDefinition = findProcessDefinition(processDefinitionId);
        return processDefinition;
    }

    /**
     * 根据流程定义ID查询流程定义对象{@link ProcessDefinition}
     *
     * @param processDefinitionId 流程定义对象ID
     * @return 流程定义对象{@link ProcessDefinition}
     */
    public ProcessDefinition findProcessDefinition(String processDefinitionId) {
        ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery().processDefinitionId(processDefinitionId).singleResult();
        return processDefinition;
    }
}
