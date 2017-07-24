package com.fui.spring;

import com.fui.common.CommonConfiguration;
import com.fui.common.QuartzManager;
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
    protected String databaseSchemaUpdate;
    protected DataSource dataSource;
    @Autowired
    private SchedulerFactoryBean schedulerFactoryBean;
    @Autowired
    private FuiTask fuiTask;

    protected FuiEngineConfiguration() {

    }

    public void init() throws Exception {
        if (Boolean.parseBoolean(databaseSchemaUpdate)) {
            ScriptRunner runner = new ScriptRunner(dataSource.getConnection());
            Resources.setCharset(Charset.forName("utf-8"));
            runner.runScript(Resources.getResourceAsReader("db/" + databaseType + "/fui_user.sql"));
            runner.runScript(Resources.getResourceAsReader("db/" + databaseType + "/fui.sql"));
            runner.closeConnection();
        }
        String quartzSwitch = CommonConfiguration.getValue("quartz.switch");
        if (Boolean.parseBoolean(quartzSwitch)) {
            ScheduleJob scheduleJob = new ScheduleJob();
            scheduleJob.setJobId(com.fui.common.StringUtils.getUUID());
            scheduleJob.setJobName("memcached");
            scheduleJob.setJobGroup("cachedWork");
            scheduleJob.setJobStatus("1");
            scheduleJob.setCronExpression("0/2 * * * * ?");
            scheduleJob.setDesc("缓存项目配置信息任务");
            QuartzManager.addJob(schedulerFactoryBean, scheduleJob, FuiTask.class);
        } else {
            fuiTask.run();
        }
    }

    public void setDatabaseType(String databaseType) {
        this.databaseType = databaseType;
    }

    public void setDatabaseSchemaUpdate(String databaseSchemaUpdate) {
        this.databaseSchemaUpdate = databaseSchemaUpdate;
    }

    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
    }
}