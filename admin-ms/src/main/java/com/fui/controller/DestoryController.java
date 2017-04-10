package com.fui.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class DestoryController {
	/**
	 * HttpServletRequest.getSession(ture) equals to
	 * HttpServletRequest.getSession() means a new session created if no session
	 * exists request.getSession(false) means if session exists get the
	 * session,or value null
	 * 
	 * @param request
	 * @param response
	 * @return login.jsp
	 * @throws Exception
	 */
	@RequestMapping("/destory")
	public ModelAndView destory(HttpServletRequest request, HttpServletResponse response) throws Exception {
		HttpSession session = request.getSession(false);
		if (session != null) {
			session.invalidate();
		}
		return new ModelAndView("redirect:/login.jsp");
	}
}
