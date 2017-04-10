<%@ page language="java" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<c:set value="${pageContext.request.contextPath}" var="path" scope="page"/>
<script type="text/javascript" src="${path }/public/EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="${path }/public/EF/jQuery/iplat.ui.accordionx.js"></script>
<script type="text/javascript" src="${path }/public/EP/index.menuTree.js"></script>

<link rel="stylesheet" type="text/css" href="${path }/public/EF/iplat-ui-2.0.css" />
<%
	Object userObj = session.getAttribute("userObject");
	User user = null;
	String menuType = "pact";
	String menuStyle = "red";
	String iplatStyle = "Blue";
	if(userObj != null){
		user = (User)userObj;
		menuType = user.getMenuType();
		menuStyle = user.getStyle();
	}
	if("red".equals(menuStyle)){
		iplatStyle = "Red";
	}else if("black".equals(menuStyle)){
		iplatStyle = "ModernBlack";
	}
%>
<link rel="stylesheet" type="text/css" href="${path }/public/EF/Themes/styleApple/<%=iplatStyle %>/jquery-ui.custom.css" />
<link rel="stylesheet" type="text/css" href="${path }/public/EF/Themes/styleApple/<%=iplatStyle %>/iplat-ui-theme-2.0.css" />
<link rel="stylesheet" type="text/css" href="${path }/public/EP/indexReal-<%=iplatStyle %>-3.0.css" />