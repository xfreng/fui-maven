fui.parse();

var roleManagerGrid = fui.get("roleManagerGrid");

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
    roleManagerGrid.load(data);
}

/**
 * 弹出新增/修改角色面板
 */
function doAdd_update(flag) {
    var title = flag == 'A' ? '新增角色' : '修改角色';
    var row = roleManagerGrid.getSelected();
    if (flag == 'U' && row == null) {
        fui.alert("请先选中需要修改的角色", "提示");
        return;
    }
    fui.open({
        url: fui.contextPath + "/supervisor/role/state",
        showMaxButton: true,
        title: title,
        width: 510,
        height: 215,
        onload: function () {
            if(row != null && row.id != undefined){
                var iframe = this.getIFrameEl();
                iframe.contentWindow.setData({id: row.id});
            }
        },
        ondestroy: function (action) {
            if (action == "ok") {
                roleManagerGrid.reload();
            }
        }
    });
}

/**
 * 角色详情列渲染
 * @param e
 * @returns {string}
 */
function operateRender(e) {
    return "<a href='javascript:void(0)'>查看</a>";
}