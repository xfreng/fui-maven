package com.fui.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.baosight.iplat4j.core.FrameworkInfo;
import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiBlockMeta;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.core.ei.json.EiInfo2Json;
import com.baosight.iplat4j.core.ei.json.Json2EiInfo;
import com.baosight.iplat4j.core.exception.PlatException;
import com.baosight.iplat4j.core.resource.I18nMessages;
import com.baosight.iplat4j.ep.QueryMap;
import com.baosight.iplat4j.logging.Logger;
import com.baosight.iplat4j.logging.LoggerFactory;
import com.baosight.iplat4j.util.StringUtils;
import com.fui.service.MenuService;

@Controller
public class ServiceController {
	private static Logger logger = LoggerFactory.getLogger(ServiceController.class);
	private EiBlockMeta eiMetadata;
	@Resource
	private MenuService menuService;

	@RequestMapping("/EiService")
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if (!(StringUtils.hasContent(FrameworkInfo.serverIp))) {
			FrameworkInfo.serverIp = request.getLocalAddr();
		}
		if (!(StringUtils.hasContent(FrameworkInfo.serverContext))) {
			FrameworkInfo.serverContext = request.getContextPath();
		}
		if (FrameworkInfo.serverPort == 0) {
			FrameworkInfo.serverPort = request.getServerPort();
		}

		try {
			request.setCharacterEncoding("UTF-8");
			response.setContentType("text/json; charset=UTF-8");

			String service = request.getParameter("service");
			String method = request.getParameter("method");

			String eiInfoStr = request.getParameter("eiinfo");

			EiInfo inInfo = new EiInfo();

			if (eiInfoStr != null) {
				inInfo = Json2EiInfo.parse(eiInfoStr);
			}

			inInfo.set(EiConstant.serviceName, service);
			inInfo.set(EiConstant.methodName, method);

			EiInfo outInfo = query(inInfo);

			response.getWriter().write(EiInfo2Json.toJsonString(outInfo));
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			String ret = "";
			if (e instanceof PlatException) {
				PlatException platEx = (PlatException) e;
				ret = I18nMessages.getText(platEx);
				Object info = platEx.getReturnObj();
				if (info instanceof EiInfo) {
					ret = ret + "$$$" + ((EiInfo) info).getDetailMsg();
				}
			} else {
				ret = e.getCause().toString();
			}
			response.getWriter().write(ret);
		}
	}

	private EiInfo query(EiInfo inInfo) {
		QueryMap queryInfo = QueryMap.getQueryMap(inInfo);
		String p = (String) queryInfo.get("node");
		List<Map<String, Object>> children = new ArrayList<Map<String, Object>>();
		if (p == null) {
			p = "$";
		}
		if ("$".equals(p))
			children = getTopNodes();
		else {
			children = getChildNodes(p);
		}

		EiInfo outInfo = new EiInfo();
		EiBlock block = outInfo.addBlock(p);
		block.setBlockMeta(initMetaData());
		block.setRows(children);
		return outInfo;
	}

	public EiBlockMeta initMetaData() {
		if (this.eiMetadata == null) {
			this.eiMetadata = new EiBlockMeta();
			EiColumn eiColumn = new EiColumn("label");
			eiColumn.setDescName("label");
			eiColumn.setNullable(false);
			eiColumn.setPrimaryKey(false);
			this.eiMetadata.addMeta(eiColumn);

			eiColumn = new EiColumn("text");
			eiColumn.setDescName("text");
			eiColumn.setNullable(false);
			eiColumn.setPrimaryKey(false);
			this.eiMetadata.addMeta(eiColumn);

			eiColumn = new EiColumn("imagePath");
			eiColumn.setDescName("imagePath");
			eiColumn.setNullable(false);
			eiColumn.setPrimaryKey(false);
			this.eiMetadata.addMeta(eiColumn);

			eiColumn = new EiColumn("leaf");
			eiColumn.setDescName("leaf");
			eiColumn.setType(EiConstant.COLUMN_TYPE_NUMBER);
			eiColumn.setNullable(false);
			eiColumn.setPrimaryKey(false);
			this.eiMetadata.addMeta(eiColumn);

			eiColumn = new EiColumn("url");
			eiColumn.setDescName("url");
			eiColumn.setNullable(false);
			eiColumn.setPrimaryKey(false);
			this.eiMetadata.addMeta(eiColumn);
		}
		return this.eiMetadata;
	}

	private List<Map<String, Object>> getTopNodes() {
		String project = FrameworkInfo.getProjectEname();
		List<Map<String, Object>> projectNodes = getChildNodes(project);
		List<Map<String, Object>> rootNodes = getChildNodes("");

		List<Map<String, Object>> all = new ArrayList<Map<String, Object>>();
		all.addAll(projectNodes);
		all.addAll(rootNodes);
		return all;
	}

	private List<Map<String, Object>> getChildNodes(String p) {
		String node = p;
		if ((!StringUtils.isNotEmpty(node)) || (node.equals("$"))) {
			node = "root";
		}
		return menuService.query(node);
	}
}
