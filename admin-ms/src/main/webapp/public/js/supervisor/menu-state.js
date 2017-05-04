fui.parse();

var form = new fui.Form("menustate");

function saveMenu() {
    var o = form.getData();
    form.validate();
    if (form.isValid() == false) return;
    var json = fui.encode(o);
    $.ajax({
        url: fui.contextPath + "/supervisor/menu/saveMenu",
        type: 'post',
        data: {data: json},
        cache: false,
        success: function (text) {
            CloseWindow("ok");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
            CloseWindow();
        }
    });
}

function updateMenu() {
    var o = form.getData();
    form.validate();
    if (form.isValid() == false) return;
    var json = fui.encode(o);
    $.ajax({
        url: fui.contextPath + "/supervisor/menu/updateMenu",
        type: 'post',
        data: {data: json},
        cache: false,
        success: function (text) {
            CloseWindow("ok");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
            CloseWindow();
        }
    });
}

//标准方法接口定义
function setData(data) {
    data = fui.clone(data);
    var action = data.action;
    form.setData(data);
    if (action == "edit") {
        $("#saveDiv").hide();
        $("#updateDiv").show();
        fui.get("id").setAllowInput(false);
        form.setChanged(false);
    } else {
        $("#saveDiv").show();
        $("#updateDiv").hide();
        fui.get("id").setAllowInput(true);
    }
}

function CloseWindow(action) {
    if (action == "close" && form.isChanged()) {
        if (confirm("数据被修改了，是否先保存？")) {
            return false;
        }
    }
    if (window.CloseOwnerWindow) return window.CloseOwnerWindow(action);
    else window.close();
}

function onOk(e) {
    saveMenu();
}

function onUpdate(e) {
    updateMenu();
}

function onCancel(e) {
    CloseWindow("cancel");
}