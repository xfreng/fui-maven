package com.fui.controller;

import com.fui.common.AbstractSuperController;
import com.fui.common.Constants;
import com.fui.common.StringUtils;
import com.fui.model.User;
import com.fui.service.UserService;
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
 * @Title 用户管理
 * @Author sf.xiong on 2017/5/5.
 */
@Controller
@RequestMapping(value = "/supervisor/user")
public class UserController extends AbstractSuperController {
    private static Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @RequestMapping("/index")
    public ModelAndView index() {
        ModelAndView mv = new ModelAndView("user/list");
        return mv;
    }

    @RequestMapping("/state")
    public ModelAndView state() {
        ModelAndView mv = new ModelAndView("user/state");
        return mv;
    }

    @RequestMapping(value = "/list", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String getUserList(@RequestParam(value = "page", defaultValue = "1") int currPage,
                              @RequestParam(value = "rows", defaultValue = "10") int pageSize) {
        Page page = createPagination(currPage, pageSize);
        Map<String, Object> params = new HashMap<String, Object>();
        params.put(Constants.PAGE, page);
        String userCode = request.getParameter("userCode");
        if (StringUtils.isNotEmpty(userCode)) {
            params.put("userCode", userCode);
        }
        String userName = request.getParameter("userName");
        if (StringUtils.isNotEmpty(userName)) {
            params.put("userName", userName);
        }
        //分页查询
        List<User> list = userService.getUserList_page(params);
        return success(list, page.getTotalResult(), "userList");
    }

    @RequestMapping(value = "/add", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String addUser(User user) {
        return success(userService.addUser(user));
    }
}
