package com.fui.task;

import com.fui.common.MemCachedUtils;
import com.fui.dao.project.ProjectMapper;
import com.fui.model.Project;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.JobKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Title 定时任务
 * @Author sf.xiong on 2017/4/13.
 */
@Service("fuiTask")
public class FuiTask implements Job {
    private final Logger logger = LoggerFactory.getLogger(FuiTask.class);

    @Autowired
    private ProjectMapper projectMapper;

    /**
     * 启动时执行一次，之后每隔2秒执行一次(缓存项目配置信息)
     */
    public void run() {
        List<Project> projectList = projectMapper.selectAll();
        for (Project project : projectList) {
            MemCachedUtils.set(project.getName(), project.getNameDesc());
        }
    }

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        JobKey jobKey = context.getJobDetail().getKey();
        String key = jobKey.getName();
        String group = jobKey.getGroup();
        run();
        logger.info("缓存任务key：{},group：{}启动...", key, group);
    }
}
