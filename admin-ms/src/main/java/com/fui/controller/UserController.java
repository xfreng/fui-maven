package com.fui.controller;

import com.fui.common.AbstractSuperController;
import com.fui.common.Constants;
import com.fui.common.StringUtils;
import com.fui.model.Roles;
import com.fui.model.User;
import com.fui.service.RoleService;
import com.fui.service.UserService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
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

    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;

    @RequestMapping("/index")
    public ModelAndView index() {
        ModelAndView mv = new ModelAndView("user/list");
        return init(mv);
    }

    @RequestMapping("/state")
    public ModelAndView state() {
        ModelAndView mv = new ModelAndView("user/state");
        return mv;
    }

    @RequestMapping(value = "/list", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String getUserList(@RequestParam(value = "pageIndex", defaultValue = "1") int currPage,
                              @RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {
        Map<String, Object> params = new HashMap<String, Object>();
        String orgId = request.getParameter("orgId");
        if (StringUtils.isNotEmpty(orgId)) {
            params.put("orgId", orgId);
        }
        String userCode = request.getParameter("userCode");
        if (StringUtils.isNotEmpty(userCode)) {
            params.put("userCode", userCode);
        }
        String userName = request.getParameter("userName");
        if (StringUtils.isNotEmpty(userName)) {
            params.put("userName", userName);
        }
        //分页查询
        PageHelper.startPage(currPage, pageSize);
        List<User> list = userService.getUserList(params);
        PageInfo<User> pageInfo = createPagination(list);
        return success(list, pageInfo.getTotal(), "userList");
    }

    @RequestMapping(value = "/add", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String addUser(User user) {
        String roles = request.getParameter("roles");
        return success(userService.addUser(user, roles));
    }

    @RequestMapping(value = "/update", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String updateUser(User user) {
        String roles = request.getParameter("roles");
        return success(userService.updateUser(user, roles));
    }

    @RequestMapping(value = "/roleList", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String getRoles() {
        String userId = request.getParameter("userId");
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("userId", userId);
        List<Roles> roleList = roleService.getRolesList(params);
        if (StringUtils.isNotEmpty(userId)) {
            roleList = userService.getUserRoles(Long.valueOf(userId));
        }
        return success(roleList);
    }

    /**
     * 重新用户密码
     *
     * @param user 用户对象
     * @return 重置密码结果
     */
    @RequestMapping(value = "/resetPwd", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String resetPwd(User user) {
        return success(userService.resetPwd(user));
    }

    /**
     * 启用/禁用用户
     *
     * @param user 用户对象
     * @return 操作结果
     */
    @RequestMapping(value = "/status", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String status(User user) {
        return success(userService.status(user));
    }

    /**
     * 修改密码
     *
     * @param oldPassword  旧密码
     * @param newPassword1 新密码
     * @return 修改结果
     */
    @RequestMapping(value = "/updatePwd", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String updatePwd(String oldPassword, String newPassword1) {
        return success(userService.updatePwd(oldPassword, newPassword1));
    }
}
