package com.fui.common;

import com.fui.model.ScheduleJob;
import org.quartz.*;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;

/**
 * Quartz调度管理器
 *
 * @author sf.xiong
 */
public class QuartzManager {

    /**
     * 添加一个定时任务
     *
     * @param schedulerFactoryBean
     * @param scheduleJob
     * @param cls
     */
    public static void addJob(SchedulerFactoryBean schedulerFactoryBean, ScheduleJob scheduleJob, @SuppressWarnings("rawtypes") Class cls) {
        try {
            Scheduler scheduler = schedulerFactoryBean.getScheduler();
            String key = scheduleJob.getJobId();
            String group = scheduleJob.getJobGroup();
            String cron = scheduleJob.getCronExpression();
            TriggerKey triggerKey = TriggerKey.triggerKey(key, group);
            CronTrigger trigger = (CronTrigger) scheduler.getTrigger(triggerKey);
            //设置执行任务类
            JobDetail jobDetail = JobBuilder.newJob(cls).withIdentity(key, group).build();
            //传递参数
            jobDetail.getJobDataMap().put("jobClass", cls);
            //设置定时启动 cron
            CronScheduleBuilder scheduleBuilder = CronScheduleBuilder.cronSchedule(cron);
            if (trigger == null) {
                trigger = TriggerBuilder.newTrigger().withIdentity(triggerKey).withSchedule(scheduleBuilder).build();
            } else {
                removeJob(schedulerFactoryBean, scheduleJob);
            }
            //加入定时器
            scheduler.scheduleJob(jobDetail, trigger);
        } catch (SchedulerException e) {
            e.printStackTrace();
        }
    }

    /**
     * 修改一个任务的触发时间
     *
     * @param schedulerFactoryBean
     * @param scheduleJob
     */
    @SuppressWarnings("rawtypes")
    public static void modifyJobTime(SchedulerFactoryBean schedulerFactoryBean, ScheduleJob scheduleJob) {
        try {
            Scheduler scheduler = schedulerFactoryBean.getScheduler();
            String key = scheduleJob.getJobId();
            String group = scheduleJob.getJobGroup();
            String cron = scheduleJob.getCronExpression();
            TriggerKey triggerKey = TriggerKey.triggerKey(key, group);
            CronTrigger trigger = (CronTrigger) scheduler.getTrigger(triggerKey);
            if (trigger == null) {
                return;
            }
            String oldCron = trigger.getCronExpression();
            if (!oldCron.equalsIgnoreCase(cron)) {
                JobDetail jobDetail = scheduler.getJobDetail(JobKey.jobKey(key, group));
                Class objJobClass = jobDetail.getJobClass();
                removeJob(schedulerFactoryBean, scheduleJob);
                addJob(schedulerFactoryBean, scheduleJob, objJobClass);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 移除一个任务
     *
     * @param schedulerFactoryBean
     * @param scheduleJob
     */
    public static void removeJob(SchedulerFactoryBean schedulerFactoryBean, ScheduleJob scheduleJob) {
        try {
            Scheduler scheduler = schedulerFactoryBean.getScheduler();
            String key = scheduleJob.getJobId();
            String group = scheduleJob.getJobGroup();
            TriggerKey triggerKey = TriggerKey.triggerKey(key, group);
            scheduler.pauseTrigger(triggerKey);// 停止触发器
            scheduler.unscheduleJob(triggerKey);// 移除触发器
            scheduler.deleteJob(JobKey.jobKey(key, group));// 删除任务
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}