<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>权限配置</title>
</head>
<body>
<div class="easyui-layout" style="width:100%;min-height:800px;height: auto">
    <div region="west" title="权限配置菜单" style="width:160px;padding:1px;"
         icon="icon-redo" split="true">
        <ul id="leftTree" class="easyui-tree"
            url="${path}/supervisor/permissions/selectByKey">
        </ul>
    </div>
    <div region="center" style="overflow: hidden;">
        <div id="toolbar">
            <form id="queryForm">
                <label style="margin-left:20px;" for="rightName">权限名称：</label>
                <input class="easyui-textbox" id="rightName" name="text" prompt="支持模糊查询"/>
                <a href="javascript:void(0)" class="easyui-linkbutton" id="searchBtn"
                   iconCls="icon-search" onclick="doQuery()">查询</a>
                <a href="javascript:void(0)" class="easyui-linkbutton" id="addBtn"
                   iconCls="icon-add" onclick="doAdd()">新增</a>
                <a href="javascript:void(0)" class="easyui-linkbutton" id="updateBtn"
                   iconCls="icon-edit" onclick="doUpdate()">修改</a>
                <a href="javascript:void(0)" class="easyui-linkbutton" id="exportBtn"
                   iconCls="icon-download" onclick="doExport()">导出sql</a>
            </form>
        </div>
        <table id="settingListTable" class="easyui-datagrid" style="width:100%;height:100%;" toolbar="#toolbar"
               singleSelect="false" checkOnSelect="true" data-options="pagination: true,
               url: '${pageContext.request.contextPath }/supervisor/permissions/selectByKeyPage'">
            <thead>
            <tr>
                <th field="ck" checkbox="true"></th>
                <th field="id" width="10%">权限ID</th>
                <th field="parentId" width="10%">上级权限ID</th>
                <th field="code" width="30%">权限编码</th>
                <th field="text" width="20%">权限名称</th>
                <th field="url" width="30%">权限配置URL</th>
            </tr>
            </thead>
        </table>
    </div>
</div>
<div id="dialog" class="easyui-dialog" style="width: 650px" closed="true" buttons="#dlg-buttons"
     data-options="modal: true, shadow: true">
    <form id="optionForm" method="post" novalidate style="margin:0;padding:20px 50px">
        <table>
            <tr>
                <td>权限ID：</td>
                <td><input class="easyui-textbox" id="id" name="id" required="true"/></td>
                <td>上级权限ID：</td>
                <td><input class="easyui-textbox" id="parentId" name="parentId" readonly="true"/></td>
            </tr>
            <tr>
                <td>权限编码：</td>
                <td><input class="easyui-textbox" id="code" name="code"/></td>
                <td>权限名称：</td>
                <td><input class="easyui-textbox" id="text" name="text"/></td>
            </tr>
            <tr>
                <td>权限配置URL：</td>
                <td colspan="3"><input class="easyui-textbox" id="url" name="url" style="width: 100%;"/></td>
            </tr>
        </table>
    </form>
</div>
<div id="dlg-buttons">
    <a href="javascript:void(0)" class="easyui-linkbutton c6" iconCls="icon-ok"
       onclick="saveRight()" style="width:90px">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelOption()" style="width:90px">取消</a>
</div>
<script type="text/javascript" src="${path}/public/js/supervisor/right.js"></script>
</body>
</html>
