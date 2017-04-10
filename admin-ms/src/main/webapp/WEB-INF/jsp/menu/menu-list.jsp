<%@page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<%@include file="/WEB-INF/jsp/include/iplat-common.jsp"%>
	<%@include file="/WEB-INF/jsp/include/fui-iplat-common.jsp"%>
	<title>系统菜单管理</title>
	<style type="text/css">
		#tree .fui-grid-viewport{
			background-color:transparent !important;
		}
		#tree .fui-panel-viewport{
			background-color:transparent !important;
		}
	</style>
</head>
<body>
<jsp:include flush="false" page="/WEB-INF/jsp/include/iplat.ef.head.jsp">
	<jsp:param value="EDPI10" name="efFormEname"/>
	<jsp:param value="系统菜单管理" name="efFormCname"/>
</jsp:include>
<div id="layout" class="fui-layout" style="width:100%;">
	<div region="west" showHeader="false" style="cursor:hand;" bodyStyle="padding-left:0px;" showSplitIcon="true" width="230" maxWidth="530">
	    <ul id="tree" class="fui-tree" url="${path }/loadMenuNodes" style="width:100%;margin-top:5px;" 
		    showTreeIcon="true" textField="text" onbeforeload="onBeforeTreeLoad" dataField="treeNodes"
		    idField="id" parentField="pid" resultAsTree="false" onnodeclick="onNodeClick" 
		    contextMenu="#treeMenu">       
		</ul>
	</div>
	<div showHeader="false" region="center" bodyStyle="overflow:hidden;" style="border:0;">
		<div class="fui-toolbar" style="border-top:0;border-left:0;border-right:0;">
	    	<a class="fui-button" iconCls="icon-add" onclick="addRow()">添加一行</a>
	    	<span class="separator"></span>             
	        <a class="fui-button" iconCls="icon-addnew" onclick="add()">新增</a>
	        <a class="fui-button" iconCls="icon-edit" onclick="edit()">修改</a>
	        <a class="fui-button" iconCls="icon-remove" onclick="remove()">删除</a>     
	        <a class="fui-button" iconCls="icon-download" onclick="exportExcel()">导出</a>     
	    </div>
	    <div id="grid" class="fui-datagrid" style="width:100%;height:94%;" multiSelect="true"
	       	url="${path }/loadMenuNodes" idField="id" parentField="pid" pageSize="20"
	        textField="text" dataField="treeNodes" showFilterRow="false" allowCellSelect="true" 
	        allowCellEdit="true" onrowdblclick="toedit" oncellmousedown="onCellBeginEdit">
	        <div property="columns">
				<div type="checkcolumn" ></div>    
	            <div field="pid" width="85" headerAlign="center" allowSort="false" visible="true">上级菜单编号</div>      
	            <div field="id" width="100" headerAlign="center" allowSort="false">菜单编号 
	            	<input property="editor" class="fui-textbox" style="width:100%;"/>
	            </div>
	            <div field="text" width="120" headerAlign="center" allowSort="false" align="left">菜单名称                        
	                <input property="editor" class="fui-textbox" style="width:100%;"/>
	            </div>
	            <div type="comboboxcolumn" autoShowPopup="true" name="type" field="type" width="100" headerAlign="center" allowSort="false" align="center">节点类型                        
	                <input property="editor" class="fui-combobox" style="width:100%;" data="types"/>
	            </div>
	            <div field="sortId" width="95" headerAlign="center" allowSort="false" align="center">排序标识                        
	                <input property="editor" class="fui-textbox" style="width:100%;"/>
	            </div>        
	            <div field="url" width="120" headerAlign="center" allowSort="false">菜单URL                        
	                <input property="editor" class="fui-textbox" style="width:100%;"/>
	            </div>
	            <div field="image" width="120" headerAlign="center" allowSort="false" align="center">自定义图标样式                        
	                <input property="editor" class="fui-textbox" style="width:100%;"/>
	            </div>
				<div field="recCreator" width="100" headerAlign="center" allowSort="false" align="center">创建人</div>           
				<div field="recCreateTime" width="140" headerAlign="center" renderer="formatDate" allowSort="false" align="center">创建日期</div>              
				<div field="recRevisor" width="100" headerAlign="center" allowSort="false" align="center">修改人</div>              
				<div field="recReviseTime" width="140" headerAlign="center" renderer="formatDate" allowSort="false" align="center">修改日期</div>              
	        </div>
	    </div>
    </div>
