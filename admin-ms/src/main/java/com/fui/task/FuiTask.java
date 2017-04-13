package com.fui.task;

import com.fui.common.MemcachedUtils;
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
 * @Author 熊世凤 on 2017/4/13.
 * @Copyright © 蜂投网 2015 ~ 2017
 */
@Component("fuiTask")
public class FuiTask {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private SystemMapper systemMapper;

    /**
     * 启动时执行一次，之后每隔2秒执行一次(缓存项目配置信息)
     */
    @Scheduled(fixedRate = 1000 * 2)
    public void init() {
        List<System> systemList = systemMapper.selectAll();
        for (System system : systemList) {
            MemcachedUtils.set(system.getNameDesc(), system.getName());
        }
    }
}
