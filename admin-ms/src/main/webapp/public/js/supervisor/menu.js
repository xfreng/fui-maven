var types = [{id: 1, text: "叶子节点"}, {id: 0, text: "树节点"}];
fui.parse();
var tree = fui.get("tree");
var currentNode = null;

$(function () {
    autoLayoutSize('layout', 10);
    expandRootNode();
});

function expandRootNode() {
    tree.setValue(tree.getChildNodes(tree.getRootNode())[0].id);
    var node = tree.getSelectedNode();
    if (node) {
        currentNode = node;
        refreshNode(node);
    }
}

function onBeforeTreeLoad(e) {
    var node = e.node;
    if (!node.id) {
        e.params.id = "$";
    }
}

var menu_add = {title: '新增菜单', url: fui.contextPath + '/supervisor/menu/state'};

var rootMenu = [
    {text: "增加顶级菜单", onclick: "onAddRootMenu", iconCls: "icon-add"},
    {text: "刷新", onclick: "onRefreshNode", iconCls: "icon-reload"}
];

var menu = [
    {text: "增加下级菜单", onclick: "onAddMenuOfMenu", iconCls: "icon-add"},
    {text: "删除本级菜单", onclick: "onRemoveMenu", iconCls: "icon-remove"},
    {text: "刷新", onclick: "onRefreshNode", iconCls: "icon-reload"}
];

var menu_map = {
    Root: rootMenu,
    menu: menu
};

function onNodeClick(e) {
    currentNode = e.node;
    loadGridData(currentNode.id);
}

this.getCurrentNode = function () {
    return currentNode;
}

this.getSelectedNode = function () {
    return tree.getSelectedNode();
}

this.getParentNode = function (node) {
    node = node || getCurrentNode();
    return tree.getParentNode(node);
}

this.refreshNode = function (node) {
    tree.loadNode(node);
}

this.refreshCurrentNode = function () {
    refreshNode(getCurrentNode());
}

this.refreshParentNode = function (node) {
    node = node || getCurrentNode();
    refreshNode(getParentNode(node));
}

function onRefreshNode(e) {
    refreshNode(getSelectedNode());
}

function onBeforeOpen(e) {
    var node = tree.getSelectedNode();
    var menu = e.sender;
    var menuList = {};
    if (node.id && node.id != "root") {
        menuList = menu_map["menu"];
    } else {
        menuList = menu_map["Root"];
    }

    if (!menuList || menuList.length == 0) {
        e.cancel = true;
        return;
    }
    menu.loadList(fui.clone(menuList));
}

function alertTip(message, title, timeout) {
    title = title || "提示";
    timeout = timeout || 500;
    var messageid = fui.loading(message, title);
    setTimeout(function () {
        fui.hideMessageBox(messageid);
    }, timeout);
}

function openDialog(params) {
    var openParams = fui.clone(params);

    openParams.onload || (openParams.onload = function () {
        var iframe = this.getIFrameEl();
        var contentWindow = iframe.contentWindow;

        if (contentWindow.setData) {
            contentWindow.setData(openParams.data);
        }
    });
    openParams.ondestroy || (openParams.ondestroy = function (action) {
        if (action == "ok") {
            grid.reload();
            refreshNode(getSelectedNode());
        }
    });
    fui.open(openParams);
}

function onAddRootMenu(e) {
    var rootNode = tree.getChildNodes(tree.getRootNode())[0];
    openDialog({
        title: "新增顶级菜单",
        url: menu_add.url,
        data: {pid: rootNode.id},
        width: 540,
        height: 255
    });
}

function onAddMenuOfMenu(e) {
    var selectedNode = getSelectedNode();
    openDialog({
        title: "新增下级菜单",
        url: menu_add.url,
        data: {pid: selectedNode.id},
        width: 540,
        height: 255
    });
}

function onRemoveMenu(e) {
    var selectedNode = getSelectedNode();
    fui.confirm("确定删除选中记录？", "提示信息", function (action) {
        if (action == "ok") {
            var json = fui.encode({pid: selectedNode.pid, id: selectedNode.id});
            var messageid = fui.loading("操作中，请稍后......");
            $.ajax({
                url: fui.contextPath + "/supervisor/menu/deleteMenu",
                data: {data: json},
                type: "post",
                success: function (text) {
                    text = fui.decode(text);
                    var count = text.count;
                    if (count && parseInt(count) > 0) {
                        fui.alert("选择的菜单中有子菜单，不可删除！", "提示信息", function (action) {
                            fui.hideMessageBox(messageid);
                        });
                    } else {
                        if (!text.exception) {
                            fui.hideMessageBox(messageid);
                            refreshCurrentNode();
                        }
                    }
                },
                error: function () {
                }
            });
        }
    });
}

