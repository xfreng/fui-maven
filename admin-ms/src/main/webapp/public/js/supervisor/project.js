fui.parse();

var projectManagerGrid = fui.get("projectManagerGrid");

$(function () {
    doQuery();
});

/**
 * 查询
 */
function doQuery() {
    projectManagerGrid.load();
}

function save() {
    var rows = projectManagerGrid.getSelecteds();
    if (rows.length == 0) {
        fui.alert("请选择要修改的数据", "提示信息");
        return;
    }
    $.ajax({
        url: fui.contextPath + "/supervisor/project/save",
        type: 'post',
        data: {data: fui.encode(rows)},
        cache: false,
        success: function (text) {
            text = fui.decode(text);
            fui.alert(text.message, "提示信息");
            doQuery();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            fui.alert(jqXHR.responseText);
        }
    });
}