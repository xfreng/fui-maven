<%@page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<%@include file="/WEB-INF/jsp/include/iplat-common.jsp"%>
	<%@include file="/WEB-INF/jsp/include/fui-iplat-common.jsp"%>
	<title>角色管理</title>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
</head>
<body style="width:100%;height:100%;">
<div class="fui-splitter" style="width:100%;height:100%;">
  <div size="750px" showCollapseButton="false" style="height:100%;">
		<div class="list">
			<div id="form1">
				<table id="table1" class="table" style="width:100%; align:center; ">
					<tr>
						<td class="tit" nowrap="true">角色名称：</td>
						<td>
							<input class="fui-textbox" name="roleName" />
						</td>
						<td class="tit" nowrap="true">角色类型：</td>
						<td>
					  		<input class="fui-dictcombobox" valueField="dictId" textField="dictName" emptyText="全部角色" 
	                 			dictTypeId="ROLETYPE" name="roleType" showNullItem="true" nullItemText="全部角色"/>
						</td>
					</tr>
					<tr>
						<td class="btn-wrap" align="center" colspan="4">
							<input class="fui-button" iconCls="icon-search" text="查询" onclick="search" />
						</td>
					</tr>
				</table>
			</div>
	</div>
	<div style="padding:10px 5px 0px 5px;">
		<div class="fui-toolbar" style="border-bottom:0;">
		  <table style="width:100%">
			<tr>
				<td>
					<a class="fui-button" iconCls="icon-add" onclick="addRole">增加</a>
					<a class="fui-button" id="btnEdit" iconCls="icon-edit" onclick="updateRole">修改</a>
					<a class="fui-button" iconCls="icon-remove" onclick="removeRole">删除</a>
				</td>
			</tr>
		  </table>
		</div>
	</div>
	<div class="fui-fit" style="padding:0px 5px 5px 5px;" id="form2">
		<div id="roleGrid" class="fui-datagrid" style="width:100%;height:99%;" url="roleManagerServlet?method=queryRole"
			idField="roleid" multiSelect="true" allowAlternating="true" showPager="true" sizeList="[10,20,30]" pageSize="10" 
			selectOnLoad="true" onselectionchanged="selectedRoles" sortMode="client" onrowdblclick="updateRole">
			<div property="columns">
				<div type="checkcolumn"></div>
				<div field="roleid" width="20%" headerAlign="center" allowSort="true">角色编码</div>
				<div field="rolename" width="30%" headerAlign="center" allowSort="true">角色名称</div>
				<div field="roletype" width="30%" headerAlign="center" renderer="renderRoletype" allowSort="true">角色类型</div>
			</div>
		</div>
	</div>
  </div>

  <div style="width:40%;height:100%;">
    <div id="tabs1" class="fui-tabs" activeIndex="0" style="height:98%;width:98%" bodyStyle="padding:0;border:0;">
	  <div title="权限功能树" allowResize="true">
 		<div style="height:1%;">&nbsp;</div>
		<div id="region1" region="west" title="权限功能树" showHeader="true" class="sub-sidebar" style="width:100%;height:98%;" allowResize="true">
			<ul id="tree1" class="fui-tree" url="menuMgrServlet?method=loadMenu" style="width:100%;padding:5px;height:92%;" 
		        showTreeIcon="true" textField="text" idField="id" parentField="pid" resultAsTree="false"  
		        showCheckBox="true" checkRecursive="true" dataField="treeNodes" onbeforenodecheck="onBeforeNodeCheck" 
		        expandOnLoad="false" allowSelect="false" enableHotTrack="false">
		    </ul>
			<div class="fui-toolbar" style="text-align:center;padding-top:1px;padding-bottom:8px;" borderStyle="border-left:0;border-bottom:0;border-right:0;">
		        <a class="fui-button" iconCls="icon-save" onclick="onRoleOk()">保存</a>
		   	</div>
		</div>
	  </div>
	  <div title="按钮资源树" allowResize="true">
 		<div style="height:1%;">&nbsp;</div>
		<div id="region2" region="west" title="按钮资源树" showHeader="true" class="sub-sidebar" style="width:100%;height:98%;" allowResize="true">
			<ul id="tree2" class="fui-tree" url="roleManagerServlet?method=getResourceMenu" style="width:100%;padding:5px;height:92%;" 
		        showTreeIcon="true" textField="text" idField="id" parentField="pid" resultAsTree="false"  
		        showCheckBox="true" checkRecursive="true" dataField="resourceTreeList" onbeforenodecheck="onBeforeNodeCheck" 
		        expandOnLoad="false" allowSelect="false" enableHotTrack="false">
		    </ul>
			<div class="fui-toolbar" style="text-align:center;padding-top:1px;padding-bottom:8px;"  borderStyle="border-left:0;border-bottom:0;border-right:0;">
		        <a class="fui-button" iconCls="icon-save" onclick="onResourceOk()">保存</a>
		   	</div>
		</div>
	  </div>
	</div>
  </div>
