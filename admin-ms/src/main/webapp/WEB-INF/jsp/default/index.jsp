<%@page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>欢迎使用 制药MES产品研发[运行环境]</title>
	<%@include file="/WEB-INF/jsp/include/iplat-common.jsp"%>
	<%@include file="/WEB-INF/jsp/include/fui-iplat-common.jsp"%>
    <link rel="stylesheet" type="text/css" href="${path }/EU/Font-Awesome/css/font-awesome.css">
	<link rel="stylesheet" type="text/css" href="${path }/EU/Font-Awesome/css/font-awesome.jquery.css">
    <style type="text/css">
	    body{
	        margin:0;padding:0;border:0;width:100%;height:100%;overflow:hidden;
	    }    
	    .header{
	        background:url(${path}/mainframe/images/header.gif) repeat-x 0 -1px;
	    }
    </style>
    <script type="text/javascript">
		var __newForm = true;
		var __clickNode = null;
		var leftMenuModel = new eiTreeModel();
		function configTree(tree){
		    tree.depth(9);
		    tree.emptyNodeAsLeaf = true;
		    tree.activeEmptyJudger = false;
		    tree.nodeInitializer = treeNodeInitializer;
		    tree.hideRoot = true;
		}
		function treeNodeInitializer(node){
		    node.textClicked = function(){ 
		    	activeFormByNode(node); 
		    };
		}
		function activeFormByNode(node) {
			loadMenuUrl(node);
		}
		function activeFormByMenu(node) {
			__clickNode = node;
			loadMenuUrl(node);
		}
		// 新增以下js函数
		loadMenuUrl = function(node) {
			var label = node.label();
			var text = node.text();
			var url = node._data.url;
			if (url && ($.trim(url) != "")) {
				newForm(label,text,url);
				return;
			}
			if (node.leaf()) {
				activeForm(label,text,url);
			}
		}
		function activeForm(label,text,url) {
			if (__newForm == true) {
				newForm(label,text,label);
			} else {
				openForm(label,text,url);
			}
		}
		function newForm(label,text,url) {
			label = (url && $.trim(url) != "") ? url : label;
			window.open(fui.contextPath + "/" + label);
		}
		function openForm(label,text,url) {
			var node = {};
			if(__clickNode != null){
				node.id = __clickNode._data.label;
				node.text = __clickNode._data.text;
			}else{
				node.id = label;
				node.text = text;
			}
			node.url = url;
			showTab(node);
		}
		function changeOpenWindow(){
			__newForm = !__newForm;
		}
	</script>
</head>
<body id="cache" onload="setCurTime('cy','blue');">
<div class="fui-layout" style="width:100%;height:100%;">
    <div region="north" class="header" bodyStyle="overflow:hidden;" showHeader="false" showSplit="false">
        <%@include file="/WEB-INF/jsp/index/top.jsp"%>
    </div>
    <div showHeader="false" region="south" class="foot" height="39px" style="border:1;text-align:center;" showSplit="false">
        <%@include file="/WEB-INF/jsp/index/footer.jsp"%>
    </div>
    <div region="west" showHeader="false" style="cursor: hand;" showHeader="true" bodyStyle="padding-left:0px;" showSplitIcon="true" width="230" maxWidth="530">
        <!--左侧菜单-->
        <div id="menu" class="">
	         <div id="indexRealLeftTreeDiv" class="slim-scroll">
	           <EF:EFTree model="leftMenuModel" id="nTree" text="" configFunc="configTree" type="menuTree"/>
	         </div>
    	</div>
    </div>
    <div showHeader="false" region="center" bodyStyle="overflow:hidden;" style="border:0;">
    	<div id="mainTabs" class="fui-tabs" activeIndex="0" style="width:100%;height:100%;"      
             plain="false" onactivechanged="onTabsActiveChanged" contextMenu="#tabsMenu">
             <div name="first" title="首页" url="${path }/calendar"></div>
         </div>
    </div>
</div>
<ul id="tabsMenu" class="fui-contextmenu" onbeforeopen="onBeforeOpen">        
    <li onclick="closeTab">关闭</li>                
    <li onclick="closeAllBut">关闭其他</li>
    <li class="separator"></li>
    <li onclick="closeAll">关闭所有</li>        
</ul>
</body>
</html>
<script type="text/javascript">
    fui.parse();
    var tabs = fui.get("mainTabs");
    var leftTree = fui.get("leftTree");
    var currentTab = null;
    
    function onBeforeOpen(e) {
        currentTab = tabs.getTabByEvent(e.htmlEvent);
        if (!currentTab) {
            e.cancel = true;                
        }
    }
    
    function closeTab() {
    	if(currentTab.showCloseButton){
	        tabs.removeTab(currentTab);
    	}
    }
    
    function closeAllBut() {
    	var but = [currentTab];            
        but.push(tabs.getTab("first"));
        tabs.removeAll(but);
    }
    
    function closeAll() {
    	var but = [tabs.getTab("first")];
        tabs.removeAll(but);
    }
    
    function showTab(node) {
        var id = "tab$" + node.id;
        var tab = tabs.getTab(id);
        if (!tab) {
            tab = {};
            tab._nodeid = node.id;
            tab.name = id;
            tab.title = node.text;
            tab.showCloseButton = true;
            tab.url = fui.contextPath + "/" + (node.url && $.trim(node.url) != "" ? node.url : node.id);
            tabs.addTab(tab);
        }
        tabs.activeTab(tab);
    }

    function onNodeSelect(e) {
        var node = e.node;
        var isLeaf = e.isLeaf;
        if (isLeaf) {
            showTab(node);
        }
    }
    
    function onTabsActiveChanged(e) {
        var tabs = e.sender;
        var tab = tabs.getActiveTab();
        if (tab && tab._nodeid) {
        	// do something
        }
    }
    
    function updateStyle(style) {
		var data = {
			menuType : style == "pact" ? "pact" : "default",
			pageStyle : style
		};
		$.ajax({
			url : fui.contextPath + "/updateMenuTypeAndStyle",
			type : 'POST',
			data : data,
			success : function(text) {
				fui.alert("保存成功！");
			},
			error : function(jqXHR, textStatus, errorThrown) {
				fui.alert("保存失败!");
			}
		});
	}
</script>