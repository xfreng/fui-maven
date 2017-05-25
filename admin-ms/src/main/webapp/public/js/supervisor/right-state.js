fui.parse();

var url = fui.contextPath + "/supervisor/right/add";
var form = new fui.Form("right-state");

function doSaveRight() {
    var data = form.getData();
    form.validate();
    if (form.isValid() == false) return;
    $.ajax({
        url: url,
        type: 'post',
        data: data,
        cache: false,
        success: function (text) {
            text = fui.decode(text);
            if (text.message != null && text.message != undefined) {
                alert(text.message);
                return;
            }
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
        fui.get("id").setAllowInput(false);
        form.setChanged(false);
        url = fui.contextPath + "/supervisor/right/update";
    } else {
        fui.get("id").setAllowInput(true);
    }
}

function onOk(e) {
    doSaveRight();
}

function onCancel(e) {
    CloseWindow("cancel");
}