package com.fui.controller;

import com.fui.common.AbstractSuperController;
import com.fui.common.UserUtils;
import com.fui.model.User;
import com.fui.service.StyleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;


@Controller
@RequestMapping(value = "/supervisor/style")
public class StyleController extends AbstractSuperController {
    @Autowired
    private StyleService styleService;

    @RequestMapping("/updateMenuTypeAndStyle")
    public void updateMenuTypeAndStyle() throws Exception {
        String style = request.getParameter("pageStyle");
        String menuType = request.getParameter("menuType");
        User user = UserUtils.getCurrent();
        if (user == null) {
            user = new User();
        }
        Map<String, Object> beanMap = new HashMap<String, Object>();
        beanMap.put("id", user.getId());
        beanMap.put("style", style);
        beanMap.put("menuType", menuType);
        styleService.updateMenuTypeAndStyleByUserId(beanMap);
    }
}
