package com.fui.controller;

import java.io.PrintWriter;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fui.common.JSON;
import com.fui.service.UserService;

@Controller
public class LoginController {
	private final Logger log = LoggerFactory.getLogger(LoginController.class);
	@Resource
	private UserService userService;

	@SuppressWarnings("unchecked")
	@RequestMapping("/login")
	public void login(HttpServletRequest request, PrintWriter out) {
		String submitData = request.getParameter("submitData");
		Map<String, Object> data = (Map<String, Object>) JSON.decode(submitData);
		String ename = data.get("ename").toString();
		String password = data.get("upass").toString();
		String rand = data.get("rand").toString();
		String json = userService.findUserByName(ename, password, rand);
		out.write(json);
		log.info("登录逻辑处理完成");
	}
}
