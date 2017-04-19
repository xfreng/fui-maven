package com.fui.controller;

import com.fui.common.AbstractSuperController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;

@Controller
public class DestoryController extends AbstractSuperController {
    /**
     * @return login.jsp
     * @throws Exception
     */
    @RequestMapping("/destory")
    public ModelAndView destory() throws Exception {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return new ModelAndView("redirect:/login.jsp");
    }
}
