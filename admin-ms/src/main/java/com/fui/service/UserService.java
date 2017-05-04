package com.fui.service;

import com.fui.common.*;
import com.fui.dao.user.UserMapper;
import com.fui.model.ManageToken;
import com.fui.model.User;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service("userService")
public class UserService {
    private final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private TokenUtils tokenUtils;
    @Autowired
    private UserMapper userMapper;

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
     * @param ename
     * @param password
     * @param rand
     * @return json
     */
    public Map<String, String> findUserByName(String ename, String password, String rand) {
        // 返回处理结果
        Map<String, String> data = new HashMap<String, String>();
        try {
            User user = userMapper.findUserByName(ename);
            HttpSession session = WebUtils.getCurrentRequest().getSession(false);
            String sRand = session.getAttribute("SRAND").toString();
            if (!sRand.equalsIgnoreCase(rand)) {
                data.put("message", "验证码输入错误");
                data.put("state", "0");
                data.put("toIndexURL", "login.jsp");
            } else {
                if (user != null) {
                    if (MD5Utils.generatePassword(password).equals(user.getPassword())) {
                        session.setAttribute("userObject", user);
                        data.put("state", "1");
                        data.put("toIndexURL", "supervisor/" + user.getMenuType());
                        user.setLoginCount(user.getLoginCount() + 1);
                        user.setLastLoginTime(new Date(System.currentTimeMillis()));
                        userMapper.updateByPrimaryKey(user);
                    } else {
                        logger.error("用户密码错误");
                        data.put("message", "用户密码错误，请重新输入");
                        data.put("state", "0");
                        data.put("toIndexURL", "login.jsp");
                    }
                } else {
                    logger.info("用户名不存在");
                    data.put("message", "用户名不存在，请重新输入");
                    data.put("state", "0");
                    data.put("toIndexURL", "login.jsp");
                }
            }
        } catch (Exception e) {
            data.put("state", "0");
            logger.error("登录异常 {} ", e);
        }
        return data;
    }
}
