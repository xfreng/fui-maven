fui.parse();

var projectManagerGrid = fui.get("projectManagerGrid");

$(function () {
    doQuery();
});

/**
 * 查询
 */
function doQuery() {
    projectManagerGrid.load();
}