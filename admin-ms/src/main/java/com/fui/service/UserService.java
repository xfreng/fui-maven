package com.fui.service;

import com.alibaba.fastjson.JSONObject;
import com.fui.common.*;
import com.fui.dao.shiro.RolesMapper;
import com.fui.dao.shiro.UserRolesMapper;
import com.fui.dao.user.UserMapper;
import com.fui.model.*;
import com.fui.task.FuiTask;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.lang.System;
import java.util.*;

@Service("userService")
public class UserService {
    private final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private TokenUtils tokenUtils;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private RolesMapper rolesMapper;
    @Autowired
    private UserRolesMapper userRolesMapper;
    @Autowired
    private SchedulerFactoryBean schedulerFactoryBean;

    public Map<String, Object> login(String username, String password, String code) {
        Map<String, Object> data = new HashMap<String, Object>();

        HttpSession session = WebUtils.getCurrentRequest().getSession(false);
        String sRand = session.getAttribute("SRAND").toString();
        //校验验证码
        if (StringUtils.isBlank(sRand)) { //session超时
            data.put("state", "0");
            data.put("message", "验证码已失效，请刷新以重新获取");
            data.put("toIndexURL", "login.jsp");
            return data;
        }
        if (!sRand.equalsIgnoreCase(code)) {
            data.put("state", "0");
            data.put("message", "验证码错误");
            data.put("toIndexURL", "login.jsp");
            return data;
        }

        //校验用户名及密码
        password = MD5Utils.generatePassword(password);
        UsernamePasswordToken token = new UsernamePasswordToken(username, password);
        //获取当前的Subject
        Subject currentUser = SecurityUtils.getSubject();
        try {
            logger.info("对用户 {} 进行登录验证...验证开始", username);
            currentUser.login(token); //shiro登录
            logger.info("对用户 {} 进行登录验证...验证通过", username);
        } catch (UnknownAccountException uae) {  //用户名不存在
            data.put("state", "0");
            data.put("message", "用户名或者密码错误");
            data.put("toIndexURL", "login.jsp");
        } catch (IncorrectCredentialsException ice) {  //密码错误
            data.put("state", "0");
            data.put("message", "用户名或者密码错误");
            data.put("toIndexURL", "login.jsp");
        } catch (LockedAccountException lae) {  //账户被禁用
            data.put("state", "0");
            data.put("message", "此账户已被禁用");
            data.put("toIndexURL", "login.jsp");
        } catch (AuthenticationException ae) {
            data.put("state", "0");
            data.put("message", "用户名或者密码错误");
            data.put("toIndexURL", "login.jsp");
        } catch (Exception e) {
            logger.error("login Exception: {}", e);
            data.put("state", "0");
            data.put("message", "系统错误");
            data.put("toIndexURL", "login.jsp");
        }

        //验证是否登录成功
        if (currentUser.isAuthenticated()) {
            logger.info("用户 {} 登录认证通过", username);
            String quartzSwitch = CommonConfiguration.getValue("quartz.switch");
            if ("1".equals(quartzSwitch)) {
                ScheduleJob scheduleJob = new ScheduleJob();
                scheduleJob.setJobId(com.fui.common.StringUtils.getUUID());
                scheduleJob.setJobName("memcached");
                scheduleJob.setJobGroup("cachedWork");
                scheduleJob.setJobStatus("1");
                scheduleJob.setCronExpression("0/2 * * * * ?");
                scheduleJob.setDesc("缓存项目配置信息任务");
                QuartzManager.addJob(schedulerFactoryBean, scheduleJob, FuiTask.class);
            }
        } else {
            token.clear();
            return data;
        }
        //设置token
        User user = UserUtils.getCurrent();
        data.put("state", "1");
        data.put("toIndexURL", "supervisor/" + user.getMenuType());
        ManageToken manageToken = null;
        try {
            manageToken = setToken(user);
        } catch (IOException e) {
            logger.info("设置token出错 {}", e);
        }
        //存入session
        WebUtils.getCurrentRequest().getSession(false).setAttribute(Constants.USER_SESSION_ID, manageToken);
        data.put("data", manageToken);
        return data;
    }

    private ManageToken setToken(User user) throws IOException {
        //更新最后登录时间及登录次数
        user.setLastLoginTime(new Date(System.currentTimeMillis()));
        Long loginCount = user.getLoginCount();
        user.setLoginCount(loginCount == null ? 1L : loginCount + 1);
        userMapper.updateByPrimaryKeySelective(user);
        //生成并返回登录token
        ManageToken manageTokenVo = tokenUtils.toManageToken(user);
        return manageTokenVo;
    }

    /**
     * 分页查询用户信息
     *
     * @param params 查询条件
     * @return 用户信息列表
     */
    public List<User> getUserList(Map<String, Object> params) {
        return userMapper.getUserList(params);
    }

    /**
     * 根据用户名查询用户信息
     *
     * @param userCode
     * @return User
     */
    public User findUserByCode(String userCode) {
        return userMapper.findUserByCode(userCode);
    }

