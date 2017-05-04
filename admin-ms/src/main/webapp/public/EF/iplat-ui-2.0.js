function getRootPath() {
    var pathName = window.document.location.pathname;
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return projectName;
}

efImportFile = function (libraryName) {
    document.write('<script type="text/javascript" src="' + libraryName + '"></script>');
}
efImportCSS = function (cssName) {
    document.write('<link href="' + cssName + '" rel="stylesheet" type="text/css"/>');
}
var CONTEXT_PATH = getRootPath();
if (typeof( CONTEXT_PATH ) == 'undefined') CONTEXT_PATH = ".";

document.write('<link rel="icon"  href="'+CONTEXT_PATH+'/app.ico"  type="image/x-icon"/>');
document.write('<link rel="SHORTCUT ICON"  href="'+CONTEXT_PATH+'/app.ico"  type="image/x-icon"/>');

//css引用放在JS前面
efImportCSS(CONTEXT_PATH + "/public/EF/Themes/base/jquery.ui.all.css");
efImportCSS(CONTEXT_PATH + "/public/EF/iplat-ui-2.0.css");
efImportCSS(CONTEXT_PATH + "/public/EF/FeedBack/base.css");

//定义引用文件清单
var _iplat_ui_include_files = new Array(
    "/public/EF/jQuery/jquery.ui.core.js",
    "/public/EF/jQuery/jquery.ui.widget.js",
    "/public/EF/jQuery/jquery.ui.mouse.js",
    "/public/EF/jQuery/jquery.ui.slider.js",
    "/public/EF/jQuery/jquery.ui.draggable.js",
    "/public/EF/jQuery/jquery.ui.droppable.js",
    "/public/EF/jQuery/jquery.ui.position.js",
    "/public/EF/jQuery/jquery.ui.resizable.js",
    "/public/EF/jQuery/jquery.ui.button.js",
    "/public/EF/jQuery/jquery.ui.dialog.js",
    "/public/EF/jQuery/jquery.ui.datepicker.js",
    "/public/EF/iplat-ui-control.js"
);

for (_iplat_ui_file in _iplat_ui_include_files) {
    efImportFile(CONTEXT_PATH + _iplat_ui_include_files[_iplat_ui_file]);
}

document.write('<script language="text/javascript">__DEBUG = true;</script>');
