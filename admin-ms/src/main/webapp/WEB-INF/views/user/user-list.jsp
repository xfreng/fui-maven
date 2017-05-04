<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
    <title>用户管理</title>
    <%@ include file="/WEB-INF/views/include/iplat-common.jsp"%>
    <%@ include file="/WEB-INF/views/include/fui-iplat-common.jsp"%>
</head>
<body>
<jsp:include flush="false" page="/WEB-INF/views/include/iplat.ef.head.jsp">
    <jsp:param value="EDUM03" name="efFormEname"/>
    <jsp:param value="用户管理" name="efFormCname"/>
</jsp:include>
<table id="userManagerTable" style="width:auto;height:auto" rownumbers="true"
       selectOnCheck="true" singleSelect="true" checkOnSelect="true" pagination="true" fitColumns="true"
       toolbar="#toolbar" fitColumns="true" data-options="collapsible: true, modal: true, shadow: true">
    <thead>
    <tr>
        <th field="name" width="10%" align="center">登录名</th>
        <th field="realityName" width="10%" align="center">真实姓名</th>
        <th field="lastLoginTime" width="10%" align="center">最后一次登录时间</th>
        <th field="showRoles" width="20%" align="center">拥有角色</th>
        <th field="operate" width="10%" align="center" data-options="formatter:optionsRender">操作</th>
    </tr>
    </thead>
</table>
<div id="toolbar">
    <form id="queryForm">
        <label style="margin-left:20px;" for="name">登录名：</label>
        <input type="text" id="name" name="name"/>
        <label style="margin-left:20px;" for="realityName">真实姓名：</label>
        <input type="text" id="realityName" name="realityName" placeholder="支持模糊查询"/>
        <shiro:hasPermission name="systemManager.userManager.search">
            <a href="javascript:void(0)" class="easyui-linkbutton" id="searchBtn"
               iconCls="icon-search" onclick="doQuery()">查询</a>
        </shiro:hasPermission>
        <shiro:hasPermission name="systemManager.userManager.add">
            <a href="javascript:void(0)" class="easyui-linkbutton" id="addBtn"
               iconCls="icon-add" onclick="doAdd()">新增</a>
        </shiro:hasPermission>
        <shiro:hasPermission name="systemManager.userManager.update">
            <a href="javascript:void(0)" class="easyui-linkbutton" id="updateBtn"
               iconCls="icon-edit" onclick="doUpdate()">修改</a>
        </shiro:hasPermission>
    </form>
</div>

<div id="dialog" class="easyui-dialog" style="width: 400px" closed="true" buttons="#dlg-buttons"
     data-options="modal: true, shadow: true">
    <form id="optionForm" method="post" novalidate style="margin:0;padding:20px 50px">
        <div style="margin-bottom:20px;font-size:14px;border-bottom:1px solid #ccc">用户信息</div>
        <input type="hidden" name="id">
        <div style="margin-bottom:10px">
            <input name="name" class="easyui-textbox" required="true" label="登录名:"
                   style="width:100%"  data-options="required:true, validType: 'userNameReg'">
        </div>
        <div style="margin-bottom:10px">
            <input name="realityName" class="easyui-textbox" required="true" label="真实姓名:" style="width:100%">
        </div>
        <div style="margin-bottom:10px">
            <input id="rolesCombo" name="roles" class="easyui-combobox" editable="false"
                   required label="角色(<span style='color:red;'>可多选</span>):" style="width:100%">
        </div>
    </form>
</div>
<div id="dlg-buttons">
    <a href="javascript:void(0)" class="easyui-linkbutton c6" iconCls="icon-ok"
       onclick="saveUser()" style="width:90px">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelOption()" style="width:90px">取消</a>
</div>


<div id="permissionsDialog" class="easyui-dialog" style="width:400px; height: 500px;" closed="true"
     data-options="modal: true, shadow: true, title: '权限'">
    <div class="easyui-panel" style="width: 100%; height: 100%;">
        <ul class="easyui-tree" id="showPermissionsTree"></ul>
    </div>
</div>
<script type="text/javascript" src="${path}/public/js/supervisor/user.js"></script>
</body>
</html>
