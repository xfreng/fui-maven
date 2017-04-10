<%@page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<%@include file="/WEB-INF/jsp/include/iplat-common.jsp"%>
	<%@include file="/WEB-INF/jsp/include/fui-iplat-common.jsp"%>
    <title>数据字典管理</title>
    <style type="text/css">
        .New_Button, .Edit_Button, .Delete_Button, .Update_Button, .Cancel_Button {
            font-size:11px;
            color:#1B3F91;
            font-family:Verdana;  
            margin-right:5px;          
        }
    </style>        
</head>
<body>
<div id="layout" class="fui-layout" style="width:100%;">
	<div region="west" showHeader="false" style="cursor:hand;" bodyStyle="padding-left:0px;overflow:hidden;" showSplitIcon="false" width="550">
         <!-- 业务字典类型 -->
         <table align="center" border="0" style="width:100%;height:100%" cellSpacing=0 cellPadding=0>
             <tr>
                 <td style="width:100%;height:20%">
                 	<fieldset style="border:solid 1px #aaa;padding:3px;width:100%">
                     <!--<h1>业务字典管理</h1>-->
					<div class="search-condition">
						<div class="list">
							<form id="form1" name="form1" action="dictTypeServlet?method=dictExport" method="post">
								<table class="table">
									<tr>
										<td class="tit">类型代码：</td>
										<td>
										  	<input name="id" class="fui-textbox"/>
								        </td>
								        <td class="tit">类型名称：</td>
										<td>
											<input name="dicttypename" class="fui-textbox"/>
							            </td>
								    </tr>
									<tr>
										<td class="btn-wrap" colspan="4">
											<a class="fui-button"  iconCls="icon-download" type="submit" onclick="exportDict();" />导 出</a>&nbsp;&nbsp;
											<a class="fui-button"  iconCls="icon-search" onclick="search()">查 询</a>&nbsp;&nbsp;
											<a class="fui-button"  iconCls="icon-reset" onclick="reset()">重 置</a>
										</td>
									</tr>
								</table>
							</form>
						</div>
					</div>
					</fieldset>
                 </td>
             </tr>
             <tr>
                     <td style="width:100%;height:100%" align="left" valign="top" colspan="2">
                         <div style="width:100%;">
					        <div class="fui-toolbar" style="border-bottom:0;padding:0px;width:100%;">
					            <table style="width:100%;">
					                <tr>
					                    <td style="width:100%;">
					                        <a class="fui-button" iconCls="icon-add" onclick="addRow()">添加一行</a>
					                        <span class="separator"></span>
					                        <a class="fui-button" iconCls="icon-save" onclick="saveData()">保存</a>
					                        <a class="fui-button" iconCls="icon-remove" onclick="removeRow()">删除</a>
					                    </td>
					                </tr>
					            </table>           
					        </div>
					    </div>    
					    <div id="dicttype_grid" class="fui-datagrid" style="width:100%;height:100%;" 
					        url="${path }/dict/queryDictType" idField="id" selectOnLoad="true"
					        allowResize="true" pageSize="10" oncellmousedown="onCellBeginEdit"
					        allowCellEdit="true" allowCellSelect="true" multiSelect="true" editNextOnEnterKey="true"
					        onselectionchanged="onSelectionChanged">
					        <div property="columns">
					        	<div type="checkcolumn" ></div>
					            <div field="id" headerAlign="center" >类型代码
					             	<input property="editor" class="fui-textbox" style="width:100%;" />
					            </div>                                        
					            <div field="dicttypename" headerAlign="center" >类型名称
					            	<input property="editor" class="fui-textbox" style="width:100%;" />
					            </div>          
					        </div>
					    </div> 
                     <td>
             <tr>
         </table>
	</div>
    <div region="center" showHeader="false" style="cursor:hand;" bodyStyle="padding-left:0px;overflow:hidden;" showSplitIcon="false">
             <TABLE style="width:100%;height:100%" cellSpacing="0" cellPadding="0" border="0">
                 <TR>
                     <TD style="width:64%;height:38%" align="left" valign="top">
                         <div id="layout1" class="fui-layout" style="width:100%;height:100%">
							<div title="数据字典项" width="100%" class="panel" allowResize="false">
								<ul id="tree1" class="fui-tree" url="${path }/dict/queryDictForTree"
									style="width:100%;height:100%;padding:5px;" expandOnLoad="0"
								    showTreeIcon="true" textField="name" dataField="data"
								    idField="id" parentField="pid" resultAsTree="false"> 
								</ul>
							</div>
						</div>
                     </TD>
                 </TR>
                 <TR>
                     <TD style="width:100%;height:62%" align="left" valign="top" >
                         <!-- 业务字典类型项 -->
                         <div style="width:100%;">
					        <div class="fui-toolbar" style="border-bottom:0;padding:0px;">
					            <table style="width:100%;height:100%;">
					                <tr>
					                    <td style="width:100%;">
					                        <a class="fui-button" iconCls="icon-add" onclick="addEntryRow()">添加一行</a>
					                        <span class="separator"></span>
					                        <a class="fui-button" iconCls="icon-save" onclick="saveEntryData()">保存</a>            
					                        <a class="fui-button" iconCls="icon-remove" onclick="removeEntryRow()">删除</a>
					                    </td>
					                </tr>
					            </table>           
					        </div>
    					</div>
					    <div id="dictentry_grid" class="fui-datagrid" style="width:100%;height:100%;" 
					        url="${path }/dict/getLayout" idField="id" allowResize="true"
					        allowCellEdit="true" allowCellSelect="true" multiSelect="true" editNextOnEnterKey="true">
					        <div property="columns">
					        	<div type="checkcolumn" ></div>
					        	<div field="id" headerAlign="center" allowSort="false" visible="false">上级类型代码
					        	</div> 
					        	<div field="dictid" headerAlign="center" allowSort="false">类型代码
					            	<input property="editor" class="fui-textbox" style="width:100%;" />
					            </div> 
					            <div field="dictname" headerAlign="center" allowSort="false">类型项名称
					            	<input property="editor" class="fui-textbox" style="width:100%;" />
					            </div>
					            <div field="dictsort" headerAlign="center" allowSort="false">排序
					            	<input property="editor" class="fui-textbox" style="width:100%;" />
					            </div>
					        </div>
					    </div>
                     </TD>
                 </TR>
  			</TABLE>
	</div>
