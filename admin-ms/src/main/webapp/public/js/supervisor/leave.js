fui.parse();

var form = new fui.Form("leaveForm");

/**
 * 启动请假流程
 */
function start() {
    var data = form.getData();
    form.validate();
    if (form.isValid() == false) return;
    $.ajax({
        url: fui.contextPath + "/supervisor/oa/leave/start",
        type: 'post',
        data: {submitData: fui.encode(data)},
        cache: false,
        success: function (text) {
            text = fui.decode(text);
            fui.alert(text.message, "提示信息");
            form.clear();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            fui.alert(jqXHR.responseText);
        }
    });
}