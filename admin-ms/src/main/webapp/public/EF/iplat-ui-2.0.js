document.write('<link rel="icon"  href="app.ico"  type="image/x-icon"/>');
document.write('<link rel="SHORTCUT ICON"  href="app.ico"  type="image/x-icon"/>');

efImportFile = function(libraryName) {
    document.write('<script type="text/javascript" src="'+libraryName+'"></script>');
}
efImportCSS = function(cssName) {
    document.write('<link href="' + cssName + '" rel="stylesheet" type="text/css"/>');
}

var CONTEXT_PATH;
if ( typeof( CONTEXT_PATH ) == 'undefined' ) 	CONTEXT_PATH=".";

//css引用放在JS前面
efImportCSS(CONTEXT_PATH + "/EF/Themes/base/jquery.ui.all.css");
efImportCSS(CONTEXT_PATH + "/EF/iplat-ui-2.0.css");
efImportCSS(CONTEXT_PATH + "/EF/FeedBack/base.css");

//定义引用文件清单
var _iplat_ui_include_files = new Array(
		"/EF/jQuery/jquery-1.7.2.min.js",
		"/EF/jQuery/jquery.ui.core.js",
		"/EF/jQuery/jquery.ui.widget.js",
		"/EF/jQuery/jquery.ui.mouse.js",
		"/EF/jQuery/jquery.ui.slider.js",
		"/EF/jQuery/jquery.ui.draggable.js",
		"/EF/jQuery/jquery.ui.droppable.js",
		"/EF/jQuery/jquery.ui.position.js",
		"/EF/jQuery/jquery.ui.resizable.js",
		"/EF/jQuery/jquery.ui.button.js",
		"/EF/jQuery/jquery.ui.dialog.js",
		"/EF/jQuery/jquery.ui.datepicker.js",
		"/EF/iplat-ui-control.js"
);

for (_iplat_ui_file in _iplat_ui_include_files) {
	efImportFile(CONTEXT_PATH + _iplat_ui_include_files[_iplat_ui_file]);
}

document.write('<script language="text/javascript">__DEBUG = true;</script>');
