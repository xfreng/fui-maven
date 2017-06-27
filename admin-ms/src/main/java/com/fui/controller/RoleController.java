package com.fui.controller;

import com.fui.common.AbstractSuperController;
import com.fui.common.Constants;
import com.fui.common.StringUtils;
import com.fui.model.Roles;
import com.fui.service.RoleService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
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
        return init(mv);
    }

    @RequestMapping("/state")
    public ModelAndView state() {
        ModelAndView mv = new ModelAndView("role/state");
        String showCheckBox = request.getParameter("showCheckBox");
        if (StringUtils.isNotEmpty(showCheckBox)) {
            mv.addObject("showCheckBox", Boolean.parseBoolean(showCheckBox));
        } else {
            mv.addObject("showCheckBox", true);
        }
        return mv;
    }

    @RequestMapping(value = "/list", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String getRoleList(@RequestParam(value = "pageIndex", defaultValue = "1") int currPage,
                              @RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {
        Map<String, Object> params = new HashMap<String, Object>();
        String roleCode = request.getParameter("roleCode");
        if (StringUtils.isNotEmpty(roleCode)) {
            params.put("roleCode", roleCode);
        }
        String roleName = request.getParameter("roleName");
        if (StringUtils.isNotEmpty(roleName)) {
            params.put("roleName", roleName);
        }
        //分页查询
        PageHelper.startPage(currPage, pageSize);
        List<Roles> list = roleService.getRolesList(params);
        PageInfo<Roles> pageInfo = createPagination(list);
        return success(list, pageInfo.getTotal(), "roleList");
    }

    @RequestMapping(value = "/add", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String addRole(Roles roles) {
        return success(roleService.addRoles(roles));
    }

    @RequestMapping(value = "/update", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String updateRole(Roles roles) {
        return success(roleService.updateRoles(roles));
    }
}
