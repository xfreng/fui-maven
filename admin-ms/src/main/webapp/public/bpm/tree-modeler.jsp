<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh_CN">
<head>
	<title>模型设计器</title>
	<%@include file="/WEB-INF/views/include/fui-common.jsp"%>
	<style type="text/css">
		body{
	        margin:0;padding:0;border:0;width:100%;height:99%;overflow:hidden;
	    }
	</style>
</head>
<body>
	<div class="fui-splitter" style="width:100%;height:100%;">
		<div size="240" showCollapseButton="true">
			<div class="fui-panel" title="导航" style="width:100%;height:100%;">
			    <ul id="tree" class="fui-tree" url="${path }/getModel?modelId=${param.modelId }" style="width:100%;"
	                showTreeIcon="true" textField="text" idField="id" expandOnNodeClick="true">        
	            </ul>
	    	</div>
		</div>
        <div showCollapseButton="true">
			<div class="fui-fit" style="width:100%;height:100%;">
	        	<div class="fui-tabs" style="width:100%;height:100%;">
	        		<div id="designer" title="设计" style="padding:2px;overflow:hidden;" 
	        			 url="${path }/bpm/modeler.html?modelId=${param.modelId }"
	        		</div>
	        	</div>
	        </div>
	    </div>
	</div>
</body>
<script type="text/javascript">
	fui.parse();
	var tree = fui.get("tree");
	var currentNode = null;
	var iframeId = "modeler";
	
	// 默认选中根节点
	function onNodeLoadSuccess(node, data){
		if(currentNode != null){
			var findNode = tree.tree("find",currentNode.id);
			tree.tree("select",findNode.target);
		}else{
			var rootNode = tree.tree("getRoot");
			tree.tree("select",rootNode.target);
		}
	}
	
	// 树节点点击事件
	function onNodeClick(node){
		currentNode = node;
		changeIframeSrc(node);
		changeHighlightNode(node.id);
	}
	
	// 点击同一个节点不刷新
	function iframeloading(url) {
		var iframe = document.getElementById(iframeId);
		if(iframe.src.indexOf(url) == -1){
			iframe.src = url;
		}
	}
	
	// 点击显示相应流程图
	function changeIframeSrc(node){
		var modelId = node.resourceId;
		$.ajax({
            url: fui.contextPath + "/checkModelByModelId",
            type: "post",
            dataType: "json",
          	async: false,
            data:  {"modelId":modelId},
            success: function (data) {
                var state = data.state;
                if(state != 1){
                	var parentNode = tree.tree("getParent",node.target);
                	if(parentNode != null){
	                	modelId = parentNode.resourceId;
                	}
                }
                iframeloading(fui.contextPath+"/bpm/modeler.html?modelId="+modelId);
            }
        });
	}
	
	// 点击节点设置对应节点颜色高亮显示
	function changeHighlightNode(highlightId){
		var iframe = document.getElementById(iframeId);
		var iframeBody = iframe.contentWindow.document.body;
		var id = "svg-"+highlightId;
		var highlightNodes = $(iframeBody).find("g[id='"+id+"']").parent().children();
		if(highlightNodes.length > 0){
			highlightNodes.each(function() {
				var _id = $(this).attr("id");
				if(_id == id){
					var rects = $(this).find("rect");
					var editor = $(this).find("g[class='me']").get(0);
					rects.each(function() {
						var strokeWidth = $(this).attr("stroke-width");
						if(strokeWidth == 1){//改变边框厚度和颜色
							$(this).attr("stroke","#ff0000");
							$(this).attr("stroke-width",3.5);
							triggerMouseEvents(editor);
						}
					});
				}else{
					var rects = $(this).find("rect");
					rects.each(function() {
						var strokeWidth = $(this).attr("stroke-width");
						if(strokeWidth == 3.5){//改变边框厚度和颜色
							$(this).attr("stroke","#bbbbbb");
							$(this).attr("stroke-width",1);
						}
					});
				}
			});
		}else{
			var rects = $(iframeBody).find("rect");
			rects.each(function() {
				var strokeWidth = $(this).attr("stroke-width");
				if(strokeWidth == 3.5){//改变边框厚度和颜色
					$(this).attr("stroke","#bbbbbb");
					$(this).attr("stroke-width",1);
					var editor = $(iframeBody).find("#canvasSection").find(".ORYX_Editor").get(0);
					triggerMouseEvents(editor);
				}
			});
		}
	}
	
	// 触发鼠标点击事件
	function triggerMouseEvents(editor){
		var mousedownEvt = document.createEvent("MouseEvents"); 
		mousedownEvt.initEvent("mousedown", false, true);
		editor.dispatchEvent(mousedownEvt);
		var mouseupEvt = document.createEvent("MouseEvents"); 
		mouseupEvt.initEvent("mouseup", false, true);
		editor.dispatchEvent(mouseupEvt);
	}
</script>
</html>