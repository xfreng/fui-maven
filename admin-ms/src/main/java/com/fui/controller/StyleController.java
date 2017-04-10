package com.fui.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fui.model.User;
import com.fui.service.StyleService;


@Controller
public class StyleController {
	@Resource
	private StyleService styleService;
	
	@RequestMapping("/updateMenuTypeAndStyle")
	public void updateMenuTypeAndStyle(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String style = request.getParameter("pageStyle");
		String menuType = request.getParameter("menuType");
		Object userObject = request.getSession().getAttribute("userObject");
		User user = new User();
		if(userObject != null){
			user = (User)userObject;
		}
		Map<String, Object> beanMap = new HashMap<String, Object>();
		beanMap.put("id", user.getId());
		beanMap.put("style", style);
		beanMap.put("menuType", menuType);
		styleService.updateMenuTypeAndStyleByUserId(beanMap);
	}
}
