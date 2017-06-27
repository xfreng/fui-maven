package com.fui.controller;

import com.fui.common.AbstractSuperController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by sf.xiong on 2017-01-11.
 */
@Controller
@RequestMapping(value = "/supervisor/page")
public class PageController extends AbstractSuperController {
    private final Logger logger = LoggerFactory.getLogger(MenuController.class);

    @RequestMapping("/index")
    public ModelAndView page() {
        ModelAndView mv = new ModelAndView("page/list");
        return init(mv);
    }
}
