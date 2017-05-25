<%@page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/views/include/fui-common.jsp" %>
    <title>角色面板</title>
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
<form id="role-state" method="post">
    <fieldset style="border:solid 1px #aaa;">
        <legend>角色信息</legend>
        <div style="padding:5px;">
            <input type="hidden" name="id">
            <table width="100%">
                <tr>
                    <td>角色编码：</td>
                    <td><input name="roleCode" class="fui-textbox" required="true" style="width:100%"/></td>
                </tr>
                <tr>
                    <td>角色名称：</td>
                    <td><input name="roleName" class="fui-textbox" required="true" style="width:100%"/></td>
                </tr>
                <tr>
                    <td>权限：</td>
                    <td>
                        &nbsp;
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
<script type="text/javascript" src="${path}/public/js/supervisor/role-state.js"></script>
</html>