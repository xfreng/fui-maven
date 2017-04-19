<%@page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <%@include file="/WEB-INF/jsp/include/iplat-common.jsp"%>
	<%@include file="/WEB-INF/jsp/include/fui-iplat-common.jsp"%>
	<c:set value="${projectName eq null ? 'fuiPlat4j' : projectName}" var="p_name" scope="page"/>
	<c:set value="${dev eq null ? '框架研发' : dev}" var="p_dev" scope="page"/>
	<title>欢迎使用 ${p_name}[${p_dev}]</title>
	<link rel="stylesheet" type="text/css" href="${path }/public/EP/indexReal-${iPlatStyle }-3.0.css">
    <link rel="stylesheet" type="text/css" href="${path }/public/EU/Font-Awesome/css/font-awesome.css">
    <link rel="stylesheet" type="text/css" href="${path }/public/EU/Font-Awesome/css/font-awesome-${menuStyle }.css">
	<link rel="stylesheet" type="text/css" href="${path }/public/EU/Font-Awesome/css/font-awesome.jquery.css">
    <style type="text/css">
		html, body {
			margin: 0;
			padding: 0;
			border: 0;
			width: 100%;
			height: 100%;
			overflow: hidden;
		}
		.selected{
			background: #ddd;
		}
		.color_a{
			color:#595959;
		}
		.searchbox .fui-buttonedit-icon{
	        background:url('${path }/public/mainframe/images/search.gif') no-repeat 50% 50%;
	    }
	</style>
	<script type="text/javascript">
		var __newForm = true;
		var __clickNode = null;
		var topMenuModel = new eiTreeModel();
		var leftMenuModel = new eiTreeModel();
		function configMenu(menu) {
			menu.depth(9);
			menu.textClicked = activeFormByMenu;
			menu.hoverExpand = function(n) {
				return true;
			}
		}

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
				newForm(label,url);
				return;
			}
			if (node.leaf()) {
				activeForm(label,text,url);
			}
		}

		function activeForm(label,text,url) {
			if (__newForm == true) {
				newForm(label,label);
			} else {
				openForm(label,text,url);
			}
		}

		function newForm(label,url) {
			label = (url && $.trim(url) != "") ? url : label;
            var _wnd = window;
            // 判断打开页面是否是分帧页面，如果是分帧页面，则要找到包含分帧页面的顶级页面
            while (isAvailable(_wnd.top) && _wnd != _wnd.top) {
                _wnd = _wnd.top;
            }
            // 打开新页面，并将新页面存入当前window对象的winMap中去
            if (_wnd != null) {
                _wnd.winMap[_wnd.winCount] = window.open(fui.contextPath + "/" + label);
                return _wnd.winMap[_wnd.winCount++];
            }
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

        if(window.attachEvent){
            window.attachEvent('onunload',function(){
                closeSonWindow();
            });
		}
	</script>
</head>
<body id="indexRealBody" onload="setCurTime('cy','');">
<div class="fui-layout" style="width:100%;height:100%;">
    <div showHeader="false" region="north" class="app-header" bodyStyle="overflow:hidden;" height="89" showSplit="false">
        <!--head 开始-->
		<div class="head">
	    	<!--top-->
	    	<div class="top">
	        	<!--logo-->
	            <div class="logo">
	                <a href="${path }/pact" class="bak_logo mg_b-4"></a>
	                <a href="javascript:void(0)" class="title-line mg_t_15 mg_l_10"></a>
	                <span class="white font_18 font_b pd_l_10" style="position:absolute;top:20px;">
						${p_name}&nbsp;<span style="font-size:12px;">${p_dev} </span>
					</span>
	            </div>
	            <!--menu-->
	            <div class="nav_menu">
	                <ul>
	                	<li style="margin-top:18px;">
	               			<span class="mg_l_10 font_14" style="top:50px;">欢迎您！${user.ename}&nbsp;&nbsp;&nbsp;</span>
	                	</li>
	                	<li>
	                        <a href="${path }/pact"><img src="${path }/public/mainframe/images/login/home.png" /><span class="mg_l_10 font_14">首页</span></a>
	                    </li>
	                	<li>
	                        <a href="javascript:changeOpenWindow()"><img src="${path }/public/mainframe/images/login/pop_up_window.png" /><span class="mg_l_10 font_14">窗口切换</span></a>
	                    </li>
	                    <li>
	                    	<a href="${path }/destory"><img src="${path }/public/mainframe/images/login/logout.png" /><span class="mg_l_10 font_14">注销</span></a>
	                    </li>
	                    <li id="dropdown">
	                    	<a href="javascript:void(0)"><img src="${path }/public/mainframe/images/login/skin.png" /><span class="mg_l_10 font_14">皮肤&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
	                        <ul class="dropdownMenu">
	                    		<li onclick="updateStyle('default','default')" ${"default" eq menuStyle?"class'selected'":""}><span class="default color"></span><span class="pd_l_15">默认</span></li>
	                    		<li onclick="updateStyle('pact','red')" ${"red" eq menuStyle?"class'selected'":""}><span class="red color"></span><span class="pd_l_15">红色</span></li>
	                    		<li onclick="updateStyle('pact','black')" ${"black" eq menuStyle?"class'selected'":""}><span class="black color"></span><span class="pd_l_15">黑色</span></li>
	                            <li onclick="updateStyle('pact','pact')" ${"pact" eq menuStyle?"class'selected'":""}><span class="blue color"></span><span class="pd_l_15">蓝色</span></li>
	                            <li onclick="updateStyle('pact','skyblue')" ${"skyblue" eq menuStyle?"class'selected'":""}><span class="skyblue color"></span><span class="pd_l_15">青色</span></li>
	                        </ul>
	                    </li>
	                </ul>
	            </div>
	            <div class="clear"></div>
	         </div>
	         <!--顶部菜单-->
			 <div id="mainMenuBar" class="ef-menu-bar-div">
			 	<EF:EFMenu model="topMenuModel" id="nMenu" configFunc="configMenu"></EF:EFMenu>
			 </div>
	    </div>
	    <!--head 结束-->
    </div>
    <div showHeader="false" region="south" style="border:0;text-align:center;" height="35" showSplit="false">
        <%@include file="/WEB-INF/jsp/index/footer.jsp"%>
    </div>
    <div showHeader="false" region="west" style="margin-top:11px;" bodyStyle="padding-left:1px;" showSplitIcon="true" width="230" minWidth="100" maxWidth="350">
        <!--左侧菜单-->
        <div id="menu" class="">
	         <div id="indexRealLeftTreeDiv" class="slim-scroll">
	           <EF:EFTree model="leftMenuModel" id="nTree" text="" configFunc="configTree" type="menuTree"/>
	         </div>
    	</div>
    </div>
    <div showHeader="false" region="center" style="border:0;margin-top:10px;">
        <div id="mainTabs" class="fui-tabs" activeIndex="0" style="width:100%;height:100%;" 
            onactivechanged="onTabsActiveChanged" contextMenu="#tabsMenu">
            <div name="first" title="每日记事" url="${path }/calendar"></div>
        </div>       
    </div>
    <div iconCls="icon-favorite" title="我的收藏&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='float:right'><a href='#' class='color_a'><u>更多>></u></a></span>" region="east" style="margin-top:10px;" width="195" showCollapseButton="false" showCloseButton="false" showSplitIcon="true">
    	<div class="business">
            <div class="bd_t_e4">
              	<ul id="shortcut_item">
                  	<li><a href="javascript:void(0)" title="我的风格" class="icon_wodefengge" onclick="clickProcess('mystyle')"></a>
                          <br><br>
                          <span>我的风格</span>
                      </li>
                  	<li><a href="javascript:void(0)" title="密码设置" class="icon_mimashezhi" onclick="clickProcess('pwdset')"></a>
                          <br><br>
                          <span>密码设置</span>
                      </li>
                  </ul>
            </div>
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
<script type="text/javascript">
	pageRenderer();
	function pageRenderer() {
		$("#dropdown").toggle(function() {
			$("#dropdown .dropdownMenu").css("display", "block");
			$("#dropdown a").addClass("hover");
		}, function() {
			$("#dropdown .dropdownMenu").css("display", "none");
			$("#dropdown a").removeClass("hover");
		});
	}
	fui.parse();
	var tabs = fui.get("mainTabs");
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
            tab.url = fui.contextPath + "/" + (node.url && $.trim(node.url) != "" ? node.url : node.id);
            tab.showCloseButton = true;
	        tabs.addTab(tab);
        }
        tabs.activeTab(tab);
    }
	function onTabsActiveChanged(e) {
        var tabs = e.sender;
        var tab = tabs.getActiveTab();
        if (tab && tab._nodeid) {
            // do something
        }
    }
	function updateStyle(type,style) {
		var data = {
			menuType : type,
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
</html>