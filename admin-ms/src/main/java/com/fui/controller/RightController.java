package com.fui.controller;

import com.fui.common.AbstractSuperController;
import com.fui.common.Constants;
import com.fui.common.StringUtils;
import com.fui.model.Permissions;
import com.fui.service.RightService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
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

    @Autowired
    private RightService rightService;

    @RequestMapping("/index")
    public ModelAndView index() {
        ModelAndView mv = new ModelAndView("right/list");
        return init(mv);
    }

    @RequestMapping("/state")
    public ModelAndView state() {
        ModelAndView mv = new ModelAndView("right/state");
        return mv;
    }

    @RequestMapping("/selectTreeWindow")
    public ModelAndView tree() {
        ModelAndView mv = new ModelAndView("right/tree");
        return mv;
    }

    @RequestMapping(value = "/list", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String getRightList(@RequestParam(value = "pageIndex", defaultValue = "1") int currPage,
                               @RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {
        String id = request.getParameter("id");
        String rightName = request.getParameter("rightName");
        Map<String, Object> params = new HashMap<String, Object>();
        if (StringUtils.isNotEmpty(id)) {
            params.put("id", id);
        }
        if (StringUtils.isNotEmpty(rightName)) {
            params.put("text", rightName);
        }
        //分页查询
        PageHelper.startPage(currPage, pageSize);
        List<Permissions> list = rightService.getRightsList(params);
        PageInfo<Permissions> pageInfo = createPagination(list);
        return success(list, pageInfo.getTotal(), "rightList");
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
        String roleCode = request.getParameter("roleCode");
        Collection rights;
        if (StringUtils.isNotEmpty(id)) {
            rights = rightService.selectRightByKey(id, roleCode);
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
