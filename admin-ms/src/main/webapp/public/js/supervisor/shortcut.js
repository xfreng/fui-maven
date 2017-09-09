fui.parse();
var grid = fui.get("grid1");
grid.load();

$(function () {
    autoLayoutSize('layout', 10);
});

function search() {
    grid.reload();
}

function checkNum(e) {
    var temp = e.value;
    temp = temp.replace(/\D/g, "");
    var control = grid.getCellEditor(1, 1);
    fui.get(control.id).setValue(temp);
}

function add() {
    var newRow = {name: "New Row"};
    grid.addRow(newRow, 0);
}

function remove() {
    var rows = grid.getSelecteds();
    if (rows.length > 0) {
        fui.confirm("确定要删除选中的收藏吗?", "提示信息", function (action) {
            if (action == "ok") {
                var ids = "";
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    var id = row.id;
                    ids += id + ",";
                }
                ids = ids.substring(0, ids.lastIndexOf(","));
                fui.ajax({
                    url: fui.contextPath + "/supervisor/menu/deleteShortcut",
                    type: 'POST',
                    data: {ids: ids},
                    success: function (text) {
                        text = fui.decode(text);
                        if (text.message) {
                            fui.alert(text.message, "提示信息", function callback(action) {
                                if (action == "ok") {
                                    grid.reload();
                                }
                            });
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        fui.alert(jqXHR.responseText, "提示信息");
                    }
                });
            }
        });
    } else {
        fui.alert("请选择一条记录！", "提示信息");
    }

}

function onCellBeginEdit(e) {
    var editor = grid.getCellEditor(e.column, e.record);
    if (editor) {
        if (e.field == 'funcName' && e.record.name != 'New Row') {
            editor.disable();
        } else {
            editor.enable();
        }
    }
}

function onButtonEdit() {
    var btnEdit = this;
    fui.open({
        url: fui.contextPath + "/supervisor/menu/tree",
        title: "选择菜单",
        width: 500,
        height: 350,
        allowResize: false,
        ondestroy: function (action) {
            if (action == "ok") {
                var iframe = this.getIFrameEl();
                var data = iframe.contentWindow.getData();
                data = fui.clone(data); //必须
                if (data) {
                    btnEdit.setValue(data.text);
                    btnEdit.setText(data.text);
                    grid.updateRow(grid.getSelected(), {
                        "menuId": data.pid + "." + data.id,
                        "funcName": data.text
                    });
                }
            }
        }
    });
}

function save() {
    var data = grid.getChanges();
    var len = data.length;
    if (len == 0) {
        fui.alert("请填写一条信息！", "提示信息");
        return;
    }
    for (var i = 0; i < len; i++) {
        var item = data[i];
        var funcName = item.funcName;
        var orderNo = item.orderNo;
        if (!orderNo || !funcName) {
            fui.alert("请将信息填写完整！", "提示信息");
            return;
        }
    }
    var json = fui.encode(data);
    fui.ajax({
        url: fui.contextPath + "/supervisor/menu/saveShortcut",
        type: 'POST',
        data: {submitData: json},
        success: function (text) {
            text = fui.decode(text);
            fui.alert(text.message, "提示信息", function callback(action) {
                if (action == "ok") {
                    grid.reload();
                }
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            fui.alert(jqXHR.responseText, "提示信息");
        }
    });
}