package com.fui.controller;

import com.alibaba.fastjson.JSONObject;
import com.fui.common.AbstractSuperController;
import com.fui.common.Constants;
import com.fui.common.UserUtils;
import com.fui.model.User;
import com.fui.service.StyleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;


@Controller
@RequestMapping(value = "/supervisor/style")
public class StyleController extends AbstractSuperController {
    @Autowired
    private StyleService styleService;

    @RequestMapping(value = "/updateMenuTypeAndStyle", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String updateMenuTypeAndStyle() throws Exception {
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
        boolean bool = styleService.updateMenuTypeAndStyleByUserId(beanMap);
        JSONObject json = new JSONObject();
        json.put("result", bool ? "1" : "0");
        return success(json);
    }
}
