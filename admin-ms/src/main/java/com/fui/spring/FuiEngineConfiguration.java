package com.fui.spring;

import com.fui.common.QuartzManager;
import com.fui.common.StringUtils;
import com.fui.model.ScheduleJob;
import com.fui.task.FuiTask;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.jdbc.ScriptRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;

import javax.sql.DataSource;
import java.nio.charset.Charset;

/**
 * @Title 工程配置类
 * @Author sf.xiong on 2017/7/12.
 */
public class FuiEngineConfiguration {

    protected String databaseType;
    protected boolean databaseSchemaUpdate = false;
    protected boolean quartzSwitch = false;
    protected String cronExpression = "0/2 * * * * ?";
    protected DataSource dataSource;
    @Autowired
    private SchedulerFactoryBean schedulerFactoryBean;
    @Autowired
    private FuiTask fuiTask;

    protected FuiEngineConfiguration() {

    }

    public void init() throws Exception {
        if (databaseSchemaUpdate) {
            ScriptRunner runner = new ScriptRunner(dataSource.getConnection());
            Resources.setCharset(Charset.forName("utf-8"));
            runner.runScript(Resources.getResourceAsReader("db/" + databaseType + "/fui_user.sql"));
            runner.runScript(Resources.getResourceAsReader("db/" + databaseType + "/fui.sql"));
            runner.closeConnection();
        }
        if (quartzSwitch) {
            ScheduleJob scheduleJob = new ScheduleJob();
            scheduleJob.setJobId(StringUtils.getUUID());
            scheduleJob.setJobName("memCached");
            scheduleJob.setJobGroup("cachedWork");
            scheduleJob.setJobStatus("1");
            scheduleJob.setCronExpression(cronExpression);
            scheduleJob.setDesc("缓存项目配置信息任务");
            QuartzManager.addJob(schedulerFactoryBean, scheduleJob, FuiTask.class);
        } else {
            fuiTask.run();
        }
    }

    public void setDatabaseType(String databaseType) {
        this.databaseType = databaseType;
    }

    public void setDatabaseSchemaUpdate(boolean databaseSchemaUpdate) {
        this.databaseSchemaUpdate = databaseSchemaUpdate;
    }

    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public void setQuartzSwitch(boolean quartzSwitch) {
        this.quartzSwitch = quartzSwitch;
    }

    public void setCronExpression(String cronExpression) {
        this.cronExpression = cronExpression;
    }
}