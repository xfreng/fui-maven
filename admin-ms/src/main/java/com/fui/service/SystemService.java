package com.fui.service;

import com.fui.dao.system.SystemMapper;
import com.fui.model.System;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Title
 * @Author sf.xiong on 2017/4/13.
 */
@Service("systemService")
public class SystemService {
    private final Logger logger = LoggerFactory.getLogger(SystemService.class);

    @Autowired
    private SystemMapper systemMapper;

    /**
     * 查询所有数据
     * @return list
     */
    public List<System> selectAll() {
        return systemMapper.selectAll();
    }
}
