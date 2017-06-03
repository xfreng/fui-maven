fui.parse();

var userManagerGrid = fui.get("userManagerGrid");

$(function () {
    autoLayoutSize('layout');
    doQuery();
});

/**
 * 查询
 */
function doQuery() {
    var form = new fui.Form("queryForm");
    var data = form.getData(true, false);
    userManagerGrid.load(data);
}

/**
 * 弹出新增/修改用户面板
 */
function doAdd_update(flag) {
    var title = flag == 'A' ? '新增用户' : '修改用户';
    var row = userManagerGrid.getSelected();
    if (flag == 'U' && row == null) {
        fui.alert("请先选中需要修改的用户", "提示");
        return;
    }
    fui.open({
        url: fui.contextPath + "/supervisor/user/state",
        showMaxButton: true,
        title: title,
        width: 510,
        height: 215,
        onload: function () {
            if (row != null && row.id != undefined) {
                var iframe = this.getIFrameEl();
                iframe.contentWindow.setData({id: row.id});
            }
        },
        ondestroy: function (action) {
            if (action == "ok") {
                userManagerGrid.reload();
            }
        }
    });
}

/**
 * 角色查看
 * @param e
 * @returns {string}
 */
function roleRender(e) {
    var userId = e.record.id;
    return "<a href='javascript:void(0)'>查看</a>";
}

/**
 * 操作列渲染
 * @param e
 * @returns {string}
 */
function operateRender(e) {
    return "<a href='javascript:void(0)'>重置密码</a>&nbsp;<a href='javascript:void(0)'>禁用</a>";
}