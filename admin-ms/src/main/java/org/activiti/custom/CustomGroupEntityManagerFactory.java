package org.activiti.custom;

import org.activiti.engine.impl.interceptor.Session;
import org.activiti.engine.impl.interceptor.SessionFactory;
import org.activiti.engine.impl.persistence.entity.GroupIdentityManager;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @Author sf.xiong on 2017-09-19.
 */
public class CustomGroupEntityManagerFactory implements SessionFactory {

    private CustomGroupEntityManager customGroupEntityManager;

    @Override
    public Class<?> getSessionType() {
        return GroupIdentityManager.class;
    }

    @Override
    public Session openSession() {
        return customGroupEntityManager;
    }

    @Autowired
    public void setCustomGroupEntityManager(CustomGroupEntityManager customGroupEntityManager) {
        this.customGroupEntityManager = customGroupEntityManager;
    }
}