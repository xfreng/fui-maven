<%@page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<%@include file="/WEB-INF/jsp/include/iplat-common.jsp"%>
	<%@include file="/WEB-INF/jsp/include/fui-iplat-common.jsp"%>
	<title>修改角色</title>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
</head>
<body>
	<div id="form1" style="margin-top:0px;">
		<table style="width:100%;" class="fui-form-table">
			<tr>
				<td><label for="roleid$text">角色代码：</label></td>
				<td><input id="roleid" class="fui-textbox" name="roleid" allowInput="false"/></td>
				<td><label for="rolename$text">角色名称：</label></td>
				<td><input id="rolename" class="fui-textbox" name="rolename" required="true"/></td>
			</tr>
			<tr class="odd">
				<td><label for="roletype$text">角色类型：</label></td>
				<td colspan="3">
				  <input id="roletype" readonly="true" disabled="true" class="fui-dictcombobox" valueField="dictID" textField="dictName" emptyText="全部角色"
		                 dictTypeId="ROLETYPE" name="roletype" showNullItem="true" nullItemText="全部角色"/>
				</td>
			</tr>
			<tr class="odd">
				<td><label for="roledesc$text">角色描述：</label></td>
				<td colspan="3">
				  <input id="roledesc" class="fui-textarea" name="roledesc" style="width:372px;"/>
				</td>
			</tr>
			<tr class="odd">
				<td colspan="4" align="center">
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

	function setData(row){
		data = fui.clone(row);
		var sendData = fui.encode(data);
		var modData = fui.decode(sendData);
		modData.roletype = modData.roletype ;//modData增加roletype对象，并赋值。
		form1.setData(modData);
		form1.setChanged(false);
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

	function formSaving(){
		form1.validate();
		if(form1.isValid()==false) return;

		var form1Data = form1.getData(false,true);
		var sendData = fui.encode(form1Data);
		$.ajax({
			url:"roleManagerServlet?method=updateRole",
			type:'POST',
			data:{submitData:sendData},
			success:function(text){
				var returnJson = fui.decode(text);
				if(returnJson.exception){
					fui.alert("编辑角色成功！", "系统提示", function(action){
						if(action == "ok" || action == "close"){
							CloseWindow("saveSuccess");
						}
					});
				}else{
					fui.alert("编辑角色失败！", "系统提示", function(action){
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
