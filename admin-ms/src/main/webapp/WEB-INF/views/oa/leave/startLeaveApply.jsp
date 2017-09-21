<%@page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<%@include file="/WEB-INF/views/include/iplat-common.jsp"%>
	<%@include file="/WEB-INF/views/include/fui-iplat-common.jsp"%>
	<style type="text/css">
		html, body{
			margin:0;padding:0;border:0;width:100%;height:100%;overflow:hidden;
		}
	</style>
</head>
<body>
<jsp:include flush="false" page="/WEB-INF/views/include/iplat.ef.head.jsp"></jsp:include>
<div class="fui-fit" style="width:100%;height:100%;">
	<div class="fui-panel" showHeader="false" bodyStyle="overflow:hidden;" style="width:100%;">
		<form id="leaveForm" method="post" class="fui-form">
			<fieldset>
				<legend><small>请假申请</small></legend>
				<table width="100%">
					<tr>
						<td width="5%">请假类型：</td>
						<td>
							<select id="leaveType" name="leaveType" class="fui-combobox" style="width:165px;">
								<option>公休</option>
								<option>病假</option>
								<option>调休</option>
								<option>事假</option>
								<option>婚假</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>开始时间：</td>
						<td><input class="fui-datepicker" id="startTime" name="startTime" showTime="true" format="yyyy-MM-dd HH:mm:ss" style="width:165px;"/></td>
					</tr>
					<tr>
						<td>结束时间：</td>
						<td><input class="fui-datepicker" id="endTime" name="endTime" showTime="true" format="yyyy-MM-dd HH:mm:ss" style="width:165px;"/></td>
					</tr>
					<tr>
						<td>请假原因：</td>
						<td>
							<input class="fui-textarea" name="reason" style="width:50%;height:265px;"/>
						</td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td>
							<a class="fui-button" iconCls="icon-ok" onclick="start()">申请</a>
						</td>
					</tr>
				</table>
			</fieldset>
		</form>
	</div>
</div>
</body>
<script type="text/javascript" src="${path}/public/js/supervisor/leave.js?v=<%=System.currentTimeMillis()%>"></script>
</html>