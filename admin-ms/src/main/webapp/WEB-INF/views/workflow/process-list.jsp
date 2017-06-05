<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html lang="zh_CN">
<head>
	<%@ include file="/WEB-INF/views/include/iplat-common.jsp"%>
	<%@ include file="/WEB-INF/views/include/fui-iplat-common.jsp"%>
	<title>流程定义及部署管理</title>
    <script type="text/javascript">
		$(function() {
			var layout = $("#layout");
			layout.layout("resize",{
				height: ($(window).height() - 25)
			});
			$(window).resize(function(){
				layout.layout("resize",{
					height: ($(window).height() - 25)
				});
			});
			$('#deploy').linkbutton().click(function() {
				$('#deployDialog').dialog({
					modal: true,
					width: 546,
					height: 186
				});
			});
			$("#query").linkbutton().click(function(){
				toPage(1);
			});
		});
    </script>
</head>
<body>
<jsp:include flush="false" page="/WEB-INF/views/include/iplat.ef.head.jsp">
	<jsp:param value="RACT02" name="efFormEname"/>
	<jsp:param value="流程定义及部署管理" name="efFormCname"/>
</jsp:include>
<div id="layout" class="fui-layout" style="width:100%;">
	<div region="north" title="查询条件" borderStyle="overflow:hidden;" style="width:100%;height:95px;">
		<form id="queryForm" method="post">
			<c:if test="${not empty message}">
				<div class="ui-widget">
					<div class="ui-state-highlight ui-corner-all" style="margin-top: 20px; padding: 0 .7em;">
						<p><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>
						<strong>提示：</strong>${message}</p>
					</div>
				</div>
			</c:if>
			<table style="width:100%">
				<tr>
					<td align="right" width="5%">
						流程名称:
					</td>
					<td width="10%">
						<input name="flowName" class="fui-textbox" style="width:155px;"/>
					</td>
					<td align="right" width="5%">
						KEY:
					</td>
					<td width="10%">
						<input name="flowKey" class="fui-textbox" style="width:155px;"/>
					</td>
					<td align="right" width="8%">
						流程类型：
					</td>
					<td>
						<select name="flowCategory" style="width:155px;" data="types"></select>
					</td>
				</tr>
				<tr>
					<td align="right" colspan="6">
						<div id="message" class="info" style="display:inline;"><b>提示：</b>点击xml或者png链接可以查看具体内容！</div>
		        		<a id="query" href="javascript:void(0)" class="fui-button" iconCls="icon-search">查询</a>
						<a id="deploy" href="javascript:void(0)" class="fui-button" iconCls="icon-deploy">部署流程</a>
		    		</td>
		    	</tr>
		    </table>
		</form>
	</div>
	<div region="center" title="流程定义及部署管理" borderStyle="overflow:hidden;" style="width:100%;height:30%;">
		<table class="fui-datagrid" style="width:100%;height:99%;" data-options="singleSelect:true">
			<thead>
				<tr>
					<th data-options="field:'ck',checkbox:true"></th>
					<th data-options="field:'id',width:'10%'">ProcessDefinitionId</th>
					<th data-options="field:'deploymentId',width:'6%'">DeploymentId</th>
					<th data-options="field:'name',width:'13%'">流程名称</th>
					<th data-options="field:'key',width:'8%'">KEY</th>
					<th data-options="field:'version',width:'4%'">Version</th>
					<th data-options="field:'xml',width:'16%'">XML</th>
					<th data-options="field:'image',width:'16%'">图片</th>
					<th data-options="field:'deploymentTime',width:'10%',formatter:formatDate">部署时间</th>
					<th data-options="field:'suspended',width:'7%'">是否挂起</th>
					<th data-options="field:'operate',width:'5%',align:'center'">操作</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${page.result }" var="object">
					<c:set var="process" value="${object[0] }" />
					<c:set var="deployment" value="${object[1] }" />
					<tr>
						<td>&nbsp;</td>
						<td>${process.id }</td>
						<td>${process.deploymentId }</td>
						<td>${process.name }</td>
						<td>${process.key }</td>
						<td>${process.version }</td>
						<td><a target="_blank" href='${ctx }/workflow/resource/read?processDefinitionId=${process.id}&resourceType=xml'>${process.resourceName }</a></td>
						<td><a target="_blank" href='${ctx }/workflow/resource/read?processDefinitionId=${process.id}&resourceType=image'>${process.diagramResourceName }</a></td>
						<td>${deployment.deploymentTime }</td>
						<td>${process.suspended} |
							<c:if test="${process.suspended }">
								<a href="javascript:void(0)" onclick="operate('/workflow/processdefinition/update/active/${process.id}')">激活</a>
							</c:if>
							<c:if test="${!process.suspended }">
								<a href="javascript:void(0)" onclick="operate('/workflow/processdefinition/update/suspend/${process.id}')">挂起</a>
							</c:if>
						</td>
						<td>
							<a href="javascript:void(0)" onclick="operate('/workflow/process/delete?deploymentId=${process.deploymentId}','','确定要删除此版本部署吗？')">删除</a>
						</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
	</div>
	<div region="south" style="width:100%;height:15%;overflow:hidden;">
		<tags:pagination page="${page}" paginationSize="${page.pageSize}" />
	</div>
</div>
<div id="deployDialog" title="部署流程" style="padding:2px 0em 2px;display:none;">
	<fieldset>
		<legend>部署新流程</legend>
		<div style="font-size: 13px;"><b>支持文件格式：</b>zip、bar、bpmn、bpmn20.xml</div>
		<form id="deploy-form" action="${ctx }/workflow/deploy" method="post" enctype="multipart/form-data">
			<table>
				<tr>
					<td>类型：</td>
					<td>
						<select id="category" name="category" style="width:155px;" data="types"></select>
						<span class="red-star-normal">*</span>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<input name="file" class="fui-filebox" style="width: 350px;"/>
						<input type="submit" value="Submit" />
					</td>
				</tr>
			</table>
		</form>
	</fieldset>
</div>
</body>
<script>
	function formatDate(val,row){
		return formatterDate(val,19);
	}
	$("#deploy-form").form({
        success:function(data){
        	data = $.parseJSON(data);
        	var state = data.state;
        	if(state == 1){
        		toPage(1);
        	}else{
        		alert(data.message);	
        	}
        }
    });
</script>
</html>