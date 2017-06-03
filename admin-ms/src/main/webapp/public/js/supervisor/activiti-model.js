var types = [{id: "6", text: "一般工作流"}];
fui.parse();
var model = fui.get("model");
var modelForm = new fui.Form("modelForm");
var createModelTemplateWindow = fui.get("createModelTemplate");

$(function () {
    autoLayoutSize('layout');
    query();
});

/**
 * 按条件查询
 */
function query() {
    var form = new fui.Form("queryForm");
    var data = form.getData(true, false);
    model.load(data);
}
/**
 * 创建模型
 */
function create() {
    modelForm.clear();
    fui.get("category").setValue("6");
    createModelTemplateWindow.show();
}
/**
 * 复制模型
 */
function copy() {
    var modelIdArgs = getSelections();
    if (modelIdArgs.length == 0) {
        alert('请先选择数据！');
    } else {
        var json = {"modelIdArgs": modelIdArgs.join(',')};
        $.ajax({
            url: fui.contextPath + "/supervisor/workflow/model/copyModel",
            type: "post",
            data: json,
            success: function (text) {
                text = fui.encode(text);
                alert(text.message);
                model.reload();
            }
        });
    }
}
/**
 * 保存为模板
 */
function template() {
    var modelIdArgs = getSelections();
    if (modelIdArgs.length == 0) {
        alert('请先选择数据！');
    } else {
        var json = {"modelIdArgs": modelIdArgs.join(',')};
        $.ajax({
            url: fui.contextPath + "/supervisor/workflow/model/copyModel2Template",
            type: "post",
            data: json,
            success: function (text) {
                text = fui.encode(text);
                alert(text.message);
                model.reload();
            }
        });
    }
}
/**
 * 删除模型
 */
function remove() {
    var modelIdArgs = getSelections();
    if (modelIdArgs.length == 0) {
        alert('请先选择数据！');
        return;
    }
    fui.confirm("确定删除此模型及其所有子模型吗？", "提示信息", function (action) {
        if (action == "ok") {
            model.loading("正在删除中...");
            var json = {"modelIdArgs": modelIdArgs.join(",")};
            $.ajax({
                url: fui.contextPath + "/supervisor/workflow/model/deleteModel",
                type: "post",
                data: json,
                success: function (text) {
                    alert(text.message);
                    model.reload();
                    model.clearSelect(true);
                }
            });
        }
    });
}
/**
 * 编辑流程模型
 */
function edit() {
    var modelIdArgs = getSelections();
    if (modelIdArgs.length == 0) {
        alert('请先选择数据！');
    } else {
        for (var index = 0; index < modelIdArgs.length; index++) {
            var modelId = modelIdArgs[index];
            window.open(fui.contextPath + '/supervisor/designer/tree-modeler?modelId=' + modelId);
        }
    }
}
/**
 * 部署选择的流程
 */
function deploy() {
    var modelIdArgs = getSelections();
    if (modelIdArgs.length == 0) {
        alert('请先选择数据！');
    } else if (modelIdArgs.length > 1) {
        alert('请选择一条数据！');
    } else {
        fui.confirm("确定部署此模型及其所有子模型吗？", "提示信息", function (action) {
            if (action == "ok") {
                model.loading("正在部署中...");
                $.ajax({
                    url: fui.contextPath + "/supervisor/workflow/model/deploy/" + modelIdArgs[0],
                    type: "post",
                    success: function (text) {
                        alert(text.message);
                        model.reload();
                        model.clearSelect(true);
                    }
                });
            }
        });
    }
}
/**
 * 导出模型
 */
function exportModel() {
    var modelIdArgs = getSelections();
    if (modelIdArgs.length == 0) {
        alert('请先选择数据！');
    } else if (modelIdArgs.length > 1) {
        alert('请选择一条数据！');
    } else {
        model.loading("正在导出中...");
        window.open(fui.contextPath + "/supervisor/workflow/model/export/" + modelIdArgs[0] + "/bpmn");
        model.reload();
        model.clearSelect(true);
    }
}
/**
 * 确认添加模型
 */
function ok() {
    var name = fui.get("name").getValue();
    var key = fui.get("key").getValue();
    var category = fui.get("category").getValue();
    if (!name) {
        alert("请填写名称！");
        fui.get("name").focus();
        return;
    }
    if (!key) {
        alert("请填写KEY！");
        fui.get("key").focus();
        return;
    } else {
        if (!checkModelKey(key)) {
            alert("输入的key值[" + key + "]已经存在，请重新输入！");
            fui.get("key").focus();
            return;
        }
    }
    if (!category) {
        alert("请选择流程类型！");
        fui.get("category").focus();
        return;
    }
    var data = modelForm.getData();      //获取表单多个控件的数据
    $.ajax({
        url: fui.contextPath + "/supervisor/workflow/model/create",
        type: "post",
        data: data,
        success: function (text) {
            var url = text.url;
            if (url) {
                fui.confirm("是否跳转到流程编辑器", "提示信息", function (action) {
                    if (action == "ok") {
                        window.open(fui.contextPath + url);
                    }
                });
            }
            model.reload();
            createModelTemplateWindow.hide();
        }
    });
}
/**
 * 检测模型key是否存在
 * @param key
 * @returns {boolean}
 */
function checkModelKey(key) {
    var bool = true;
    $.ajax({
        url: fui.contextPath + "/supervisor/checkModelKey",
        data: {"key": key},
        type: "POST",
        dataType: "json",
        async: false,
        success: function (data) {
            var state = data.state;
            if (state == 1) {
                bool = false;
            }
        },
        error: function () {
        }
    });
    return bool;
}
/**
 * 获取模型列表选择行的模型id
 * @returns {Array}
 */
function getSelections() {
    var modelIdArgs = [];
    var rows = model.getSelecteds();
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        modelIdArgs.push(row.id);
    }
    return modelIdArgs;
}