    /**
     * 新增用户
     *
     * @param user
     * @return 操作信息
     */
    public JSONObject addUser(User user, String roles) {
        JSONObject json = new JSONObject();
        User oldUser = findUserByCode(user.getEname());
        if (oldUser != null) {
            json.put("message", "用户名已经存在");
            return json;
        }
        user.setPassword(MD5Utils.generatePassword(Constants.DEFAULT_USER_PWD));
        user.setErased(false);
        user.setStyle(Constants.DEFAULT_STYLE);
        user.setMenuType(Constants.DEFAULT_STYLE);
        user.setLoginCount(0L);
        int i = userMapper.insert(user);
        List<String> userRoleList = com.fui.common.StringUtils.asList(roles, ",");
        UserRoles userRoles = new UserRoles();
        userRoles.setUserId(user.getId());
        for (String roleId : userRoleList) {
            userRoles.setRoleId(Long.valueOf(roleId));
            userRolesMapper.insert(userRoles);
        }
        json.put("message", i > 0 ? "用户添加成功" : "用户添加失败");
        return json;
    }

    /**
     * 修改用户
     *
     * @param user
     * @return 操作信息
     */
    public JSONObject updateUser(User user, String roles) {
        JSONObject json = new JSONObject();
        int i = userMapper.updateByPrimaryKeySelective(user);
        userRolesMapper.deleteByUserId(user.getId());// 更新之前，清除用户角色关联信息
        List<String> userRoleList = com.fui.common.StringUtils.asList(roles, ",");
        UserRoles userRoles = new UserRoles();
        userRoles.setUserId(user.getId());
        for (String roleId : userRoleList) {
            userRoles.setRoleId(Long.valueOf(roleId));
            userRolesMapper.insert(userRoles);
        }
        json.put("message", i > 0 ? "用户修改成功" : "用户修改失败");
        return json;
    }

    /**
     * 获取用户拥有的角色
     *
     * @param userId
     * @return 角色列表
     */
    public List<Roles> getUserRoles(Long userId) {
        List<Roles> userRoles = new ArrayList<Roles>();
        List<Long> roleIdList = userRolesMapper.selectRolesByUserId(userId);
        for (Long roleId : roleIdList) {
            Roles roles = rolesMapper.selectByPrimaryKey(roleId);
            userRoles.add(roles);
        }
        return userRoles;
    }

    /**
     * 重置用户密码
     *
     * @param user 用户对象
     * @return 重置密码结果
     */
    public JSONObject resetPwd(User user) {
        JSONObject json = new JSONObject();
        if (Constants.SUPER_USER_ID.equals(user.getEname())) {
            json.put("message", "超级管理员密码不允许操作");
        } else {
            int result = 0;
            try {
                user.setPassword(MD5Utils.generatePassword(Constants.DEFAULT_USER_PWD));
                result = userMapper.updateByPrimaryKeySelective(user);
            } catch (Exception e) {
                logger.error("重置用户密码异常：{}", e);
            }
            if (result == 1) {
                json.put("message", "成功");
            } else {
                json.put("message", "失败");
            }
        }
        return json;
    }

    /**
     * 启用/禁用用户
     *
     * @param user 用户对象
     * @return 更新结果
     */
    public JSONObject status(User user) {
        JSONObject json = new JSONObject();
        if (Constants.SUPER_USER_ID.equals(user.getEname())) {
            json.put("result", "0");
            json.put("message", "超级管理员状态不允许操作");
        } else {
            if (user.getErased()) {
                user.setErased(false);
            } else {
                user.setErased(true);
            }
            int result = userMapper.updateByPrimaryKeySelective(user);
            if (result == 1) {
                json.put("result", "1");
                json.put("message", "成功");
            } else {
                json.put("result", "0");
                json.put("message", "失败");
            }
        }
        return json;
    }

    /**
     * 更新用户密码
     *
     * @param oldPassword 旧密码
     * @param newPassword 新密码
     * @return 更新结果
     */
    public JSONObject updatePwd(String oldPassword, String newPassword) {
        User user = UserUtils.getCurrent();
        JSONObject json = new JSONObject();
        try {
            oldPassword = MD5Utils.encodeByMD5(oldPassword);
            if (!oldPassword.equals(user.getPassword())) {
                json.put("result", "0");
                json.put("message", "原始密码错误！");
                return json;
            }

            newPassword = MD5Utils.encodeByMD5(newPassword);
            User newUser = new User();
            newUser.setId(user.getId());
            newUser.setPassword(newPassword);
            int result = userMapper.updateByPrimaryKeySelective(newUser);
            if (result == 1) {
                json.put("result", "1");
                json.put("message", "密码修改成功，请重新登录！");
            } else {
                json.put("result", "0");
                json.put("message", "密码修改失败！");
            }
        } catch (Exception e) {
            logger.error("修改密码失败：{}", e);
            json.put("result", "0");
            json.put("message", "密码修改失败！");
        }
        return json;
    }
}
