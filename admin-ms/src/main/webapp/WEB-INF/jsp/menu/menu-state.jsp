<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isELIgnored="false"%>
<!DOCTYPE html>
<html>
<head>
	<%@include file="/WEB-INF/jsp/include/fui-common.jsp"%>
	   <title>菜单面板</title>
	   <style type="text/css">
	    html, body{
	        font-size:12px;
	        padding:0;
	        margin:0;
	        border:0;
	        height:100%;
	        overflow:hidden;
	    }
	   </style>
</head>
<body>    
<form id="menustate" method="post">
    <fieldset style="border:solid 1px #aaa;">
        <legend >菜单信息</legend>
        <div style="padding:5px;">
	        <table>
	            <tr>
	                <td width="15%" align="right">菜单编号</td>
	                <td width="20%">    
	                    <input id="id" name="id" class="fui-textbox" required="true"/>
	                </td>
	                <td width="25%" align="right">菜单名称：</td>
	                <td >                        
	                    <input name="text" class="fui-textbox" required="true"/>
	                </td>
	            </tr>
	            <tr>
	                <td align="right">父节点：</td>
	                <td>    
	                    <input id="pid" name="pid" class="fui-textbox" required="true" allowInput="false"/>
	                </td>
	                <td align="right">菜单URL：</td>
	                <td>    
	                    <input name="url" class="fui-textbox" required="false"/>
	                </td>
	            </tr>
	            <tr>
	                <td align="right">排序标识：</td>
	                <td>    
	                    <input name="sortId" class="fui-textbox" required="false"/>
	                </td>
	                <td align="right">自定义图标样式：</td>
	                <td>    
	                    <input name="image" class="fui-textbox" required="false"/>
	                </td>
	            </tr>
	            <tr>
	                <td width="15%" align="right">菜单类型：</td>
	                <td colspan="3">    
	                    <input name="type" class="fui-combobox" textField="text" valueField="id" emptyText="请选择..."
	                    	   data="[{ id: 1, text: '叶子节点' }, { id: 0, text: '树节点'}]"
    						   required="true" allowInput="true" showNullItem="true" nullItemText="请选择..."/>
	                </td>
	            </tr>         
	        </table>            
        </div>
    </fieldset>
    <div id="saveDiv" style="text-align:center;padding:10px;">               
        <a class="fui-button" onclick="onOk" style="width:60px;margin-right:20px;">确定</a>       
        <a class="fui-button" onclick="onCancel" style="width:60px;">取消</a>       
    </div>        
    <div id="updateDiv" style="text-align:center;padding:10px;display:none;">               
        <a class="fui-button" onclick="onUpdate" style="width:60px;margin-right:20px;">确定</a>       
        <a class="fui-button" onclick="onCancel" style="width:60px;">取消</a>       
    </div>        
</form>
</body>
<script type="text/javascript">
    fui.parse();

    var form = new fui.Form("menustate");

    function saveMenu() {
        var o = form.getData();            
        form.validate();
        if (form.isValid() == false) return;
        var json = fui.encode(o);
        alert(fui.encode(json));
        $.ajax({
            url: fui.contextPath + "/saveMenu",
			type: 'post',
            data: { data: json },
            cache: false,
            success: function (text) {
                CloseWindow("ok");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText);
                CloseWindow();
            }
        });
    }
    function updateMenu() {
        var o = form.getData();            
        form.validate();
        if (form.isValid() == false) return;
        var json = fui.encode(o);
        $.ajax({
            url: fui.contextPath + "/updateMenu",
		type: 'post',
            data: { data: json },
            cache: false,
            success: function (text) {
                CloseWindow("ok");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText);
                CloseWindow();
            }
        });
    }
    //标准方法接口定义
    function setData(data) {
        data = fui.clone(data);
        var action = data.action;
       	form.setData(data);
        if (action == "edit") {
        	$("#saveDiv").hide();
        	$("#updateDiv").show();
        	fui.get("id").setAllowInput(false);
            form.setChanged(false);
        }else{
        	$("#saveDiv").show();
        	$("#updateDiv").hide();
        	fui.get("id").setAllowInput(true);
        }
    }
    function CloseWindow(action) { 
        if (action == "close" && form.isChanged()) {
            if (confirm("数据被修改了，是否先保存？")) {
                return false;
            }
        }
        if (window.CloseOwnerWindow) return window.CloseOwnerWindow(action);
        else window.close();            
    }
    function onOk(e) {
    	saveMenu();
    }
    function onUpdate(e) {
    	updateMenu();
    }
    function onCancel(e) {
        CloseWindow("cancel");
    }
</script>
</html>
