package com.fui.controller;

import com.fui.common.AbstractSuperController;
import com.fui.common.Constants;
import com.fui.service.OrganizationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.Collection;

/**
 * @Author sf.xiong on 2017/6/28.
 */
@Controller
@RequestMapping(value = "/supervisor/organization")
public class OrganizationController extends AbstractSuperController {
    private static Logger logger = LoggerFactory.getLogger(RightController.class);

    @Autowired
    private OrganizationService organizationService;

    @RequestMapping("/index")
    public ModelAndView index() {
        ModelAndView mv = new ModelAndView("organization/list");
        return init(mv);
    }

    /**
     * 根据主键查询机构，用于机构管理展示
     *
     * @return 所匹配的机构信息，json字符串
     */
    @RequestMapping(value = "/selectByKey", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String selectOrganizationsByKey() {
        String id = request.getParameter("id");
        Collection organizations = organizationService.selectOrganizationByKey(id);
        return success(organizations, "organizationNodes");
    }
}