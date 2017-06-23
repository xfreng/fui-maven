package com.fui.task;

import org.quartz.spi.TriggerFiredBundle;
import org.springframework.beans.factory.config.AutowireCapableBeanFactory;
import org.springframework.scheduling.quartz.AdaptableJobFactory;

import javax.annotation.Resource;

/**
 * @Title
 * @Author sf.xiong on 2017/6/23.
 */
public class FuiJobFactory extends AdaptableJobFactory {
    @Resource
    private AutowireCapableBeanFactory capableBeanFactory;

    @Override
    protected Object createJobInstance(TriggerFiredBundle bundle) throws Exception {
        Object jobInstance = super.createJobInstance(bundle);
        capableBeanFactory.autowireBean(jobInstance);
        return jobInstance;
    }
}
