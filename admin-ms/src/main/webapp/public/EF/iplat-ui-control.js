efImportFile = function(libraryName) {
    document.write('<script type="text/javascript" src="'+libraryName+'"></script>');
}


var CONTEXT_PATH;
if ( typeof( CONTEXT_PATH ) == 'undefined' )
	CONTEXT_PATH=".";

//定义引用文件清单
var _iplat_ui_include_files = new Array(
		"/EF/jQuery/jquery.ba-resize.min.js",
		"/EF/jQuery/jquery.tab.js",
		"/EF/jQuery/jquery.treeTable.js",
		"/EF/jQuery/jquery.flexbox.js",
		"/EF/jQuery/jquery.colorbox.js",

		"/EF/Common/EIInfo.js",
		"/EF/Common/json_util.js",
		"/EF/Common/iplat.ui.core.js",
		"/EF/Common/iplat.ui.ico.js",
		"/EF/Common/iplat.ui.utils.js",
		"/EF/Common/iplat.ui.domUtils.js",

		"/EF/Form/iplat.ui.form.js",
		
		"/EF/FeedBack/canvas2image.js",
		"/EF/FeedBack/feedback.js",
		"/EF/FeedBack/html2canvas.min.js",

		"/EF/jQuery/iplat.ui.button.js",

		"/EF/Tree/iplat.ui.accordionTree.js",
		"/EF/Tree/iplat.ui.treeModel.js",
		"/EF/Tree/iplat.ui.treeTemplate.js",
		"/EF/Tree/iplat.ui.tree.js",
		"/EF/Tree/iplat.ui.menuTree.js",
		"/EF/Tree/iplat.ui.menu.js",

		"/EF/Common/iplat.ui.debugger.js",

		"/EF/Common/iplat.ui.scrolltop.js"
);
for (_iplat_ui_file in _iplat_ui_include_files) {
	efImportFile(CONTEXT_PATH + _iplat_ui_include_files[_iplat_ui_file]);
}