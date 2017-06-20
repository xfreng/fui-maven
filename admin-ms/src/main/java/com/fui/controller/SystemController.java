package com.fui.controller;

import com.fui.common.AbstractSuperController;
import com.fui.common.Constants;
import com.fui.dao.system.SystemMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/supervisor/project")
public class SystemController extends AbstractSuperController {

    @Autowired
    private SystemMapper systemMapper;

    @RequestMapping("/index")
    public String index() {
        return "system/list";
    }

    @RequestMapping(value = "/list", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String list() throws Exception {
        return success(systemMapper.selectAll(), "systemList");
    }
}
