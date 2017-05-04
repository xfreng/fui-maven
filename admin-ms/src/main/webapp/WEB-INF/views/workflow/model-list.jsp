<%@page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>流程列表</title>
	<%@ include file="/WEB-INF/views/include/iplat-common.jsp"%>
	<%@ include file="/WEB-INF/views/include/fui-iplat-common.jsp"%>
	<style type="text/css">
		body{
	        margin:0;padding:0;border:0;width:100%;height:100%;overflow:hidden;
	    }
	</style>
    <script type="text/javascript">
	    $(function() {
	    	$("#copy").click(function(){
	    		var modelIdArgs = getSelections();
	    		if(modelIdArgs.length == 0){
	    			alert('请先选择数据！');
	    		}else{
	    			var url = "/workflow/model/copyModel";
	    			var params = {"modelIdArgs":modelIdArgs.join(',')};
	    			ajaxLoad(url,params);
	    		}
	    	});
	    	$("#template").click(function(){
	    		var modelIdArgs = getSelections();
	    		if(modelIdArgs.length == 0){
	    			alert('请先选择数据！');
	    		}else{
	    			var url = "/workflow/model/copyModel2Template";
	    			var params = {"modelIdArgs":modelIdArgs.join(',')};
	    			ajaxLoad(url,params);
	    		}
	    	});
	    	$("#delete").click(function(){
	    		var modelIdArgs = getSelections();
	    		if(modelIdArgs.length == 0){
	    			alert('请先选择数据！');
	    		}else{
	    			if(!confirm("确定删除此模型及其所有子模型吗？")){
	    				return;
	    			}
	    			var url = "/workflow/model/deleteModel";
	    			var params = {"modelIdArgs":modelIdArgs.join(',')};
	    			ajaxLoad(url,params);
	    		}
	    	});
	    });
    </script>
</head>
<body>
	<jsp:include flush="false" page="/WEB-INF/views/include/iplat.ef.head.jsp">
		<jsp:param value="RACT01" name="efFormEname"/>
		<jsp:param value="流程模型管理" name="efFormCname"/>
	</jsp:include>
	<div class="fui-panel" title="查询条件" style="width:100%;overflow:hidden;" showCollapseButton="true">
		<form id="queryForm" method="post">
			<table style="width:100%">
				<tr>
					<td align="right" width="5%">
						流程名称:
					</td>
					<td width="10%">
						<input name="flowName" type="text" value="${flow.flowName }" style="width:155px;"/>
					</td>
					<td align="right" width="5%">
						KEY:
					</td>
					<td width="10%">
						<input name="flowKey" type="text" value="${flow.flowKey }" style="width:155px;"/>
					</td>
					<td align="right" width="8%">
						流程类型：
					</td>
					<td>
						<select name="flowCategory" style="width:159px;">
							<option value="" label="--请选择类型--"></option>
							<option value="1" label="处方（流程）" ${flow.flowCategory == "1" ?" selected":"" }></option>
							<option value="2" label="处方过程（子流程）" ${flow.flowCategory == "2" ?" selected":"" }></option>
							<option value="3" label="处方工序（子流程）" ${flow.flowCategory == "3" ?" selected":"" }></option>
							<option value="4" label="处方操作（子流程）" ${flow.flowCategory == "4" ?" selected":"" }></option>
							<option value="5" label="处方步骤（活动）" ${flow.flowCategory == "5" ?" selected":"" }></option>
							<option value="6" label="一般工作流" ${flow.flowCategory == "6" ?" selected":"" }></option>
							<option value="M1" label="处方模板" ${flow.flowCategory == "M1" ?" selected":"" }></option>
							<option value="M2" label="处方过程模板" ${flow.flowCategory == "M2" ?" selected":"" }></option>
							<option value="M3" label="处方工序模板" ${flow.flowCategory == "M3" ?" selected":"" }></option>
							<option value="M4" label="处方操作模板" ${flow.flowCategory == "M4" ?" selected":"" }></option>
							<option value="M5" label="处方步骤模板" ${flow.flowCategory == "M5" ?" selected":"" }></option>
							<option value="M6" label="一般工作流模板" ${flow.flowCategory == "M6" ?" selected":"" }></option>
						</select>
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
		<div class="fui-panel" title="模型工作区" style="width:100%;height:99%;" bodyStyle="overflow:hidden;" showCollapseButton="true">
		    <div class="fui-toolbar" style="padding:2px;border-top:0;border-left:0;border-right:0;text-align:right;">
		        <a class="fui-button" iconCls="icon-addnew" onclick="create()">创建</a>
		    	<span class="separator"></span>             
		    	<a class="fui-button" iconCls="icon-save" onclick="addRow()">另存为副本</a>
		        <a class="fui-button" iconCls="icon-save" onclick="edit()">保存为模板</a>
		        <a class="fui-button" iconCls="icon-remove" onclick="remove()">删除</a>     
		    </div>
			<div id="model" class="fui-datagrid" style="width:100%;height:92%;" allowResize="true"
		        url="${path }/wmlist" dataField="modelList" idField="id" multiSelect="true">       	
		        <div property="columns">
					<div type="checkcolumn" ></div>
		            <div field="id" width="60" headerAlign="center" allowSort="false">ID</div>
		            <div field="key" width="120" headerAlign="center" allowSort="false" align="left">KEY</div>  
		            <div field="name" width="120" headerAlign="center" allowSort="false" align="center">流程名称</div>     
		            <div field="version" width="60" headerAlign="center" allowSort="false">Version</div>
					<div field="createTime" width="75" headerAlign="center" renderer="formatJsonDate" allowSort="false" align="center">创建时间</div>
					<div field="lastUpdateTime" width="75" headerAlign="center" renderer="formatJsonDate" allowSort="false" align="center">最后更新时间</div>
		            <div field="metaInfo" width="190" headerAlign="center" allowSort="false">元数据</div>
		        </div>
		    </div>
	    </div>
	</div>
	<div id="createModelTemplate" class="fui-window" title="创建模型" style="width:500px;" 
    	showModal="true" allowDrag="true">
        <form id="modelForm" action="${path}/wmcreate" target="_blank" method="post">
			<table>
				<tr>
					<td>名称：</td>
					<td>
						<input id="name" name="name" type="text" style="width:155px;"/>
						<span style="color:red;">*</span>
					</td>
				</tr>
				<tr>
					<td>KEY：</td>
					<td>
						<input id="key" name="key" type="text" style="width:155px;"/>
						<span style="color:red;">*</span>
						<div id="message" class="info" style="display:inline;"><b>提示：</b>部署流程所需要的key(唯一)！</div>
					</td>
				</tr>
				<tr>
					<td>类型：</td>
					<td>
						<select id="category" name="category" style="width:159px;">
							<option value="" label="--请选择类型--"></option>
							<option value="1" label="处方（流程）"></option>
							<option value="2" label="处方过程（子流程）"></option>
							<option value="3" label="处方工序（子流程）"></option>
							<option value="4" label="处方操作（子流程）"></option>
							<option value="5" label="处方步骤（活动）"></option>
							<option value="6" label="一般工作流"></option>
							<option value="M1" label="处方模板"></option>
							<option value="M2" label="处方过程模板"></option>
							<option value="M3" label="处方工序模板"></option>
							<option value="M4" label="处方操作模板"></option>
							<option value="M5" label="处方步骤模板"></option>
							<option value="M6" label="一般工作流模板"></option>
						</select>
						<span style="color:red;">*</span>
					</td>
				</tr>
				<tr>
					<td>描述：</td>
					<td>
						<textarea id="description" name="description" style="width:300px;height:50px;"></textarea>
					</td>
				</tr>
				<tr>
					<td colspan="2" align="right">
						<a class="fui-button" iconCls="icon-ok" onclick="ok()">确定</a>
					</td>
				</tr>
			</table>
        </form>
	</div>
