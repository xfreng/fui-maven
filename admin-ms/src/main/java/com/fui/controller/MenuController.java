package com.fui.controller;

import com.fui.common.*;
import com.fui.dao.FuiDao;
import com.fui.model.Menu;
import com.fui.service.MenuService;
import com.talkyun.apus.mybatis.plugin.Page;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/supervisor/menu")
public class MenuController extends AbstractSuperController {
    private final Logger logger = LoggerFactory.getLogger(MenuController.class);

    @Autowired
    private FuiDao fuiDao;
    @Autowired
    private MenuService menuService;

    @RequestMapping("/index")
    public String menuTree() {
        return "menu/list";
    }

    @RequestMapping("/state")
    public String menuState() {
        return "menu/state";
    }

    @RequestMapping(value = "/loadMenuNodes", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String loadMenuNodes() throws Exception {
        String pid = request.getParameter("id");
        List menus = menuService.queryMenuNodeById(pid);
        return success(menus, "treeNodes");
    }

    @RequestMapping(value = "/loadMenuNodePage", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String loadMenuNode_page(@RequestParam(value = "pageIndex", defaultValue = "1") int currPage,
                                    @RequestParam(value = "pageSize", defaultValue = "10") int pageSize) throws Exception {
        String pid = request.getParameter("id");
        Page page = createPagination(currPage, pageSize);
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("page", page);
        params.put("id", pid);
        List<Menu> menus = menuService.queryMenuNodeById_page(params);
        return success(menus, page.getTotalResult(), "treeNodes");
    }

    @RequestMapping(value = "/loadOutlookTreeNodes", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String loadOutlookTreeNodes() throws Exception {
        String pid = request.getParameter("id");
        if (StringUtils.isBlank(pid)) {
            pid = "root";
        }
        List<Menu> menus = menuService.queryMenu(pid);
        return success(menus, "treeNodes");
    }

    @RequestMapping(value = "/saveMenu", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String saveMenu() throws Exception {
        String saveJSON = request.getParameter("data");
        Object object = GsonUtils.fromJson(saveJSON, Object.class);
        boolean bool = menuService.saveMenu(object);
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("count", bool ? 0 : 1);
        return success(param);
    }

    @RequestMapping(value = "/deleteMenu", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String deleteMenu() throws Exception {
        String deleteJSON = request.getParameter("data");
        Object object = GsonUtils.fromJson(deleteJSON, Object.class);
        boolean bool = menuService.deleteMenu(object);
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("count", bool ? 0 : 1);
        return success(param);
    }

    @RequestMapping(value = "/updateMenu", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String updateMenu() throws Exception {
        String updateJSON = request.getParameter("data");
        Object object = GsonUtils.fromJson(updateJSON, Object.class);
        boolean bool = menuService.updateMenu(object);
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("result", bool ? "0" : "1");
        return success(param);
    }

    @RequestMapping("/export")
    public void export(HttpServletResponse response) throws Exception {
        String templateDir = request.getSession().getServletContext().getRealPath("templates");
        String templateFilename = "系统菜单";
        String sqlName = "com.fui.dao.menu.MenuMapper.queryMenuNodeById";
        Map<String, Object> parameters = new HashMap<String, Object>();
        Map<String, Object> exportInfo = new HashMap<String, Object>();
        int totalNum = fuiDao.countBySql(sqlName, parameters);
        List<Map<String, Object>> resultData = fuiDao.query(sqlName, parameters);
        ExcelUtils zipExcelUtil = ExcelUtils.newExportInstance(totalNum, templateDir);
        zipExcelUtil.setTitleCellBold(true);
        String filePath = zipExcelUtil.exportZipExcel(templateFilename, resultData, exportInfo);
        logger.info("导出文件路径文件路径：{}", filePath);
        File file = new File(filePath);
        FileUtils.exportFile(response, "application/vnd.ms-excel", filePath, file.getName());
        // 导出后删除临时文件
        FileUtils.deleteFile(templateDir + File.separator + "temp", file.getName());
    }
}
