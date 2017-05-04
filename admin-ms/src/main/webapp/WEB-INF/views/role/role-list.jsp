<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
    <title>角色管理</title>
</head>
<body>
<table id="rolesTable" style="width:auto;height:auto" rownumbers="true"
       selectOnCheck="true" singleSelect="true" checkOnSelect="true" pagination="true" fitColumns="true"
       toolbar="#toolbar" fitColumns="true" data-options="collapsible: true, modal: true, shadow: true">
    <thead>
    <tr>
        <th field="roleName" width="10%" align="center">名称</th>
        <shiro:hasPermission name="systemManager.roleManager.view">
            <th field="operate" width="30%" align="center" data-options="formatter:permissionsRender">操作</th>
        </shiro:hasPermission>
    </tr>
    </thead>
</table>
<div id="toolbar">
    <form id="queryForm">
        <label style="margin-left:20px;" for="roleName">角色名称：</label>
        <input type="text" id="roleName" name="roleName" placeholder="支持模糊查询"/>
        <shiro:hasPermission name="systemManager.roleManager.search">
            <a href="javascript:void(0)" class="easyui-linkbutton" id="searchBtn"
               iconCls="icon-search" onclick="doQuery()">查询</a>
        </shiro:hasPermission>
        <shiro:hasPermission name="systemManager.roleManager.add">
            <a href="javascript:void(0)" class="easyui-linkbutton" id="addBtn"
               iconCls="icon-add" onclick="doAdd()">新增</a>
        </shiro:hasPermission>
        <shiro:hasPermission name="systemManager.roleManager.update">
            <a href="javascript:void(0)" class="easyui-linkbutton" id="updateBtn"
               iconCls="icon-edit" onclick="doUpdate()">修改</a>
        </shiro:hasPermission>
    </form>
</div>

<div id="dialog" class="easyui-dialog" style="width: 500px" closed="true" buttons="#dlg-buttons"
     data-options="modal: true, shadow: true">
    <form id="optionForm" method="post" novalidate style="margin:0;padding:20px 50px">
        <div style="margin-bottom:20px;font-size:14px;border-bottom:1px solid #ccc">角色信息</div>
        <input type="hidden" name="id">
        <div style="margin-bottom:10px">
            <input name="roleName" class="easyui-textbox" required="true" label="角色名称:" style="width:100%">
        </div>
        <div style="margin-bottom:10px">
            <label>权限:</label>
            <div class="easyui-panel" style="width: 100%; height: 400px;">
                <ul class="easyui-tree" id="permTree" name="permissions"></ul>
            </div>
        </div>
    </form>
</div>
<div id="dlg-buttons">
    <a href="javascript:void(0)" class="easyui-linkbutton c6" iconCls="icon-ok"
       onclick="saveRole()" style="width:90px">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelOption()" style="width:90px">取消</a>
</div>


<div id="permissionsDialog" class="easyui-dialog" style="width:400px; height: 500px;" closed="true"
     data-options="modal: true, shadow: true, title: '权限'">
    <div class="easyui-panel" style="width: 100%; height: 100%;">
        <ul class="easyui-tree" id="showPermissionsTree"></ul>
    </div>
</div>
<script type="text/javascript" src="${path}/public/js/supervisor/role.js"></script>
</body>
</html>
