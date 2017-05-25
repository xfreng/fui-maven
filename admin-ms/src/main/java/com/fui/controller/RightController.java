package com.fui.controller;

import com.fui.common.AbstractSuperController;
import com.fui.common.Constants;
import com.fui.common.StringUtils;
import com.fui.model.Permissions;
import com.fui.service.RightService;
import com.talkyun.apus.mybatis.plugin.Page;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by sf.xiong on 2017-01-11.
 */
@Controller
@RequestMapping(value = "/supervisor/right")
public class RightController extends AbstractSuperController {
    private static Logger logger = LoggerFactory.getLogger(RightController.class);

    @Autowired
    private RightService rightService;

    @RequestMapping("/index")
    public ModelAndView index() {
        ModelAndView mv = new ModelAndView("right/list");
        return mv;
    }

    @RequestMapping("/state")
    public ModelAndView state() {
        ModelAndView mv = new ModelAndView("right/state");
        return mv;
    }

    @RequestMapping(value = "/list", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String getRightList(@RequestParam(value = "page", defaultValue = "1") int currPage,
                               @RequestParam(value = "rows", defaultValue = "10") int pageSize) {
        String id = request.getParameter("id");
        String rightCode = request.getParameter("rightCode");
        String rightName = request.getParameter("rightName");
        Page page = createPagination(currPage, pageSize);
        Map<String, Object> params = new HashMap<String, Object>();
        params.put(Constants.PAGE, page);
        if (StringUtils.isNotEmpty(id)) {
            params.put("id", id);
        }
        if (StringUtils.isNotEmpty(rightCode)) {
            params.put("rightCode", rightCode);
        }
        if (StringUtils.isNotEmpty(rightName)) {
            params.put("rightName", rightName);
        }
        //分页查询
        List<Permissions> list = rightService.getRightsList_page(params);
        return success(list, page.getTotalResult(), "rightList");
    }

    /**
     * 根据主键查询权限，用于权限管理展示
     *
     * @return 所匹配的权限信息，json字符串
     */
    @RequestMapping(value = "/selectByKey", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String selectRightsByKey() {
        String id = request.getParameter("id");
        Collection rights;
        if (StringUtils.isNotEmpty(id)) {
            rights = rightService.selectRightByKey(id);
        } else {
            rights = rightService.selectRootRight();
        }
        return success(rights, "rightNodes");
    }

    /**
     * 新增权限
     *
     * @param rights
     * @return
     */
    @RequestMapping(value = "/add", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String addRight(Permissions rights) {
        return success(rightService.addRights(rights));
    }

    /**
     * 修改权限
     *
     * @param rights
     * @return
     */
    @RequestMapping(value = "/update", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String updateRight(Permissions rights) {
        return success(rightService.updateRights(rights));
    }
}
