fui.parse();
var queryForm = new fui.Form("queryForm");
var dictTypeGrid = fui.get("dictTypeGrid");
var dictEntryGrid = fui.get("dictEntryGrid");
var tree = fui.get("tree1");

dictTypeGrid.load();

tree.load();

dictEntryGrid.load();

$(function () {
    var layout = fui.get("layout");
    var pageHeadHeight = $("#ef_form_head").outerHeight();
    if (self != top) {
        pageHeadHeight = 0;
    }
    layout.setHeight($(window).height() - pageHeadHeight);
    $(window).resize(function () {
        layout.setHeight($(window).height() - pageHeadHeight);
    });
});

function onCellBeginEdit(e) {
    var editor = dictTypeGrid.getCellEditor(e.column, e.record);
    if (editor) {
        if (e.field == 'dictName' && e.record._state != 'added') {
            editor.disable();
        } else {
            editor.enable();
        }
    }
}

function onSelectionChanged(e) {
    var grid = e.sender;
    var record = grid.getSelected();
    if (record) {
        tree.load({dictTypeId: record.id});
        dictEntryGrid.load({dictTypeId: record.id});
    }
}

function search() {
    var data = queryForm.getData(false, false);      //获取表单多个控件的数据
    dictTypeGrid.load(data);
}

function onKeyEnter(e) {
    search();
}

function addRow() {
    var newRow = {};
    dictTypeGrid.addRow(newRow, -1);
    dictTypeGrid.setSelected(newRow);
}

function addEntryRow() {
    var row = dictTypeGrid.getSelected();
    var newRow = {id: row.id};
    dictEntryGrid.addRow(newRow, -1);
    dictEntryGrid.setSelected(newRow);
}

function removeRow() {
    fui.confirm("确定删除选中行吗？", "提示信息", function callback(action) {
        if (action == "ok") {
            var rows = dictTypeGrid.getSelecteds();
            if (rows.length > 0) {
                dictTypeGrid.removeRows(rows, true);
                saveData();
            }
        }
    });
}

function removeEntryRow() {
    fui.confirm("确定删除选中行吗？", "提示信息", function callback(action) {
        if (action == "ok") {
            var rows = dictEntryGrid.getSelecteds();
            if (rows.length > 0) {
                dictEntryGrid.removeRows(rows, true);
                saveEntryData();
            }
        }
    });
}

function saveData() {
    var data = dictTypeGrid.getChanges();
    var len = data.length;
    if (len == 0) {
        fui.alert("请填写一条信息！");
        return;
    }
    for (var i = 0; i < len; i++) {
        var item = data[i];
        var dictTypeId = item.id;
        var dicttypename = item.dicttypename;
        if (!dictTypeId || !dicttypename) {
            fui.alert("请将信息填写完整！");
            return;
        }
    }
    var json = fui.encode(data);
    dictTypeGrid.loading("保存中，请稍后......");
    fui.ajax({
        url: fui.contextPath + "/supervisor/dict/saveDictType",
        type: 'POST',
        data: {data: json},
        success: function (text) {
            dictTypeGrid.reload();
            tree.reload();
            dictEntryGrid.reload();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            fui.alert(jqXHR.responseText);
        }
    });
}

function saveEntryData() {
    var record = dictTypeGrid.getSelected();
    var data = dictEntryGrid.getChanges();
    var len = data.length;
    if (len == 0) {
        fui.alert("请填写一条信息！");
        return;
    }
    for (var i = 0; i < len; i++) {
        var item = data[i];
        var dictId = item.dictId;
        var dictName = item.dictName;
        if (!dictId || !dictName) {
            fui.alert("请将信息填写完整！");
            return;
        }
    }
    var json = fui.encode(data);
    dictEntryGrid.loading("保存中，请稍后......");
    fui.ajax({
        url: fui.contextPath + "/supervisor/dict/saveDictEntry",
        type: 'POST',
        data: {data: json, dictTypeId: record.dictTypeId},
        success: function (text) {
            tree.reload();
            dictEntryGrid.reload();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            fui.alert(jqXHR.responseText);
        }
    });
}

function reset() {//重置
    queryForm.reset();
}

/**
 *导出数据字典
 */
function exportDict() {
    var frm = document.getElementById("form1");
    frm.submit();
}