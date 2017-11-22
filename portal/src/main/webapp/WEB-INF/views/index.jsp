<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/10/25
  Time: 16:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>index page</title>
</head>
<body>
    <b>isApp:</b> ${accessSite.app} <br/>
    <b>deviceName:</b> ${accessSite.deviceName}<br/>
    <b>aaa:</b> ${aaa}<br/>
    <script type="text/javascript">
        $(function () {
            $.post("/json",function(result){
                console.dir(result);
            })
        })
    </script>
</body>
</html>
