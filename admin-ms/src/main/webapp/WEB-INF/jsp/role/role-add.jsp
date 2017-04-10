<%@page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<%@include file="/WEB-INF/jsp/include/iplat-common.jsp"%>
	<%@include file="/WEB-INF/jsp/include/fui-iplat-common.jsp"%>
	<title>添加角色</title>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
</head>
<body>
	<div id="form1" style="margin-top:0px;">
		<table style="width:100%;" class="fui-form-table">
			<tr>
				<td><label for="rolename$text">角色名称：</td>
				<td>
				  <input id="rolename" class="fui-textbox" name="rolename" required="true" onvalidation="checkRoleCode"/>
				</td>
			</tr>
			<tr class="odd">
				<td><label for="roletype$text">角色类型：</label></td>
				<td>
				  <input id="roletype" class="fui-dictcombobox" valueField="dictID" textField="dictName" emptyText="---请选择---"
		                 dictTypeId="ROLETYPE" name="roletype" showNullItem="true" nullItemText="---请选择---" required="true"/>
				</td>
			</tr>
			<tr class="odd">
				<td><label for="roledesc$text">角色描述：</label></td>
				<td>
				  <input id="roledesc" class="fui-textarea" name="roledesc" style="width:241px;"/>
				</td>
			</tr>
			<tr class="odd">
				<td colspan="2" align="center">
				 		<a class="fui-button" iconCls="icon-save" onclick="formSaving">保存</a>
						<span style="display:inline-block;width:25px;"></span>
						<a class="fui-button" iconCls="icon-cancel" onclick="formCancel">返回</a>
				</td>
			</tr>
		</table>
	</div>
</body>
</html>
<script type="text/javascript">
	fui.parse();
	var form1 = new fui.Form("#form1");

	function checkRoleExist(roleCode){
		var sendData = {roleCode:roleCode};
		var isExist;
		$.ajax({
			url: "roleManagerServlet?method=checkRoleExist",
			type: 'POST',
			data: sendData,
			async: false,
			success: function(text){
				var returnJson = fui.decode(text);
				if(returnJson.isRoleExist == "true"){
					isExist = true;
				}else{
					isExist = false;
				}
			},
			error: function(jqXHR, textStatus, errorThrown){}
		});
		return isExist;
	}

	function CloseWindow(action){
		if(action=="close" && form1.isChanged()){
			if(confirm("数据已改变,是否先保存?")){
				return false;
			}
		}else if(window.CloseOwnerWindow){
			return window.CloseOwnerWindow(action);
		}else{
			return window.close();
		}
	}

	function checkRoleCode(e){
		if(e.isValid){
			if(checkRoleExist(e.value) == true){
				e.errorText = "角色已存在";
				e.isValid = false;
			}
		}
	}

	function formSaving(){
		form1.validate();
		if(form1.isValid()==false) return;
		var form1Data = form1.getData(false,true);
		var sendData = fui.encode(form1Data);
		$.ajax({
			url:"roleManagerServlet?method=addRole",
			type:'POST',
			data:{submitData:sendData},
			success:function(text){
				var returnJson = fui.decode(text);
				if(returnJson.exception){
					CloseWindow("saveSuccess");
				} else {
					fui.alert("添加角色失败！", "系统提示", function(action){
						if(action == "ok" || action == "close"){
							CloseWindow("saveFailed");
						}
					});
				}
			}
		});
	}

	function formCancel(){
		CloseWindow("cancel");
	}
</script>
