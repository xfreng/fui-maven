$(function () {
    doQuery();
});

function doQuery() {
    var rolesTable = $("#rolesTable");
    var params = $("#queryForm").serializeObject();
    var url = getHost() + "/supervisor/roles/list";
    rolesTable.datagrid({
        url: url,
        queryParams: params
    });
}

function doAdd() {
    $('#dialog').dialog('open').dialog('center').dialog('setTitle', '新增角色');
    $('#optionForm').form('clear');
    allPerm();
    url = getHost() + "/supervisor/roles/addRole";
}

function doUpdate() {
    var row = $('#rolesTable').datagrid('getSelected');
    if (row) {
        $('#dialog').dialog('open').dialog('center').dialog('setTitle', '修改角色');
        $('#optionForm').form('load', row);
        queryAllPermAndChecked(row.id);
        url = getHost() + "/supervisor/roles/updateRole";
    } else {
        $.messager.alert("提示", "请先选中需要修改的角色");
    }
}

function saveRole() {
    $('#optionForm').form('submit', {
        url: url,
        onSubmit: function (param) {
            param.permissions = getCheckedPermissions();
            return $(this).form('validate');
        },
        success: function (result) {
            var result = eval('(' + result + ')');
            if (result.code == "success") {
                $.messager.show({
                    title: '提示',
                    msg: "成功"
                });
                $('#dialog').dialog('close');
                doQuery();
            } else {
                $.messager.show({
                    title: '提示',
                    msg: "失败"
                });
            }
        }
    });
}

function cancelOption() {
    $('#dialog').dialog('close')
}

function permissionsRender(value, row, index) {
    return "<a href='#' style='text-decoration: none;' onclick='queryPermissions(" + row.id + ")'>查看</a>";
}

function queryPermissions(roleId) {
    $("#showPermissionsTree").tree({
        url: getHost() + '/supervisor/roles/showPermissions?roleId=' + roleId,
        animate: true
    });
    $("#permissionsDialog").dialog("open").dialog('center');
}

/**
 * 查询所有的权限信息
 */
function allPerm() {
    $("#permTree").tree({
        url: getHost() + "/supervisor/permissions/all",
        checkbox: true,
        animate: true
    })
}

/**
 * 获取选中的权限节点
 * @returns {string} 选中的权限
 */
function getCheckedPermissions() {
    var nodes = $('#permTree').tree('getChecked', ['checked', 'indeterminate']);
    var s = '';
    for (var i = 0; i < nodes.length; i++) {
        if (s != '') {
            s += ',';
        }
        s += nodes[i].id;
    }
    return s;
}

/**
 * 查找所有权限并选中当前角色拥有的权限
 * @param roleId 角色id
 */
function queryAllPermAndChecked(roleId) {
    $("#permTree").tree({
        url: getHost() + '/supervisor/roles/queryAllPermAndChecked?roleId=' + roleId,
        checkbox: true,
        animate: true
    });
}