</div>    
	
<script type="text/javascript">
      fui.parse();
	  var form = new fui.Form("#form1");
      var dicttype_grid = fui.get("dicttype_grid");
      var dictentry_grid = fui.get("dictentry_grid");
      var tree = fui.get("tree1");

      dicttype_grid.load();
      
      tree.load();
      
      dictentry_grid.load();

      $(function() {
			var layout = fui.get("layout");
	  		var pageHeadHeight = $("#ef_form_head").outerHeight();
	  		if(self != top){
	  			pageHeadHeight = 0;
	  		}
	  		layout.setHeight($(window).height() - pageHeadHeight);
	  		$(window).resize(function(){
	  			layout.setHeight($(window).height() - pageHeadHeight);
	  		});
	 });
      
     function onCellBeginEdit(e) {
  		var editor = dicttype_grid.getCellEditor(e.column, e.record);
  		if(editor){
  			if (e.field == 'id' && e.record._state != 'added') {
  				editor.disable();
  			}else{
  				editor.enable();
  			}
  		}
  	  }
      
      function onSelectionChanged(e) {
          var grid = e.sender;
          var record = grid.getSelected();
          if (record) {
          	  tree.load({ dicttypeid: record.id});
         	  dictentry_grid.load({ dicttypeid: record.id });
          }
      }
      
      function search() {       
          var data = form.getData(false,false);      //获取表单多个控件的数据
          dicttype_grid.load(data);
      }
      
      function onKeyEnter(e) {
          search();
      }

      function addRow() {
          var newRow = {};
          dicttype_grid.addRow(newRow, -1);
          dicttype_grid.setSelected(newRow);
      }
      
      function addEntryRow() {
    	  var row = dicttype_grid.getSelected();
          var newRow = {id:row.id};
          dictentry_grid.addRow(newRow, -1);
          dictentry_grid.setSelected(newRow);
      }
      
     function removeRow() {
    	  fui.confirm("确定删除选中行吗？","提示信息",function callback(action){
    		 if(action == "ok"){
    		 	var rows = dicttype_grid.getSelecteds();
    	        if (rows.length > 0) {
    	        	dicttype_grid.removeRows(rows, true);
    	        	saveData();
    	        }
    		 } 
    	  });
     }
      
     function removeEntryRow() {
    	 fui.confirm("确定删除选中行吗？","提示信息",function callback(action){
    		 if(action == "ok"){
    			 var rows = dictentry_grid.getSelecteds();
    	          if (rows.length > 0) {
    	              dictentry_grid.removeRows(rows, true);
    	              saveEntryData();
    	          }
    		 }
    	 });
     }
     
     function saveData() {
        var data = dicttype_grid.getChanges();
        var len = data.length;
  	    if(len == 0){
  	    	fui.alert("请填写一条信息！");
  		    return;
  	    }
  	    for(var i=0;i<len;i++) {
  	    	var item = data[i];
  	    	var dicttypeid = item.id;
  	    	var dicttypename = item.dicttypename;
  	    	if (!dicttypeid || !dicttypename) {
  	    		fui.alert("请将信息填写完整！");
  	    		return;
  	    	}
  	    }
        var json = fui.encode(data);
        dicttype_grid.loading("保存中，请稍后......");
        fui.ajax({
            url: fui.contextPath + "/dict/saveDictType",
            type: 'POST',
            data: {data:json},
            success: function (text) {
            	dicttype_grid.reload();
            	tree.reload();
            	dictentry_grid.reload();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                fui.alert(jqXHR.responseText);
            }
        });
    }
      
    function saveEntryData() {
     	var record = dicttype_grid.getSelected();
        var data = dictentry_grid.getChanges();
        var len = data.length;
  	    if(len == 0){
  	    	fui.alert("请填写一条信息！");
  		    return;
  	    }
  	    for(var i=0;i<len;i++) {
  	    	var item = data[i];
  	    	var dictid=item.dictid;
  	    	var dictname=item.dictname;
  	    	if (!dictid || !dictname) {
  	    		fui.alert("请将信息填写完整！");
  	    		return;
  	    	}
  	    }
        var json = fui.encode(data);
        dictentry_grid.loading("保存中，请稍后......");
        fui.ajax({
            url: fui.contextPath+"/dict/saveDictEntry",
            type: 'POST',
            data: {data:json,dicttypeid:record.dicttypeid},
            success: function (text) {
            	tree.reload();
                dictentry_grid.reload();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                fui.alert(jqXHR.responseText);
            }
        });
     }
      
  	function reset(){//重置
		form.reset();
	}
      
  	/**
  	*导出数据字典
  	*/
  	function exportDict(){
        var frm = document.getElementById("form1");
		frm.submit();
   	}
</script>
</body>
</html>