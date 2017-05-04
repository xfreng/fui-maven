$(function () {
    doQuery();
});

function doQuery() {
    var userManagerTable = $("#userManagerTable");
    var params = $("#queryForm").serializeObject();
    var url = getHost() + "/supervisor/usermanager/list";
    userManagerTable.datagrid({
        url: url,
        queryParams: params
    });
}

function doAdd() {
    $('#dialog').dialog('open').dialog('center').dialog('setTitle', '新增用户');
    $('#optionForm').form('clear');
    $("#rolesCombo").combobox({// 设置选中拥有的权限
        value: ""
    });
    allRoles();
    url = getHost() + "/supervisor/usermanager/addUser";
}

function doUpdate() {
    var row = $('#userManagerTable').datagrid('getSelected');
    if (row.id == 1) {
        $.messager.alert("提示", "超级管理员不允许修改");
        return;
    }
    if (row) {
        $('#dialog').dialog('open').dialog('center').dialog('setTitle', '修改用户');
        $('#optionForm').form('load', row);
        allRoles();
        $("#rolesCombo").combobox({// 设置选中拥有的权限
            value: row.roles
        });
        url = getHost() + "/supervisor/usermanager/updateUser";
    } else {
        $.messager.alert("提示", "请先选中需要修改的用户");
    }
}

// 增加easyui validatebox验证规则
$.extend($.fn.validatebox.defaults.rules, {
    userNameReg: {
        validator: function (value, param) {
            var userreg = /^\w+$/;//验证由数字、26个英文字母或者下划线组成的字符串
            return userreg.test(value);
        },
        message: '登录名只能是数字、字母或者下划线'
    }
});

function saveUser() {
    $('#optionForm').form('submit', {
        url: url,
        onSubmit: function () {
            return $(this).form('validate');
        },
        success: function (result) {
            result = eval('(' + result + ')');
            $.messager.show({
                title: '提示',
                msg: result.desc
            });
            if (result.code == "success") {
                $('#dialog').dialog('close');
                doQuery();
            }
        }
    });
}

function cancelOption() {
    $('#dialog').dialog('close')
}

function optionsRender(value, row, index) {
    var status;
    if (row.isErased) {
        status = "启用";
    } else {
        status = "禁用";
    }
    var showText = "";
    if (row.id == 1) {
        return showText;
    }
    if (resetPerm) {
        showText += "<a href='#' style='text-decoration: none;' onclick='resetPwd(" + index + ")'>重置密码</a> ";
    }
    if (operatePerm) {
        showText += "<a href='#' style='text-decoration: none;' onclick='status(" + index + ")'>" + status + "</a>";
    }
    return showText;
}

/**
 * 重置密码
 * @param rowIndex easyui datagrid行索引
 */
function resetPwd(rowIndex) {
    var row = $("#userManagerTable").datagrid('getRows')[rowIndex];
    var msg = "确定重置<span style='color:red;'>" + row.name + "(" + row.realityName + ")</span>的密码？";
    $.messager.confirm('提示', msg, function (r) {
        if (r) {
            $.ajax({
                url: getHost() + "/supervisor/usermanager/resetPwd",
                type: "POST",
                data: {
                    id: row.id
                },
                dataType: "json",
                success: function (data) {
                    $.messager.show({
                        title: '提示',
                        msg: data.desc
                    });
                }
            });
        }
    });
}

/**
 * 启用/禁用用户
 * @param rowIndex easyui datagrid行索引
 */
function status(rowIndex) {
    var row = $("#userManagerTable").datagrid('getRows')[rowIndex];
    var status;
    if (row.isErased) {
        status = "启用";
    } else {
        status = "禁用";
    }
    var msg = "确定<span style='color:red;'>" + status + "</span>用户<span style='color:red;'>" + row.name + "(" + row.realityName + ")</span>？";
    $.messager.confirm('提示', msg, function (r) {
        if (r) {
            $.ajax({
                url: getHost() + "/supervisor/usermanager/status",
                type: "POST",
                data: {
                    id: row.id,
                    isErased: row.isErased
                },
                dataType: "json",
                success: function (data) {
                    $.messager.show({
                        title: '提示',
                        msg: data.desc
                    });
                    if (data.code == "success") {
                        doQuery();
                    }
                }
            });
        }
    });
}

/**
 * 查询所有的角色信息
 */
function allRoles() {
    $("#rolesCombo").combobox({
        url: getHost() + "/supervisor/roles/allRoles",
        prompt: "选中后，再次点击，可取消选中",
        valueField: 'id',
        textField: 'roleName',
        multiple: true,
        panelHeight: 'auto'
    });
}