package com.fui.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fui.common.JSON;
import com.fui.common.StringUtils;
import com.fui.model.DictEntry;
import com.fui.model.DictType;
import com.fui.service.DictService;

/**
 * Created by sf.xiong on 2017-01-11.
 */
@Controller
@RequestMapping(value = "/dict")
public class DictController {
	@Resource
	private DictService dictService;

	@RequestMapping("/queryDictForTree")
	public void queryDictForTree(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String dicttypeid = request.getParameter("dicttypeid");
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("id", dicttypeid);
		List<DictType> dictTreeList = dictService.queryDictForTree(param);
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("data", dictTreeList);
		String json = JSON.encode(data);
		response.getWriter().write(json);
	}

	@RequestMapping("/queryDictType")
	public void queryDictType(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String pageIndex = request.getParameter("pageIndex");
		int offset = StringUtils.isNotEmpty(pageIndex) ? Integer.parseInt(pageIndex) : 0;
		String pageSize = request.getParameter("pageSize");
		int limit = StringUtils.isNotEmpty(pageSize) ? Integer.parseInt(pageSize) : 0;
		String dicttypeid = request.getParameter("dicttypeid");
		String dicttypename = request.getParameter("dicttypename");
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("id", dicttypeid);
		param.put("dicttypename", dicttypename);
		List<DictType> dictTypeList = dictService.queryDictType(param, offset, limit);
		String json = JSON.encode(dictTypeList);
		response.getWriter().write(json);
	}

	@RequestMapping("/saveDictType")
	public void saveDictType(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String saveJSON = request.getParameter("data");
		Object object = JSON.decode(saveJSON);
		boolean bool = dictService.saveDictType(object);
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("count", bool ? 0 : 1);
		response.getWriter().write(JSON.encode(param));
	}

	@RequestMapping("/saveDictEntry")
	public void saveDictEntry(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String saveJSON = request.getParameter("data");
		Object object = JSON.decode(saveJSON);
		boolean bool = dictService.saveDictEntry(object);
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("count", bool ? 0 : 1);
		response.getWriter().write(JSON.encode(param));
	}

	@RequestMapping("/getLayout")
	public void getLayout(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String pageIndex = request.getParameter("pageIndex");
		int offset = StringUtils.isNotEmpty(pageIndex) ? Integer.parseInt(pageIndex) : 0;
		String pageSize = request.getParameter("pageSize");
		int limit = StringUtils.isNotEmpty(pageSize) ? Integer.parseInt(pageSize) : 0;
		String dicttypeid = request.getParameter("dicttypeid");
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("id", dicttypeid);
		List<DictEntry> layoutList = dictService.queryLayout(param, offset, limit);
		String json = JSON.encode(layoutList);
		response.getWriter().write(json);
	}

	@RequestMapping("/getDictData")
	public void getDictData(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String dicttypeid = request.getParameter("dictTypeId");
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("id", dicttypeid);
		List<DictEntry> dictList = dictService.loadDictData(param);
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("dictList", dictList);
		String json = JSON.encode(data);
		response.getWriter().write(json);
	}
}
