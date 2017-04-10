<%@page language="java" contentType="text/html; charset=UTF-8"%>
<script type="text/javascript">
	alert("登录超时，请重新登录！");
	getTopWinow().location.href = "login.jsp";
	function getTopWinow(){  
	    var win = window;
	    while(win != win.parent){
	    	win = win.parent;
	    }
	    return win;
	}
</script>