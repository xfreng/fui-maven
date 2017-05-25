/**
 * 关闭弹出窗口
 * @param action 关闭标记(close,cancel)
 * @param validateForm 表单数据变更验证
 * @returns {*}
 * @constructor
 */
function CloseWindow(action, validateForm) {
    if (action == "close" && validateForm != undefined && validateForm.isChanged()) {
        if (confirm("数据被修改了，是否先保存？")) {
            return false;
        }
    }
    if (window.CloseOwnerWindow) return window.CloseOwnerWindow(action);
    else window.close();
}