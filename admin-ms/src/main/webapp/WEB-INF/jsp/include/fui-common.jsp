<%@ page language="java" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ page import="com.fui.model.User"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<c:set value="${pageContext.request.contextPath}" var="path" scope="page"/>
<script type="text/javascript" src="${path }/public/common/fui/jquery/jquery-1.6.2.min.js"></script>
<script type="text/javascript" src="${path }/public/common/fui/fui.js"></script>
<script type="text/javascript" src="${path }/public/common/fui/common.js"></script>
<script type="text/javascript" src="${path }/public/common/fui/json2.js"></script>
<link rel="stylesheet" type="text/css" href="${path }/public/css/login.css"/>
<%
	Object userObj = session.getAttribute("userObject");
	User user = null;
	String menuType = "pact";
	String menuStyle = "red";
	if(userObj != null){
		user = (User)userObj;
		menuType = user.getMenuType();
		menuStyle = user.getStyle();
	}
	if("pact".equals(menuType)){
%>
		<link rel="stylesheet" type="text/css" href="${path }/public/common/fui/themes/<%=menuType %>/fui.css"/>
		<link rel="stylesheet" type="text/css" href="${path }/public/common/fui/themes/<%=menuStyle %>/common.css"/>
		<link rel="stylesheet" type="text/css" href="${path }/public/common/fui/themes/<%=menuStyle %>/skin.css"/>
		<link rel="stylesheet" type="text/css" href="${path }/public/common/fui/themes/<%=menuStyle %>/icons.css"/>
<%
	}else{
%>
		<link rel="stylesheet" type="text/css" href="${path }/public/common/fui/themes/default/fui.css"/>
		<link rel="stylesheet" type="text/css" href="${path }/public/common/fui/themes/icons.css"/>
		<link rel="stylesheet" type="text/css" href="${path }/public/common/fui/themes/default/skin.css"/>
<%
	}
%>
<link rel="stylesheet" type="text/css" href="${path }/public/common/fui/themes/pact/demo.css"/>

<script type="text/javascript">
	fui.contextPath="${path }";
	fui.DataTree.prototype.dataField="data";//兼容改造
</script>