package com.fui.controller;

import com.fui.common.AbstractSuperController;
import com.fui.model.User;
import com.fui.service.StyleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;


@Controller
public class StyleController extends AbstractSuperController {
    @Autowired
    private StyleService styleService;

    @RequestMapping("/updateMenuTypeAndStyle")
    public void updateMenuTypeAndStyle() throws Exception {
        String style = request.getParameter("pageStyle");
        String menuType = request.getParameter("menuType");
        Object userObject = request.getSession().getAttribute("userObject");
        User user = new User();
        if (userObject != null) {
            user = (User) userObject;
        }
        Map<String, Object> beanMap = new HashMap<String, Object>();
        beanMap.put("id", user.getId());
        beanMap.put("style", style);
        beanMap.put("menuType", menuType);
        styleService.updateMenuTypeAndStyleByUserId(beanMap);
    }
}
