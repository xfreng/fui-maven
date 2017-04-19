package com.fui.service;

import com.fui.common.MD5Utils;
import com.fui.common.WebUtils;
import com.fui.dao.user.UserMapper;
import com.fui.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Service("userService")
public class UserService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private UserMapper userMapper;

    /**
     * @param ename
     * @param password
     * @param rand
     * @return json
     */
    public Map<String, String> findUserByName(String ename, String password, String rand) {
        User user = userMapper.findUserByName(ename);
        HttpSession session = WebUtils.getCurrentRequest().getSession(false);
        String sRand = session.getAttribute("SRAND").toString();
        // 返回处理结果
        Map<String, String> data = new HashMap<String, String>();
        if (!sRand.equalsIgnoreCase(rand)) {
            data.put("message", "验证码输入错误");
            data.put("state", "0");
            data.put("toIndexURL", "login.jsp");
        } else {
            if (user != null) {
                if (MD5Utils.validatePassword(user.getUpass(), password)) {
                    session.setAttribute("userObject", user);
                    data.put("state", "1");
                    data.put("toIndexURL", user.getMenuType());
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
        return data;
    }
}