</div>
</body>
</html>
<script type="text/javascript">
	fui.parse();
	var form1 = new fui.Form("#form1");
	var roleGrid = fui.get("roleGrid");
	var tree1 = fui.get("tree1");
	var tree2 = fui.get("tree2");
	var selectedRowsNumber = 0;
	roleGrid.load();
	var selectroleid = "" ;
    
    //角色菜单查询(包括初始查询第一个角色菜单查询)
	function selectedRoles(e){
		var grid = e.sender;
	    var record = grid.getSelected() ;
	    if (record) {
	    	selectroleid = record.roleid ;
        	tree1.load({roleId:record.roleid});
        	tree2.load({roleId:record.roleid});
	    } else {
	    	selectroleid = "" ;
	    }
	}

	function addRole(){
		fui.open({
			url:"<%= request.getContextPath() %>/role_add.jsp",
			title:'角色新增',
			width:500,
			height:199,
			onload:function(){
			},
			ondestroy:function(action){
				if(action == "saveSuccess"){
					roleGrid.reload();
				}
			}
		});
	}

	function updateRole(){
		var rows = roleGrid.getSelecteds();
		var row = roleGrid.getSelected();
		if(rows == null || rows.length == 0){
			fui.alert("请选中一角色！","提示信息");
			return false;
		}else if(rows.length == 1){
			fui.open({
				url:"<%= request.getContextPath() %>/role_update.jsp",
				title:'角色修改',
				width:500,
				height:199,
				onload:function(){
					var iframe = this.getIFrameEl();
					iframe.contentWindow.setData(row);
				},
				ondestroy:function(action){
					if(action == "saveSuccess"){
						roleGrid.reload();
					}
				}
			});
		}else{
			fui.alert("只能修改一角色！","提示信息");
			return false;
		}
	}

	function removeRole(){
		var rows = roleGrid.getSelecteds();
		if(rows == null || rows.length == 0){
			fui.alert("请至少选中一角色！","提示信息");
			return false;
		} else if(rows.length == 1){
			fui.confirm("确定删除选中角色？", "系统提示", function(action){
				if(action=="ok"){
					var sendData = fui.encode(rows[0]);
					roleGrid.loading("正在删除中,请稍等...","提示信息");
					$.ajax({
						url:"roleManagerServlet?method=removeRoles",
						type:'POST',
						data:{submitData:sendData},
						success:function(text){
							var returnJson = fui.decode(text);
							if(returnJson.exception){
								fui.alert("角色删除成功", "系统提示", function(action){
									roleGrid.reload();
								});
							}else{
								fui.alert("角色删除失败", "系统提示");
								roleGrid.unmask();
							}
						}
					});
				}
			});
		}else{
			fui.alert("只能删除一角色！","提示信息");
			return false;
		}
	}

	function search(){
		var form1Data = form1.getData(false, true);
        roleGrid.load(form1Data);
	}

	//角色类型字典
	function renderRoletype(e){
		return fui.getDictText("ROLETYPE", e.row.roletype);
	}

	//选中机构树节点
	function onRoleOk() {
	    var node = tree1.getCheckedNodes();
	    if (node && tree1.isLeaf(node) == false) {
	        fui.alert("不能只选中父菜单节点！","提示信息");
	        return;
	    } else {
	    	var role = roleGrid.getSelecteds();
	    	if (role==null || role=="") {
				fui.alert("角色未选，请选择！", "系统提示");
				return true ;
	    	}
			var sendData = fui.encode({menus:node,roleid:selectroleid});
			tree1.loading("角色菜单保存中,请稍等...","提示信息");
			fui.ajax({
				url:"com.bos.utp.rights.RoleManager.saveRoleMenus.biz.ext",
				type:'POST',
				data:sendData,
				cache: false,
				contentType:'text/json',
				success:function(text){
					var returnJson = fui.decode(text);
					if(returnJson.exception == null){
						if (returnJson.retCode == "-1") {
							fui.alert("角色菜单保存失败，请重试！", "系统提示", function(action){
								roleGrid.unmask();
							});
						} else {
							fui.alert("角色菜单保存成功！", "系统提示", function(action){
								roleGrid.reload();
							});
						}
					}else{
						fui.alert("角色菜单保存失败！", "系统提示");
						roleGrid.unmask();
					}
				}
			});
	    }
	}
	
	//选中机构树节点
	function onResourceOk() {
	    var node = tree2.getCheckedNodes();
	    if (node && tree2.isLeaf(node) == false) {
	        fui.alert("不能只选中父菜单节点！","提示信息");
	        return;
	    } else {
	    	var role = roleGrid.getSelecteds();
	    	if (role==null || role=="") {
				fui.alert("角色未选，请选择！", "系统提示");
				return true ;
	    	}
			var sendData = fui.encode({menus:node,roleid:selectroleid});
			tree2.loading("按钮资源保存中,请稍等...","提示信息");
			fui.ajax({
				url:"com.bos.utp.rights.RoleManager.saveResourceMenus.biz.ext",
				type:'POST',
				data:sendData,
				cache: false,
				contentType:'text/json',
				success:function(text){
					var returnJson = fui.decode(text);
					if(returnJson.exception == null){
						if (returnJson.retCode == "-1") {
							fui.alert("按钮资源保存失败，请重试！", "系统提示", function(action){
								roleGrid.unmask();
							});
						} else {
							fui.alert("按钮资源保存成功！", "系统提示", function(action){
								roleGrid.reload();
							});
						}
					}else{
						fui.alert("按钮资源保存失败！", "系统提示");
						roleGrid.unmask();
					}
				}
			});
	    }
	}
	
	//菜单树节点点击处理
	function onBeforeNodeCheck(e) {
        var tree = e.sender;
        var node = e.node;
        if (tree.hasChildren(node)) {}
    }
</script>