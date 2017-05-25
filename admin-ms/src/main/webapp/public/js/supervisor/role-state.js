fui.parse();

var form = new fui.Form("role-state");

function doSaveRole() {
    var data = form.getData();
    form.validate();
    if (form.isValid() == false) return;
    $.ajax({
        url: fui.contextPath + "/supervisor/role/add",
        type: 'post',
        data: data,
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

function onOk(e) {
    doSaveRole();
}

function onCancel(e) {
    CloseWindow("cancel");
}