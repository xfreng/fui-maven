<%@page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<title>画面管理</title>
	<%@include file="/WEB-INF/views/include/iplat-common.jsp"%>
	<%@include file="/WEB-INF/views/include/fui-iplat-common.jsp"%>
	<style type="text/css">
		body{
	        margin:0;padding:0;border:0;width:100%;height:100%;overflow:hidden;
	    }
	</style>
</head>
<body>
	<jsp:include flush="false" page="/WEB-INF/views/include/iplat.ef.head.jsp">
		<jsp:param value="EDFA00" name="efFormEname"/>
		<jsp:param value="系统画面管理" name="efFormCname"/>
	</jsp:include>
	<div class="fui-panel" title="查询条件" style="width:100%;overflow:hidden;" showCollapseButton="true">
		<form id="queryForm" method="post">
			<table style="width:100%">
				<tr>
					<td align="right" width="5%">
						画面英文名:
					</td>
					<td width="10%">
						<input name="formEname" type="fui-textbox" style="width:155px;"/>
					</td>
					<td align="right" width="5%">
						画面中文名:
					</td>
					<td width="10%">
						<input name="formCname" type="fui-textbox" style="width:155px;"/>
					</td>
					<td align="right" width="5%">
						画面类型：
					</td>
					<td>
						<input class="fui-dictcombobox" valueField="dictid" textField="dictname" emptyText="全部" 
                 			dictTypeId="FORMTYPE" name="formType" showNullItem="true" nullItemText="全部" style="width:155px;"/>
					</td>
				</tr>
				<tr>
					<td align="right" colspan="6">
		        		<a class="fui-button" iconCls="icon-search" onclick="query()">查询</a>
		    		</td>
		    	</tr>
		    </table>
	    </form>
	</div>
	<div class="fui-fit" style="width:100%;height:100%;">
		<div class="fui-panel" title="画面列表" style="width:100%;height:99%;" bodyStyle="overflow:hidden;" showCollapseButton="true">
		    <div class="fui-toolbar" style="padding:2px;border-top:0;border-left:0;border-right:0;text-align:right;">
		        <a class="fui-button" iconCls="icon-addnew" onclick="create()">创建</a>
		    	<span class="separator"></span>             
		    	<a class="fui-button" iconCls="icon-save" onclick="addRow()">另存为副本</a>
		        <a class="fui-button" iconCls="icon-save" onclick="edit()">保存为模板</a>
		        <a class="fui-button" iconCls="icon-remove" onclick="remove()">删除</a>     
		    </div>
			<div id="pageInfo" class="fui-datagrid" style="width:100%;height:92%;" allowResize="true"
		        url="${path }/plist" dataField="pageList" idField="id" multiSelect="true">       	
		        <div property="columns">
					<div type="checkcolumn" ></div>
		            <div field="formEname" width="60" headerAlign="center" allowSort="false">画面英文名
						<input property="editor" class="fui-textbox" style="width:100%;"/>
					</div>
		        </div>
		    </div>
	    </div>
	</div>
</body>
<script type="text/javascript">
	fui.parse();
	var pageInfo = fui.get("pageInfo");
	
	function query() {
        //var key = document.getElementById("key").value;
        //model.load({ key: key });
        pageInfo.load();
    }
</script>
<%--<script type="text/javascript" src="${path}/public/js/supervisor/menu.js?v=<%=System.currentTimeMillis()%>"></script>--%>
</html>