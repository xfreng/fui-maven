package com.fui.controller;

import com.fui.common.AbstractSuperController;
import com.fui.common.Constants;
import com.fui.common.StringUtils;
import com.fui.model.Roles;
import com.fui.service.RoleService;
import com.talkyun.apus.mybatis.plugin.Page;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by sf.xiong on 2017-01-11.
 */
@Controller
@RequestMapping(value = "/supervisor/role")
public class RoleController extends AbstractSuperController {
    private static Logger logger = LoggerFactory.getLogger(RoleController.class);

    @Autowired
    private RoleService roleService;

    @RequestMapping("/index")
    public ModelAndView index() {
        ModelAndView mv = new ModelAndView("role/list");
        return mv;
    }

    @RequestMapping("/state")
    public ModelAndView state() {
        ModelAndView mv = new ModelAndView("role/state");
        return mv;
    }

    @RequestMapping(value = "/list", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String getRoleList(@RequestParam(value = "page", defaultValue = "1") int currPage,
                              @RequestParam(value = "rows", defaultValue = "10") int pageSize) {
        Page page = createPagination(currPage, pageSize);
        Map<String, Object> params = new HashMap<String, Object>();
        params.put(Constants.PAGE, page);
        String roleCode = request.getParameter("roleCode");
        if (StringUtils.isNotEmpty(roleCode)) {
            params.put("roleCode", roleCode);
        }
        String roleName = request.getParameter("roleName");
        if (StringUtils.isNotEmpty(roleName)) {
            params.put("roleName", roleName);
        }
        //分页查询
        List<Roles> list = roleService.getRolesList_page(params);
        return success(list, page.getTotalResult(), "roleList");
    }

    @RequestMapping(value = "/add", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String addRole(Roles roles) {
        return success(roleService.addRoles(roles));
    }
}
