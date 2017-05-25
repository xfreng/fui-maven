package com.fui.task;

import com.fui.common.MemCachedUtils;
import com.fui.dao.system.SystemMapper;
import com.fui.model.System;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @Title 定时任务
 * @Author sf.xiong on 2017/4/13.
 */
@Component("fuiTask")
public class FuiTask {
    private final Logger logger = LoggerFactory.getLogger(FuiTask.class);

    @Autowired
    private SystemMapper systemMapper;

    private boolean open;

    public void setOpen(boolean open) {
        this.open = open;
    }

    /**
     * 启动时执行一次，之后每隔2秒执行一次(缓存项目配置信息)
     */
    @Scheduled(fixedRate = 1000 * 2)
    public void init() {
        if(open){
            List<System> systemList = systemMapper.selectAll();
            for (System system : systemList) {
                MemCachedUtils.set(system.getNameDesc(), system.getName());
            }
        }
    }
}
