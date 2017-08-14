package com.fui.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/supervisor")
public class JspController {

    @RequestMapping("/timeout")
    public String timeout() {
        return "error/timeout";
    }

    @RequestMapping("/unAuthorized")
    public String unAuthorized() {
        return "error/unAuthorized";
    }

    @RequestMapping("/404")
    public String notFound() {
        return "error/404";
    }

    @RequestMapping("/500")
    public String serverError() {
        return "error/500";
    }
}
