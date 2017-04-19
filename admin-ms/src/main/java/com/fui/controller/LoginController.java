package com.fui.controller;

import com.fui.common.AbstractSuperController;
import com.fui.common.Constants;
import com.fui.common.JSON;
import com.fui.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
public class LoginController extends AbstractSuperController {
    private final Logger log = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private UserService userService;

    @SuppressWarnings("unchecked")
    @RequestMapping(value = "/login", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String login() {
        String submitData = request.getParameter("submitData");
        Map<String, Object> data = (Map<String, Object>) JSON.decode(submitData);
        String ename = data.get("ename").toString();
        String password = data.get("upass").toString();
        String rand = data.get("rand").toString();
        Map<String, String> jsonData = userService.findUserByName(ename, password, rand);
        log.info("登录逻辑处理完成");
        return success(jsonData);
    }
}
