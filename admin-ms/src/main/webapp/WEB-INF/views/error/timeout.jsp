<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<script type="text/javascript">
    getTopWinow().location.href = fui.contextPath + "/login.jsp";
    function getTopWinow() {
        var win = window;
        while (win != win.parent) {
            win = win.parent;
        }
        return win;
    }
</script>