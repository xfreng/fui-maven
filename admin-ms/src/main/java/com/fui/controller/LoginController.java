package com.fui.controller;

import com.fui.common.AbstractSuperController;
import com.fui.common.Constants;
import com.fui.common.GsonUtils;
import com.fui.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
@RequestMapping(value = "/supervisor")
public class LoginController extends AbstractSuperController {

    @Autowired
    private UserService userService;

    @RequestMapping("/default")
    public String index() {
        return "default/index";
    }

    @RequestMapping("/pact")
    public String pact() {
        return "pact/index";
    }

    @RequestMapping(value = "/login", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String login() {
        String submitData = request.getParameter("submitData");
        Map<String, Object> data = GsonUtils.fromJson(submitData, Map.class);
        String ename = data.get("ename").toString();
        String password = data.get("upass").toString();
        String rand = data.get("rand").toString();
        Map<String, Object> jsonData = userService.login(ename, password, rand);
        logger.info("登录逻辑处理完成");
        return success(jsonData);
    }
}
