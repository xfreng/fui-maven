package com.fui.controller;

import com.fui.common.AbstractSuperController;
import com.fui.common.Constants;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/supervisor/project")
public class SystemController extends AbstractSuperController {

    @RequestMapping("/index")
    public String index() {
        return "system/list";
    }

    @RequestMapping(value = "/list", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public void list() throws Exception {

    }
}
