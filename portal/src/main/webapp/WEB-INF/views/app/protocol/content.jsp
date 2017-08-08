<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>${contentNews.title}</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/public/css/zcxys.css">
</head>
<body>
<div class="content">
    ${contentNews.content}
    <!-- <c:if test="${docId == 2}"><p style="text-align:right">日期：${currentDate} </p></c:if> -->
</div>
</body>
</html>
