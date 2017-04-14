<%@page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<style type="text/css">
	    html, body{
	        margin:0;padding:0;border:0;width:100%;height:100%;overflow:hidden;
	    }
	
	    .logo
	    {
	        font-family:"微软雅黑","Helvetica Neue",Helvetica,Arial,sans-serif;
	        font-size:28px;
	        font-weight:bold;        
	        cursor:default;
	        position:absolute;top:25px;left:14px;        
	        line-height:28px;
	        color:#444;
	    }    
	    .topNav
	    {
	        position:absolute;right:8px;top:12px;        
	        font-size:12px;
	        line-height:25px;
	    }
	    .topNav a
	    {
	        text-decoration:none;        
	        font-weight:normal;
	        font-size:12px;
	        line-height:25px;
	        margin-left:3px;
	        margin-right:3px;
	        color:#333;        
	    }
	    .topNav a:hover
	    {
	        text-decoration:underline;        
	    }   
	     .fui-layout-region-south img
	    {
	        vertical-align:top;
	    }
    </style>
</head>
<body>
	<div class="logo">
        ${projectName}&nbsp;<span style="font-size:12px;">${dev} </span>
	</div>
    <div class="topNav">    
        <a class="fui-button fui-button-iconLeft" iconCls="icon-home" onclick="toindex"  plain="true" >&nbsp;首&nbsp;页</a> |
        <a id="loginout" title="退出登录" class="fui-button fui-button-iconLeft" iconCls="icon-power-off" onclick="loginout" plain="true" target="_parent">&nbsp;注&nbsp;销</a>
    </div>

    <div style="position:absolute;right:12px;bottom:8px;font-size:12px;line-height:25px;font-weight:normal;">
      	  皮肤：
        <select onchange="updateStyle(this.value)" style="width:100px;margin-right:10px;">
            <option value="default" ${("default" eq menuStyle) ? "selected" : ""}>Default</option>
            <option value="bootstrap" ${("bootstrap" eq menuStyle) ? "selected" : ""}>Bootstrap</option>
            <option value="pact" ${("pact" eq menuStyle) ? "selected" : ""}>Pact</option>
        </select>
    </div>
</body>
<script type="text/javascript">
	function loginout(e) {
		window.location.href = fui.contextPath+"/destory";
	}
	
	function toindex(e) {
		window.location.href = fui.contextPath+"/default";
	}
</script>
</html>