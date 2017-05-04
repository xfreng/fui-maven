<%@page import="activiti.engine.RepositoryService,org.apache.commons.lang.ObjectUtils,activiti.util.ProcessDefinitionCache"%>
<%@page import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh_CN">
<head>
	<%@ include file="/bpm/easyui/easyui-common.jsp"%>
	<title>管理运行中流程</title>
	<%
		RepositoryService repositoryService = WebApplicationContextUtils.getWebApplicationContext(session.getServletContext()).getBean(activiti.engine.RepositoryService.class);
		ProcessDefinitionCache.setRepositoryService(repositoryService);
	%>
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
			$("#query").linkbutton().click(function(){
	    		toPage(1);
	    	});
		});
	</script>
</head>

<body>
<div id="layout" class="easyui-layout" style="width:100%;">
	<div region="north" title="查询条件" style="width:100%;height:95px;overflow:hidden;">
		<c:if test="${not empty message}">
		<div class="ui-widget">
				<div class="ui-state-highlight ui-corner-all" style="margin-top: 20px; padding: 0 .7em;"> 
					<p><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>
					<strong>提示：</strong>${message}</p>
				</div>
			</div>
		</c:if>
		<form id="queryForm" method="post">
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
					<td align="right" colspan="8">
		        		<a id="query" href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-search'">查询</a>
		    		</td>
		    	</tr>
		    </table>
	    </form>
	</div>
	<div region="center" title="运行中的流程" style="width:100%;height:30%;overflow:hidden;">	
		<table class="easyui-datagrid" style="width:100%;height:99%;" data-options="singleSelect:true">
			<thead>
				<tr>
					<th data-options="field:'ck',checkbox:true"></th>
					<th data-options="field:'id',width:'8%'">执行ID</th>
					<th data-options="field:'processInstanceId',width:'18%'">流程实例ID</th>
					<th data-options="field:'processDefinitionId',width:'26%'">流程定义ID</th>
					<th data-options="field:'key',width:'8%'">KEY</th>
					<th data-options="field:'name',width:'12%'">流程名称</th>
					<th data-options="field:'did',width:'9%'">当前节点</th>
					<th data-options="field:'suspended',width:'6%'">是否挂起</th>
					<th data-options="field:'operate',width:'6%',align:'center'">操作</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${page.result }" var="p">
				<c:set var="pdid" value="${p.processDefinitionId }" />
				<c:set var="activityId" value="${p.activityId }" />
				<tr>
					<td>&nbsp;</td>
					<td>${p.id }</td>
					<td>${p.processInstanceId }</td>
					<td>${p.processDefinitionId }</td>
					<td>${p.processDefinitionKey }</td>
					<td>${p.processDefinitionName }</td>
					<td><a class="trace" href='#' pid="${p.id }" pdid="${p.processDefinitionId}" title="点击查看流程图"><%=ProcessDefinitionCache.getActivityName(pageContext.getAttribute("pdid").toString(), ObjectUtils.toString(pageContext.getAttribute("activityId"))) %></a></td>
					<td>${p.suspended }</td>
					<td>
						<c:if test="${p.suspended }">
							<a href="javascript:void(0)" onclick="operate('/workflow/processinstance/update/active/${p.processInstanceId}')">激活</a>
						</c:if>
						<c:if test="${!p.suspended }">
							<a href="javascript:void(0)" onclick="operate('/workflow/processinstance/update/suspend/${p.processInstanceId}')">挂起</a>
						</c:if>
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
</body>
</html>