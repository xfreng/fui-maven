<%@page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/views/include/iplat-common.jsp"%>
    <%@include file="/WEB-INF/views/include/fui-iplat-common.jsp"%>
    <title>权限配置</title>
    <style type="text/css">
        #tree .fui-grid-viewport{
            background-color:transparent !important;
        }
        #tree .fui-panel-viewport{
            background-color:transparent !important;
        }
    </style>
</head>
<body>
<jsp:include flush="false" page="/WEB-INF/views/include/iplat.ef.head.jsp">
    <jsp:param value="EDUM03" name="efFormEname"/>
    <jsp:param value="权限配置" name="efFormCname"/>
</jsp:include>
<div id="layout" class="fui-layout" style="width:100%;">
    <div region="west" title="权限配置菜单" showHeader="false" style="cursor:hand;" bodyStyle="padding-left:0px;" showSplitIcon="true" width="230" maxWidth="530">
        <ul id="leftTree" class="fui-tree" url="${path }/supervisor/right/selectByKey" style="width:100%;margin-top:5px;"
            showTreeIcon="true" textField="text" onbeforeload="onBeforeTreeLoad" dataField="rightNodes"
            idField="id" parentField="parentId" resultAsTree="false" onnodeclick="onNodeClick">
        </ul>
    </div>
    <div showHeader="false" region="center" bodyStyle="overflow:hidden;" style="border:0;">
        <div class="fui-panel" title="查询条件" bodyStyle="overflow:hidden;" style="padding: 10px;width: 100%;height: 85px;">
            <form id="queryForm">
                <label style="margin-left:20px;" for="rightName">权限名称：</label>
                <input class="fui-textbox" id="rightName" name="text" prompt="支持模糊查询"/>
                <a class="fui-button" iconCls="icon-search" onclick="doQuery()">查询</a>
            </form>
        </div>
        <div class="fui-panel" showHeader="false" bodyStyle="overflow:hidden;" style="padding: 10px;width: 100%;height: 90%;">
            <div class="fui-toolbar" style="border-top:0;border-left:0;border-right:0;">
                <a class="fui-button" iconCls="icon-add" onclick="doAdd_update('A')">新增</a>
                <a class="fui-button" iconCls="icon-edit" onclick="doAdd_update('U')">修改</a>
                <a class="fui-button" iconCls="icon-download" onclick="doExport()">导出sql</a>
            </div>
            <div id="rightManagerGrid" class="fui-datagrid" style="width:100%;height: 96%;" multiSelect="true"
                 url="${path }/supervisor/right/list" idField="id" pageSize="20"
                 dataField="rightList" showFilterRow="false" allowCellSelect="true"
                 allowCellEdit="true">
                <div property="columns">
                    <div type="checkcolumn" ></div>
                    <div field="id" width="100" headerAlign="center" align="center">权限ID</div>
                    <div field="parentId" width="100" headerAlign="center" align="center">上级权限ID</div>
                    <div field="code" width="100" headerAlign="center" align="center">权限编码</div>
                    <div field="text" width="130" headerAlign="center" align="center">权限名称</div>
                    <div field="url" width="150" headerAlign="center" align="center">权限配置URL</div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
<script type="text/javascript" src="${path}/public/js/supervisor/right.js"></script>
</html>