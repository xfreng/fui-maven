<%@page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/views/include/iplat-common.jsp"%>
    <%@include file="/WEB-INF/views/include/fui-iplat-common.jsp"%>
    <title>用户管理</title>
</head>
<body>
<jsp:include flush="false" page="/WEB-INF/views/include/iplat.ef.head.jsp">
    <jsp:param value="EDUM01" name="efFormEname"/>
    <jsp:param value="用户管理" name="efFormCname"/>
</jsp:include>
<div id="layout" class="fui-layout" style="width:100%;">
    <div region="north" showHeader="false" bodyStyle="overflow:hidden;" showSplit="false" showCollapseButton="false">
        <div class="fui-panel" title="查询条件" bodyStyle="overflow:hidden;" style="width: 100%;">
            <form id="queryForm">
                <label style="margin-left:20px;" for="userCode">登录名：</label>
                <input class="fui-textbox" id="userCode" name="userCode"/>
                <label style="margin-left:20px;" for="userName">用户姓名：</label>
                <input class="fui-textbox" id="userName" name="userName" placeholder="支持模糊查询"/>
                <a class="fui-button"  iconCls="icon-search" onclick="doQuery()">查询</a>
            </form>
        </div>
    </div>
    <div showHeader="false" region="center" bodyStyle="overflow:hidden;" style="border:0;">
        <div class="fui-toolbar" style="border-top:0;border-left:0;border-right:0;">
            <a class="fui-button" iconCls="icon-addnew" onclick="doAdd_update('A')">新增</a>
            <a class="fui-button" iconCls="icon-edit" onclick="doAdd_update('U')">修改</a>
        </div>
        <div id="userManagerGrid" class="fui-datagrid" style="width:100%;height:94%;" multiSelect="false"
               url="${path }/supervisor/user/list" idField="id" pageSize="20"
               dataField="userList" showFilterRow="false" allowCellSelect="true"
               allowCellEdit="true">
            <div property="columns">
                <div field="ename" width="100" headerAlign="center" align="center">登录名</div>
                <div field="cname" width="130" headerAlign="center" align="center">真实姓名</div>
                <div field="lastLoginTime" width="150" headerAlign="center" align="center" dateFormat="yyyy-MM-dd HH:mm:ss">最后一次登录时间</div>
                <div field="showRoles" width="200" headerAlign="center" align="center" renderer="roleRender">拥有角色</div>
                <div field="operate" width="160" headerAlign="center" align="center" renderer="operateRender">操作</div>
            </div>
        </div>
    </div>
</div>
</body>
<script type="text/javascript" src="${path}/public/js/supervisor/user.js"></script>
</html>
