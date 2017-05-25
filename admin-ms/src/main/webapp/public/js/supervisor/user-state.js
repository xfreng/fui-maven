fui.parse();

var form = new fui.Form("user-state");

function doSaveUser() {
    var data = form.getData();
    form.validate();
    if (form.isValid() == false) return;
    $.ajax({
        url: fui.contextPath + "/supervisor/user/add",
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
    doSaveUser();
}

function onCancel(e) {
    CloseWindow("cancel");
}