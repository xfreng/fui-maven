<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh_CN">
<head>
	<%@ include file="/bpm/easyui/easyui-common.jsp"%>
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
<div id="layout" class="easyui-layout" style="width:100%;">
	<div region="north" title="查询条件" style="width:100%;height:95px;overflow:hidden;">
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
						<input name="flowName" type="text" value="${flow.flowName }"/>
					</td>
					<td align="right" width="5%">
						KEY:
					</td>
					<td width="10%">
						<input name="flowKey" type="text" value="${flow.flowKey }"/>
					</td>
					<td align="right" width="8%">
						流程类型：
					</td>
					<td>
						<select name="flowCategory" style="width:153px;">
							<option value="" label="--请选择类型--" />
							<option value="1" label="处方（流程）" ${flow.flowCategory == "1" ?" selected":"" }/>
							<option value="2" label="处方过程（子流程）" ${flow.flowCategory == "2" ?" selected":"" } />
							<option value="3" label="处方工序（子流程）" ${flow.flowCategory == "3" ?" selected":"" } />
							<option value="4" label="处方操作（子流程）" ${flow.flowCategory == "4" ?" selected":"" } />
							<option value="5" label="处方步骤（活动）" ${flow.flowCategory == "5" ?" selected":"" } />
							<option value="6" label="一般工作流" ${flow.flowCategory == "6" ?" selected":"" } />
							<option value="M1" label="处方模板" ${flow.flowCategory == "M1" ?" selected":"" } />
							<option value="M2" label="处方过程模板" ${flow.flowCategory == "M2" ?" selected":"" } />
							<option value="M3" label="处方工序模板" ${flow.flowCategory == "M3" ?" selected":"" } />
							<option value="M4" label="处方操作模板" ${flow.flowCategory == "M4" ?" selected":"" } />
							<option value="M5" label="处方步骤模板" ${flow.flowCategory == "M5" ?" selected":"" } />
							<option value="M6" label="一般工作流模板" ${flow.flowCategory == "M6" ?" selected":"" } />
						</select>
					</td>
				</tr>
				<tr>
					<td align="right" colspan="6">
						<div id="message" class="info" style="display:inline;"><b>提示：</b>点击xml或者png链接可以查看具体内容！</div>
		        		<a id="query" href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-search'">查询</a>
						<a id="deploy" href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-configure'">部署流程</a>
		    		</td>
		    	</tr>
		    </table>
		</form>
	</div>
	<div region="center" title="流程定义及部署管理" style="width:100%;height:30%;overflow:hidden;">	
		<table class="easyui-datagrid" style="width:100%;height:99%;" data-options="singleSelect:true">
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
						<select id="category" name="category" style="width:153px;">
							<option value="" label="--请选择类型--" />
							<option value="1" label="处方（流程）" />
							<option value="2" label="处方过程（子流程）" />
							<option value="3" label="处方工序（子流程）" />
							<option value="4" label="处方操作（子流程）" />
							<option value="5" label="处方步骤（活动）" />
							<option value="6" label="一般工作流" />
							<option value="M1" label="处方模板" />
							<option value="M2" label="处方过程模板" />
							<option value="M3" label="处方工序模板" />
							<option value="M4" label="处方操作模板" />
							<option value="M5" label="处方步骤模板" />
							<option value="M6" label="一般工作流模板" />
						</select>
						<span class="red-star-normal">*</span>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<input name="file" class="easyui-filebox" style="width: 350px;"/>
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