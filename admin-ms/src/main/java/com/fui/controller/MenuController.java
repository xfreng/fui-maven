package com.fui.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fui.common.SqlUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fui.common.JSON;
import com.fui.common.ZipExcelUtils;
import com.fui.dao.FuiDao;
import com.fui.model.Menu;
import com.fui.service.MenuService;

@Controller
public class MenuController {
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
		String templateDir = "D:/DayWorkDocs/project_cs/template";
		String templateFilename = "电泳白蓝宝石_双";
		String sqlName = "com.fui.dao.menu.MenuMapper.query";
		Map<String, Object> parameters = new HashMap<String, Object>();
		Map<String, Object> exportInfo = new HashMap<String, Object>();
		exportInfo.put("fixDirection", "双移");
		exportInfo.put("glassArt", "上下300白玻，中间玉砂");
		exportInfo.put("lock", "/");
		exportInfo.put("topWidth", 1885);
		exportInfo.put("bottomWidth", 1885);
		exportInfo.put("leftHeight", 2000);
		exportInfo.put("rightHeight", 2000);
		int totalNum = fuiDao.count(SqlUtils.getCountSql(sqlName),parameters);
		List<Map<String, Object>> resultData = fuiDao.query(sqlName,parameters);
		ZipExcelUtils zipExcelUtil = new ZipExcelUtils(totalNum, templateDir);
		zipExcelUtil.setTitleCellBold(true);
		String filePath = zipExcelUtil.exportZipExcel(templateFilename, resultData, exportInfo);
		System.out.println("文件路径：" + filePath);
	}
}