</div>
<ul id="treeMenu" class="fui-contextmenu" onbeforeopen="onBeforeOpen"></ul>
</body>
<script type="text/javascript">
	var types = [{ id: 1, text: "叶子节点" }, { id: 0, text: "树节点"}];
	fui.parse();
	var layout = fui.get("layout");
	var tree = fui.get("tree");
	var currentNode = null;
	
	$(function() {
		var pageHeadHeight = $("#ef_form_head").outerHeight();
		if(self != top){
			pageHeadHeight = 0;
		}
		layout.setHeight($(window).height() - pageHeadHeight);
		$(window).resize(function(){
			layout.setHeight($(window).height() - pageHeadHeight);
		});
		expandRootNode();
	});
	
	function expandRootNode() {
		tree.setValue(tree.getChildNodes(tree.getRootNode())[0].id);
		var node = tree.getSelectedNode();
		if (node) {
            refreshNode(node);
        }
    }
	
	function onBeforeTreeLoad(e) {
		var node = e.node;
		if(!node.id){
	        e.params.id = "$";
		}
    }
	
    var menu_add = { title: '新增菜单', url: fui.contextPath + '/menustate' };
    
    var iconAdd = '<%="pact".equals(menuType)?"icon-and":"icon-add" %>';
    var iconRemove = '<%="pact".equals(menuType)?"icon-removenew":"icon-remove" %>';
    var iconReload = '<%="pact".equals(menuType)?"icon-reloadnew":"icon-reload" %>';
    var rootMenu = [
   		{text: "增加顶级菜单", onclick: "onAddRootMenu", iconCls: iconAdd},
   		{text: "刷新", onclick: "onRefreshNode", iconCls: iconReload}
   	];
    
	var menu = [
		{text: "增加下级菜单", onclick: "onAddMenuOfMenu", iconCls: iconAdd},
		{text: "删除本级菜单", onclick: "onRemoveMenu", iconCls: iconRemove},
		{text: "刷新", onclick: "onRefreshNode", iconCls: iconReload}
	];
	
	var menu_map = {
		Root: rootMenu,
		menu: menu
	};
	
	function onNodeClick(e){
		currentNode = e.node;
		loadGridData(currentNode.id);
	}
	this.getCurrentNode = function() {
		return currentNode;
	}
	this.getSelectedNode = function() {
		return tree.getSelectedNode();
	}
	this.getParentNode = function(node) {
		node = node || getCurrentNode();
		return tree.getParentNode(node);
	}
	this.refreshNode = function(node) {
		tree.loadNode(node);
	}
	this.refreshCurrentNode = function() {
		refreshNode(getCurrentNode());   			
	}
	this.refreshParentNode = function(node) {
		node = node || getCurrentNode();
		refreshNode(getParentNode(node));
	}
	function onRefreshNode(e) {
		refreshNode(getSelectedNode());
	}
	function onBeforeOpen(e) {
		var node = tree.getSelectedNode();
		var menu = e.sender;
		var menuList = {};
		if(node.id && node.id!="root"){
			menuList = menu_map["menu"];
		}else{
			menuList = menu_map["Root"];
		}
		
		if(!menuList || menuList.length == 0) {
			e.cancel = true;
			return;
		}
		menu.loadList(fui.clone(menuList));
	}
	function alertTip(message, title, timeout) {
		title = title || "提示";
		timeout = timeout || 500;
		var messageid = fui.loading(message, title);
		setTimeout(function () {
			fui.hideMessageBox(messageid);
		}, timeout);
	}
	function openDialog(params) {
		var openParams = fui.clone(params);
		
		openParams.onload || (openParams.onload = function () {
			var iframe = this.getIFrameEl();
			var contentWindow = iframe.contentWindow;
			
			if(contentWindow.setData) {
				contentWindow.setData(openParams.data);
			}
		});
		openParams.ondestroy || (openParams.ondestroy = function (action) {
			if (action == "ok") {
				refreshNode(getSelectedNode());
			}
		});
		fui.open(openParams);
	}
	function onAddRootMenu(e) {
		var rootNode = tree.getChildNodes(tree.getRootNode())[0];
		openDialog({
			title: "新增顶级菜单",
			url: menu_add.url,
			data: {pid: rootNode.id},
			width: 540,
			height: 255
		});
	}
	function onAddMenuOfMenu(e) {
		var selectedNode = getSelectedNode();
		openDialog({
			title: "新增下级菜单",
			url: menu_add.url,
			data: {pid: selectedNode.id},
			width: 540,
			height: 255
		});
	}
	function onRemoveMenu(e){
		var selectedNode = getSelectedNode();
   		fui.confirm("确定删除选中记录？","提示信息",function(action){
			if(action == "ok"){
	            var json = fui.encode({pid:selectedNode.pid,id:selectedNode.id});
	            var messageid = fui.loading("操作中，请稍后......");
	            $.ajax({
	                url: fui.contextPath + "/deleteMenu",
	                data: { data: json },
	                type: "post",
	                success: function (text) {
	                	text = fui.decode(text);
	                	var count = text.count;
	                 	if(count && parseInt(count)>0){
	                 		fui.alert("选择的菜单中有子菜单，不可删除！","提示信息",function(action){
	                 			fui.hideMessageBox(messageid);
	                 		});
	                 	}else{
	                 		if(!text.exception){
	                 			fui.hideMessageBox(messageid);
    		               		refreshCurrentNode();
        	                }
	                 	}
	                 },
	                 error: function () {
	                 }
	             });
        	}
        });
	}
	
	var grid = fui.get("grid");
	loadGridData("root");
	
	function loadGridData(pid){
		grid.load({ id: pid });
	}
	
	function addRow(){
		var newRow = { pid: getSelectedNode().id, type: 1 };
        grid.addRow(newRow, -1);
        grid.setSelected(newRow);
	}
	
	function add(){
        var len = grid.getSelecteds().length;
        if(len == 0){
        	fui.open({
                url: fui.contextPath + "/menustate",
                showMaxButton:true,
                title: "新增菜单", 
                width: 540, 
                height: 255,
                onload:function(){
                    var iframe = this.getIFrameEl();
                    var data = getCurrentNode()||tree.getChildNodes(tree.getRootNode())[0];
                    iframe.contentWindow.setData({pid:data.id});
                },
                ondestroy: function (action) {
                   if(action == "ok"){alert(33);
   		               	grid.reload();
    	               	refreshCurrentNode();
                   }
                }
            });
        }else{
        	var data = grid.getSelecteds();
            var json = fui.encode(data);
            grid.loading("保存中，请稍后......");
            $.ajax({
            	url: fui.contextPath + "/saveMenu",
                data: { data: json },
                type: "post",
                success: function (text) {
                    text = fui.decode(text);
                	var count = text.count;
                	if(count && parseInt(count)>0){
                		fui.alert("新增失败，菜单重复！","提示信息",function(action){
                			grid.reload();
                		});
                	}else{
                		if(!text.exception){
                			grid.reload();
                            grid.clearSelect(true);
                            refreshCurrentNode();
    	                }
                	}
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(jqXHR.responseText);
                }
            });
        }
	}
	
	function edit(){
		var len = grid.getSelecteds().length;
		if(len == 0){
			fui.alert("请选择一条记录！","提示信息");
			return;
		}else{
			var data = grid.getSelecteds();
            var json = fui.encode(data);
            grid.loading("修改中，请稍后......");
            $.ajax({
            	url: fui.contextPath + "/updateMenu",
                data: { data: json },
                type: "post",
                success: function (text) {
                    grid.reload();
                    grid.clearSelect(true);
	               	refreshCurrentNode();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(jqXHR.responseText);
                }
            });
		}
	}
	function toedit(e){
		var row = grid.getSelected();
		fui.open({
            url: fui.contextPath + "/menustate",
            showMaxButton:true,
            title: "修改菜单", 
            width: 540, 
            height: 255,
            onload: function () {
                var iframe = this.getIFrameEl();
                var data = row;
                data.action = "edit";
                iframe.contentWindow.setData(data);
            },
            ondestroy: function (action) {
            	if(action == "ok"){
	                grid.reload();
	               	refreshCurrentNode();
                }
            }
        });
    }
	function remove(){
        var rows = grid.getSelecteds();
        if (rows.length > 0) {
        	var json = fui.encode(rows);
            fui.confirm("确定删除选中记录？","提示信息",function(action){
            	if(action == "ok"){
	                grid.loading("操作中，请稍后......");
	                $.ajax({
	                    url: fui.contextPath + "/deleteMenu",
	                    data: { data: json },
	                    type: "post",
	                    success: function (text) {
	                    	text = fui.decode(text);
	                    	var count = text.count;
	                    	if(count && parseInt(count)>0){
	                    		fui.alert("选择的菜单中有子菜单，不可删除！","提示信息",function(action){
	                    			grid.reload();
	                    		});
	                    	}else{
	                    		if(!text.exception){
        			                grid.reload();
        		               		refreshCurrentNode();
            	                }
	                    	}
	                    },
	                    error: function () {
	                    }
	                });
            	}
            });
        } else {
            fui.alert("请选中一条记录！","提示信息");
        }
	}
	
	function onCellBeginEdit(e) {
		var editor = grid.getCellEditor(e.column, e.record);
		if(editor){
			if (e.field == "id" && e.record._state != "added") {
				editor.disable();
			}else{
				editor.enable();
			}
		}
	}
	
	function exportExcel(){
		$.ajax({
            url: fui.contextPath + "/export",
            type: "post",
            success: function (data) {
         		data = fui.decode(data);
            	
            },
            error: function () {
            }
    	});
	}
</script>
</html>