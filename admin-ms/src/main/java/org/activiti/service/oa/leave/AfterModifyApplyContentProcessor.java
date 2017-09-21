package org.activiti.service.oa.leave;

import com.fui.model.Leave;
import com.fui.service.LeaveService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.delegate.DelegateTask;
import org.activiti.engine.delegate.TaskListener;
import org.activiti.engine.runtime.ProcessInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

/**
 * 调整请假内容处理器
 */
@Component
@Transactional
public class AfterModifyApplyContentProcessor implements TaskListener {

    private static final long serialVersionUID = 1L;

    @Autowired
    LeaveService leaveService;

    @Autowired
    RuntimeService runtimeService;

    /* (non-Javadoc)
     * @see org.activiti.engine.delegate.TaskListener#notify(org.activiti.engine.delegate.DelegateTask)
     */
    public void notify(DelegateTask delegateTask) {
        String processInstanceId = delegateTask.getProcessInstanceId();
        ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().processInstanceId(processInstanceId).singleResult();
        Leave leave = leaveService.getLeave(new Long(processInstance.getBusinessKey()));

        leave.setLeaveType((String) delegateTask.getVariable("leaveType"));
        leave.setStartTime((Date) delegateTask.getVariable("startTime"));
        leave.setEndTime((Date) delegateTask.getVariable("endTime"));
        leave.setReason((String) delegateTask.getVariable("reason"));

        leaveService.saveLeave(leave);
    }

}