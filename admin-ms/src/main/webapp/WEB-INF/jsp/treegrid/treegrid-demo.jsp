<%@page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>treegrid-demo</title>
    <%@include file="/WEB-INF/jsp/include/fui-common.jsp"%>
</head>
<body>
 	<h1>菜单树</h1>
 	<div id="treegrid1" class="fui-treegrid" style="width:700px;height:auto;"     
	     url="${path }/loadMenuNodes" showTreeIcon="false" dataField="treeNodes" 
	     treeColumn="text" idField="id" parentField="pid" resultAsTree="false"  
	     allowResize="true" expandOnLoad="true"
	     allowCellEdit="true" allowCellSelect="true">
	    <div property="columns">
	        <div type="indexcolumn"></div>
	        <div name="text" field="text" width="220" >菜单名称</div>
	        <div name="id" field="id" width="100%">菜单编号
	        	<input property="editor" class="fui-textbox" style="width:100%;" />
	        </div>
	    </div>
	</div>
	<p><input id="tsp1" class="fui-timespinner"  format="H:mm" /></p>
</body>
</html>
<script type="text/javascript">
	fui.parse();
	var tree = fui.get("treegrid1");
</script>