<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/10/25
  Time: 16:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="ftoul" uri="/ftoul/common-tags" %>
<html>
<head>
    <title>index page</title>
</head>
<body>
    <b>isApp:</b> ${accessSite.app} <br/>
    <b>deviceName:</b> ${accessSite.deviceName}<br/>
    <b>aaa:</b> ${aaa}<br/>
    <ftoul:resourceTag type="css" src="http://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" relative="false"/>
    <ftoul:resourceTag type="css" src="http://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" relative="false"/>
    <ftoul:resourceTag type="css" src="/bootstrap/3.3.7/css/bootstrap.min.css"/>
    <ftoul:resourceTag type="js" src="/public/scripts/commom.js"/>
   <%-- <ftoul:resourceTag type="img" src="/public/image/hello.jpg"  options="{alt:'test',width:'100px',height:'200px'}"/>--%>
    <script type="text/javascript">
        $(function () {
            $.post("/json",function(result){
                console.dir(result);
            })
        })
    </script>
</body>
</html>
