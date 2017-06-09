package org.activiti.listener;

import com.fui.common.UserUtils;
import org.activiti.engine.delegate.DelegateTask;
import org.activiti.engine.delegate.TaskListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * User: sf.xiong
 */
public class GlobalTaskListener implements TaskListener {
    private static final long serialVersionUID = 1L;
    protected Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    public void notify(DelegateTask delegateTask) {
        delegateTask.setAssignee(UserUtils.getCurrent().getEname());
    }
}
