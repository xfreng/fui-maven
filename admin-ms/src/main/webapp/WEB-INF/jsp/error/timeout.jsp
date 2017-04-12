<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ include file="/WEB-INF/jsp/include/fui-common.jsp" %>
<script type="text/javascript">
    alert("登录超时，请重新登录！");
    getTopWinow().location.href = fui.contextPath + "/login.jsp";
    function getTopWinow() {
        var win = window;
        while (win != win.parent) {
            win = win.parent;
        }
        return win;
    }
</script>