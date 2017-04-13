package com.fui.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class SystemController {

    @RequestMapping("/project")
    public String index(){
        return "/system/system-list";
    }

    @RequestMapping("/list")
    public void list(HttpServletRequest request, HttpServletResponse response) throws Exception {

    }
}
