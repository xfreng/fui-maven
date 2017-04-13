package com.fui.controller;

import com.fui.common.FileUtils;
import com.fui.common.JSON;
import com.fui.common.ZipExcelUtils;
import com.fui.dao.FuiDao;
import com.fui.model.Menu;
import com.fui.service.MenuService;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class MenuController {
    private final Logger logger = LoggerFactory.getLogger(MenuController.class);

    @Autowired
    private FuiDao fuiDao;
    @Resource
    private MenuService menuService;

    @RequestMapping("/loadMenuNodes")
    public void loadMenuNodes(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String pid = request.getParameter("id");
        List<Map<String, Object>> menus = menuService.queryMenuNodeById(pid);
        Map<String, Object> treeNodes = new HashMap<String, Object>();
        treeNodes.put("treeNodes", menus);
        String json = JSON.encode(treeNodes);
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html");
        response.getWriter().write(json);
    }

    @RequestMapping("/loadOutlookTreeNodes")
    public void loadOutlookTreeNodes(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String pid = request.getParameter("id");
        if (StringUtils.isBlank(pid)) {
            pid = "root";
        }
        List<Menu> menus = menuService.queryMenu(pid);
        Map<String, Object> treeNodes = new HashMap<String, Object>();
        treeNodes.put("treeNodes", menus);
        String json = JSON.encode(treeNodes);
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html");
        response.getWriter().write(json);
    }

    @RequestMapping("/saveMenu")
    public void saveMenu(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String saveJSON = request.getParameter("data");
        Object object = JSON.decode(saveJSON);
        boolean bool = menuService.saveMenu(object);
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("count", bool ? 0 : 1);
        response.getWriter().write(JSON.encode(param));
    }

    @RequestMapping("/deleteMenu")
    public void deleteMenu(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String deleteJSON = request.getParameter("data");
        Object object = JSON.decode(deleteJSON);
        boolean bool = menuService.deleteMenu(object);
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("count", bool ? 0 : 1);
        response.getWriter().write(JSON.encode(param));
    }

    @RequestMapping("/updateMenu")
    public void updateMenu(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String updateJSON = request.getParameter("data");
        Object object = JSON.decode(updateJSON);
        menuService.updateMenu(object);
    }

    @RequestMapping("/export")
    public void export(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String templateDir = request.getSession().getServletContext().getRealPath("templates");
        String templateFilename = "系统菜单";
        String sqlName = "com.fui.dao.menu.MenuMapper.queryMenuNodeById";
        Map<String, Object> parameters = new HashMap<String, Object>();
        Map<String, Object> exportInfo = new HashMap<String, Object>();
        int totalNum = fuiDao.countBySql(sqlName, parameters);
        List<Map<String, Object>> resultData = fuiDao.query(sqlName, parameters);
        ZipExcelUtils zipExcelUtil = ZipExcelUtils.newInstance(totalNum, templateDir);
        zipExcelUtil.setTitleCellBold(true);
        String filePath = zipExcelUtil.exportZipExcel(templateFilename, resultData, exportInfo);
        logger.info("导出文件路径文件路径：{}", filePath);
        File file = new File(filePath);
        FileUtils.exportFile(response, "application/vnd.ms-excel", filePath, file.getName());
        // 导出后删除临时文件
        FileUtils.deleteFile(templateDir + File.separator + "temp", file.getName());
    }
}
