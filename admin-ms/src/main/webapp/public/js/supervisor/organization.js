fui.parse();

var userManagerGrid = fui.get("userManagerGrid");
var leftTree = fui.get("leftTree");
var currentNode = null; // 当前点击权限树节点
$(function () {
    autoLayoutSize('layout');
    expandRootNode();
    doQuery();
});

/**
 * 页面加载展开根目录
 */
function expandRootNode() {
    var rootNode = leftTree.getRootNode();
    if (rootNode) {
        var treeChildNodes = leftTree.getChildNodes(rootNode);
        if (treeChildNodes.length > 0) {
            leftTree.setValue(treeChildNodes[0].id);
        }
    }
    var node = leftTree.getSelectedNode();
    if (node) {
        currentNode = node;
        refreshNode(node);
    }
}

function onNodeClick(e) {
    currentNode = e.node;
    loadGridData();
}

this.getCurrentNode = function () {
    return currentNode;
}

this.getSelectedNode = function () {
    return leftTree.getSelectedNode();
}

this.getParentNode = function (node) {
    node = node || getCurrentNode();
    return leftTree.getParentNode(node);
}

this.refreshNode = function (node) {
    leftTree.loadNode(node);
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

/**
 * 树加载前
 * @param e
 */
function onBeforeTreeLoad(e) {
    var node = e.node;
    if (!node.id) {
        e.params.id = -1;
    }
}

/**
 * 加载机构人员
 */
function loadGridData() {
    var form = new fui.Form("queryForm");
    var data = form.getData(true, false);
    if (currentNode != null) {
        data.orgId = currentNode.id;
    } else {
        data.orgId = -1;
    }
    userManagerGrid.load(data);
}

/**
 * 查询
 */
function doQuery() {
    loadGridData();
}