</body>
<script type="text/javascript">
	fui.parse();
	var model = fui.get("model");
	var createModelTemplateWindow = fui.get("createModelTemplate");
	model.load();
	
	function query() {
        //var key = document.getElementById("key").value;
        //model.load({ key: key });
        model.load();
    }
	function create(){
		createModelTemplateWindow.show();
	}
	function ok(){
		if (!$("#name").val()) {
			alert("请填写名称！");
			$("#name").focus();
			return;
		}
		if (!$("#key").val()) {
			alert("请填写KEY！");
			$("#key").focus();
			return;
		}else{
			if(!checkModelKey($("#key").val())){
				alert("输入的key值["+$("#key").val()+"]已经存在，请重新输入！");
				$("#key").focus();
				return;
			}
		}
		if(!$("#category").val()){
			alert("请选择流程类型！");
			$("#category").focus();
			return;
		}
		setTimeout(function() {
            location.reload();
        }, 1000);
		$("#modelForm").submit();
	}
	function formatDate(val,row){
      	return formatterDate(val,19);
	}
	function formatShow(val,row,index){
		val = row.id;
		if (typeof(val) == "undefined") {
        	return "";
       	}
		var html = '<a href="${ctx}/bpm/tree-modeler.jsp?modelId='+val+'" target="_blank">编辑</a>' + "&nbsp;";
		html += '<a href="javascript:void(0)" onclick="operate(\'/workflow/model/deploy/'+val+'\')">部署</a>' + "&nbsp;";
		html += '<a href="${ctx}/workflow/model/export/'+val+'/bpmn" target="_blank">导出</a>' + "&nbsp;";
		//html += '<a href="javascript:void(0)" onclick="operate(\'/workflow/model/delete/'+val+'\',\'\',\'确定要删除此模型吗？\')">删除</a>';
      	return html;
	}
	function checkModelKey(key){
		var bool = true;
		$.ajax({
        	url: fui.contextPath + "/checkModelKey",
        	data: {"key":key},
         	type: "POST",
          	dataType: "json",
          	async: false,
          	success: function(data) {
          		var state = data.state;
          		if(state == 1){
          			bool = false;
          		}
          	},
         	error: function() {
          	}
        });
		return bool;
	}
	
	function getSelections(){
        var modelIdArgs = [];
        var rows = $('#model').datagrid('getSelections');
        for(var i=0; i<rows.length; i++){
            var row = rows[i];
            modelIdArgs.push(row.id);
        }
        return modelIdArgs;
    }
</script>
</html>