var grid = fui.get("grid");
loadGridData("root");

function loadGridData(pid) {
    grid.load({id: pid});
}

function addRow() {
    var newRow = {pid: getSelectedNode().id, type: 1};
    grid.addRow(newRow, -1);
    grid.setSelected(newRow);
}

function add() {
    var len = grid.getSelecteds().length;
    if (len == 0) {
        fui.open({
            url: fui.contextPath + "/supervisor/menu/state",
            showMaxButton: true,
            title: "新增菜单",
            width: 540,
            height: 255,
            onload: function () {
                var iframe = this.getIFrameEl();
                var data = getCurrentNode() || tree.getChildNodes(tree.getRootNode())[0];
                iframe.contentWindow.setData({pid: data.id});
            },
            ondestroy: function (action) {
                if (action == "ok") {
                    grid.reload();
                    refreshCurrentNode();
                }
            }
        });
    } else {
        var data = grid.getSelecteds();
        var json = fui.encode(data);
        grid.loading("保存中，请稍后......");
        $.ajax({
            url: fui.contextPath + "/supervisor/menu/saveMenu",
            data: {data: json},
            type: "post",
            success: function (text) {
                text = fui.decode(text);
                var count = text.count;
                if (count && parseInt(count) > 0) {
                    fui.alert("新增失败，菜单重复！", "提示信息", function (action) {
                        grid.reload();
                    });
                } else {
                    if (!text.exception) {
                        grid.reload();
                        grid.clearSelect(true);
                        refreshCurrentNode();
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText);
            }
        });
    }
}

function edit() {
    var len = grid.getSelecteds().length;
    if (len == 0) {
        fui.alert("请选择一条记录！", "提示信息");
        return;
    } else {
        var data = grid.getSelecteds();
        var json = fui.encode(data);
        grid.loading("修改中，请稍后......");
        $.ajax({
            url: fui.contextPath + "/supervisor/menu/updateMenu",
            data: {data: json},
            type: "post",
            success: function (text) {
                grid.reload();
                grid.clearSelect(true);
                refreshCurrentNode();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText);
            }
        });
    }
}

function toedit(e) {
    var row = grid.getSelected();
    fui.open({
        url: fui.contextPath + "/supervisor/menu/state",
        showMaxButton: true,
        title: "修改菜单",
        width: 540,
        height: 255,
        onload: function () {
            var iframe = this.getIFrameEl();
            var data = row;
            data.action = "edit";
            iframe.contentWindow.setData(data);
        },
        ondestroy: function (action) {
            if (action == "ok") {
                grid.reload();
                refreshCurrentNode();
            }
        }
    });
}

function remove() {
    var rows = grid.getSelecteds();
    if (rows.length > 0) {
        var json = fui.encode(rows);
        fui.confirm("确定删除选中记录？", "提示信息", function (action) {
            if (action == "ok") {
                grid.loading("操作中，请稍后......");
                $.ajax({
                    url: fui.contextPath + "/supervisor/menu/deleteMenu",
                    data: {data: json},
                    type: "post",
                    success: function (text) {
                        text = fui.decode(text);
                        var count = text.count;
                        if (count && parseInt(count) > 0) {
                            fui.alert("选择的菜单中有子菜单，不可删除！", "提示信息", function (action) {
                                grid.reload();
                            });
                        } else {
                            if (!text.exception) {
                                grid.reload();
                                refreshCurrentNode();
                            }
                        }
                    },
                    error: function () {
                    }
                });
            }
        });
    } else {
        fui.alert("请选中一条记录！", "提示信息");
    }
}

function onCellBeginEdit(e) {
    var editor = grid.getCellEditor(e.column, e.record);
    if (editor) {
        if (e.field == "id" && e.record._state != "added") {
            editor.disable();
        } else {
            editor.enable();
        }
    }
}

function exportExcel() {
    window.location.href = fui.contextPath + "/supervisor/menu/export";
}