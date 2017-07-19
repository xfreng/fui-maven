<%@ page language="java" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ page import="com.fui.common.UserUtils"%>
<%@ page import="com.fui.core.FrameworkInfo" %>
<%@ page import="com.fui.model.User" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<c:set value="${pageContext.request.contextPath}" var="path" scope="page"/>
<script type="text/javascript" src="${path}/public/common/fui/jquery/jquery-1.6.2.min.js"></script>
<script type="text/javascript" src="${path}/public/common/fui/fui.js"></script>
<script type="text/javascript" src="${path}/public/common/fui/fui-ext.js"></script>
<script type="text/javascript" src="${path}/public/common/fui/common.js"></script>
<script type="text/javascript" src="${path}/public/common/fui/json2.js"></script>
<script type="text/javascript" src="${path}/public/common/fui/swfupload/swfupload.js"></script>
<link rel="stylesheet" type="text/css" href="${path}/public/css/login.css"/>
<%
	User user = UserUtils.getCurrent();
	String menuType = "pact";
	String menuStyle = "red";
	if(user != null){
		menuType = user.getMenuType();
		menuStyle = user.getStyle();
	}

	Object projectName = FrameworkInfo.getProjectName();
	Object background = FrameworkInfo.getLoginBackground();
	Object logo = FrameworkInfo.getLogo();
	Object dev = FrameworkInfo.getDev();

	request.setAttribute("menuType",menuType);
	request.setAttribute("menuStyle",menuStyle);
	request.setAttribute("projectName",projectName);
	request.setAttribute("background",background);
	request.setAttribute("logo",logo);
	request.setAttribute("dev",dev);
%>
<c:choose>
	<c:when test="${'pact' eq menuType}">
		<link rel="stylesheet" type="text/css" href="${path}/public/common/fui/themes/pact/fui.css"/>
		<link rel="stylesheet" type="text/css" href="${path}/public/common/fui/themes/${menuStyle}/common.css"/>
		<link rel="stylesheet" type="text/css" href="${path}/public/common/fui/themes/${menuStyle}/skin.css"/>
		<link rel="stylesheet" type="text/css" href="${path}/public/common/fui/themes/${menuStyle}/icons.css"/>
	</c:when>
	<c:otherwise>
		<link rel="stylesheet" type="text/css" href="${path}/public/common/fui/themes/default/fui.css"/>
		<link rel="stylesheet" type="text/css" href="${path}/public/common/fui/themes/icons.css"/>
		<link rel="stylesheet" type="text/css" href="${path}/public/common/fui/themes/${menuStyle}/skin.css"/>
	</c:otherwise>
</c:choose>
<link rel="stylesheet" type="text/css" href="${path}/public/common/fui/themes/pact/demo.css"/>

<script type="text/javascript">
	fui.contextPath="${path}";
	fui.DataTree.prototype.dataField="data";//兼容改造
</script>