package com.fui.controller;

import com.fui.common.AbstractSuperController;
import com.fui.common.Constants;
import com.fui.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/supervisor/project")
public class ProjectController extends AbstractSuperController {

    @Autowired
    private ProjectService projectService;

    @RequestMapping("/index")
    public ModelAndView index() {
        ModelAndView mv = new ModelAndView("project/list");
        return init(mv);
    }

    @RequestMapping(value = "/list", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String list() throws Exception {
        return success(projectService.selectAll(), "projectList");
    }

    @RequestMapping(value = "/save", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String save(String data) throws Exception {
        return success(projectService.save(data));
    }
}
