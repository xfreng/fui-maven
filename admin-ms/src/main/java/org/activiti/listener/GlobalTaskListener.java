package org.activiti.listener;

import org.activiti.engine.delegate.DelegateTask;
import org.activiti.engine.delegate.TaskListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.baosight.iplat4j.core.threadlocal.UserSession;

/**
 * User: sf.xiong
 */
public class GlobalTaskListener implements TaskListener {
	private static final long serialVersionUID = 1L;
	protected Logger logger = LoggerFactory.getLogger(getClass());

	@Override
	public void notify(DelegateTask delegateTask) {
		delegateTask.setAssignee(UserSession.getLoginName());
	}
}
