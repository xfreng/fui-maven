var currentNode; // 当前点击权限树节点
var url;// 是保存还是更新权限url
function doQuery() {
    var id = '';
    if (currentNode != null) {//当前点击树节点不为空时获取选中节点的id
        id = currentNode.id;
    }
    var rightName = $('#rightName').val();
    $("#settingListTable").datagrid('load', {
        id: id,
        rightName: rightName
    });
}

/**
 * 根据主键id查询对应权限信息
 * @param id
 */
function queryByKey(id) {
    $('#settingListTable').datagrid('load', {
        id: id
    });
}

$('#leftTree').tree({
    onClick: function (node) {
        currentNode = node;
        queryByKey(node.id);
    }
})

// 双击树节点展开/收缩
$('#leftTree').tree({
    onDblClick: function (node) {
        currentNode = node;
        if (node.state == 'closed') {
            $('#leftTree').tree('expand', node.target);
        } else {
            $('#leftTree').tree('collapse', node.target);
        }
    }
})

$('#leftTree').tree({
    onExpand: function (node) {
        currentNode = node;
        queryByKey(node.id);
    }
})

/**
 * 弹出新增权限面板
 */
function doAdd() {
    $('#optionForm').form('clear');//清空原有赋值
    $("#id").textbox('readonly', false);
    $('#dialog').dialog('open').dialog('center').dialog('setTitle', '新增权限');
    if (currentNode != null) {
        $("#parentId").textbox('setValue', currentNode.id);
    }
    url = getHost() + "/supervisor/permissions/addRight";
}

/**
 * 弹出修改权限面板
 */
function doUpdate() {
    var selectRowCount = $('#settingListTable').datagrid('getSelections').length;
    var row = $('#settingListTable').datagrid('getSelected');
    if (row) {
        if (selectRowCount > 1) {
            $.messager.alert("提示", "请先选择一条需要修改的权限");
            return;
        }
        $('#dialog').dialog('open').dialog('center').dialog('setTitle', '修改权限');
        $("#id").textbox('readonly', true);
        $('#optionForm').form('load', row);
        url = getHost() + "/supervisor/permissions/updateRight";
    } else {
        $.messager.alert("提示", "请先选中需要修改的权限");
    }
}


/**
 * 导出选中数据到sql文件
 */
function doExport() {
    var selectRows = $('#settingListTable').datagrid('getSelections');
    if (selectRows.length == 0) {
        $.messager.alert("提示", "请选择要导出的权限");
        return;
    }
    $.ajax({
        type: "POST",  //提交方式
        url: getHost() + "/supervisor/permissions/createSqlFile",//路径
        data: {
            selectRows: JSON.stringify(selectRows)
        },
        success: function (result) {//返回数据根据结果进行相应的处理
            var outputPath = result.outputPath;
            var filePath = result.filePath;
            window.location.href = getHost() + "/supervisor/permissions/exportSqlFile?outputPath=" + outputPath + "&filePath=" + filePath;
        }
    });
}

/**
 * 保存权限信息
 */
function saveRight() {
    $('#optionForm').form('submit', {
        url: url,
        onSubmit: function (param) {
            console.log(param);
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