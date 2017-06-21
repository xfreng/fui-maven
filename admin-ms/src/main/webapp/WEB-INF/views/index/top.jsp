<%@page language="java" contentType="text/html; charset=UTF-8"%>
<c:set value="${projectName eq null ? 'fuiPlat4j' : projectName}" var="p_name" scope="page"/>
<c:set value="${dev eq null ? '框架研发' : dev}" var="p_dev" scope="page"/>
<!DOCTYPE html>
<html>
<head>
	<style type="text/css">
	    html, body{
	        margin:0;padding:0;border:0;width:100%;height:100%;overflow:hidden;
	    }
	
	    .logo{
	        font-family:"微软雅黑","Helvetica Neue",Helvetica,Arial,sans-serif;
	        font-size:28px;
	        font-weight:bold;        
	        cursor:default;
	        position:absolute;
            top:16px;
            left:14px;
	        line-height:28px;
	        color:#444;
	    }    
	    .topNav{
	        position:absolute;right:8px;top:12px;        
	        font-size:12px;
	        line-height:25px;
	    }
	    .topNav a{
	        text-decoration:none;        
	        font-weight:normal;
	        font-size:12px;
	        line-height:25px;
	        margin-left:3px;
	        margin-right:3px;
	        color:#333;        
	    }
	    .topNav a:hover{
	        text-decoration:underline;        
	    }   
        .fui-layout-region-south img{
	        vertical-align:top;
	    }
    </style>
</head>
<body>
	<div class="logo">
        <a href="${path}/supervisor/default"><img src="${path}/public/mainframe/images/${logo eq null ? 'logo.png' : logo}"></a>&nbsp;
        <span class="separator"></span>
        ${p_name}&nbsp;<span style="font-size:12px;">${p_dev} </span>
    </div>
    <div class="topNav">
        <a class="fui-button fui-button-iconLeft" iconCls="icon-home" onclick="toIndex" plain="true" >&nbsp;首&nbsp;页</a>
        <a class="fui-button fui-button-iconLeft" iconCls="icon-pop_up_window" onclick="changeOpenWindow" plain="true" >窗口切换</a>
        <a class="fui-button fui-button-iconLeft" iconCls="icon-change_password" onclick="changePwdWindow" plain="true" >修改密码</a> |
        <a class="fui-button fui-button-iconLeft" iconCls="icon-power-off" onclick="loginOut" plain="true" target="_parent">&nbsp;注&nbsp;销</a>
    </div>

    <div style="position:absolute;right:12px;bottom:8px;font-size:12px;line-height:25px;font-weight:normal;">
      	  皮肤：
        <select onchange="updateStyle('default',this.value)" style="width:100px;margin-right:10px;">
            <option value="default" ${("default" eq menuStyle) ? "selected" : ""}>Default</option>
            <option value="bootstrap" ${("bootstrap" eq menuStyle) ? "selected" : ""}>Bootstrap</option>
            <option value="pact" ${("pact" eq menuStyle) ? "selected" : ""}>Pact</option>
        </select>
    </div>
</body>
<script type="text/javascript">
	function loginOut(e) {
		window.location.href = fui.contextPath+"/supervisor/destroy";
	}
	
	function toIndex(e) {
		window.location.href = fui.contextPath+"/supervisor/default";
	}
</script>
</html>