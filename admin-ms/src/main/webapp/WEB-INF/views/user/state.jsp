<%@page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/views/include/fui-common.jsp" %>
    <title>用户面板</title>
    <style type="text/css">
        html, body {
            font-size: 12px;
            padding: 0;
            margin: 0;
            border: 0;
            height: 100%;
            overflow: hidden;
        }
    </style>
</head>
<body>
<form id="user-state" method="post">
    <fieldset style="border:solid 1px #aaa;">
        <legend>用户信息</legend>
        <div style="padding:5px;">
            <input type="hidden" name="id">
            <table width="100%">
                <tr>
                    <td>登录名：</td>
                    <td><input name="name" class="fui-textbox" required="true" style="width:100%"/></td>
                </tr>
                <tr>
                    <td>真实姓名：</td>
                    <td><input name="realityName" class="fui-textbox" required="true" style="width:100%"/></td>
                </tr>
                <tr>
                    <td>角色(可多选)：</td>
                    <td>
                        <div id="rolesCombo" class="fui-combobox" style="width:100%;" popupWidth="100%"
                             textField="roleName" valueField="roleCode"
                             multiSelect="true" showClose="true" oncloseclick="onCloseClick">
                            <div property="columns">
                                <div header="角色编码" field="roleCode"></div>
                                <div header="角色名称" field="roleName"></div>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </fieldset>
    <div style="text-align:center;padding:10px;">
        <a class="fui-button" onclick="onOk" style="width:60px;margin-right:20px;">确定</a>
        <a class="fui-button" onclick="onCancel" style="width:60px;">取消</a>
    </div>
</form>
</body>
<script type="text/javascript" src="${path}/public/js/supervisor/user-state.js"></script>
</html>