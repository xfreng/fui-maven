package com.fui.controller;

import com.fui.common.AbstractSuperController;
import com.fui.common.Constants;
import com.fui.model.Organization;
import com.fui.service.OrganizationService;
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

    @Autowired
    private OrganizationService organizationService;

    @RequestMapping("/index")
    public ModelAndView index() {
        ModelAndView mv = new ModelAndView("organization/list");
        return init(mv);
    }

    @RequestMapping("/state")
    public ModelAndView state() {
        ModelAndView mv = new ModelAndView("organization/state");
        return mv;
    }

    @RequestMapping("/selectUserWindow")
    public ModelAndView user() {
        ModelAndView mv = new ModelAndView("organization/user");
        return mv;
    }

    /**
     * 根据主键查询机构，用于机构修改
     *
     * @return 所匹配的机构信息，json字符串
     */
    @RequestMapping(value = "/selectByPrimaryKey", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String selectByPrimaryKey() {
        String id = request.getParameter("id");
        Organization organization = organizationService.selectByPrimaryKey(id);
        return success(organization);
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

    /**
     * 新增机构
     *
     * @param organization
     * @return
     */
    @RequestMapping(value = "/add", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String addOrganization(Organization organization) {
        return success(organizationService.addOrganization(organization));
    }

    /**
     * 修改机构
     *
     * @param organization
     * @return
     */
    @RequestMapping(value = "/update", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String updateOrganization(Organization organization) {
        return success(organizationService.updateOrganization(organization));
    }

    /**
     * 删除机构
     *
     * @param organization
     * @return
     */
    @RequestMapping(value = "/delete", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String deleteOrganization(Organization organization) {
        return success(organizationService.deleteOrganization(organization));
    }
}