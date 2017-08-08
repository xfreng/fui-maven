<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <script type="text/javascript" src="${pageContext.request.contextPath}/public/scripts/jquery/jquery2.2.min.js"></script>
</head>
<body>
<h2>Hello World!</h2>
<button onclick="testSend()">测试发送报文</button><br/><br/>
<script type="text/javascript">
    var service_url = "http://192.168.52.106:8090/fuiapp/service/appservice";
    function testSend() {
        var transCode = "1001";
        var data = {
            "header":{"transcode":transCode},
            "body":{
                "device":2,
                "appKey":transCode,
                "machineCode":"00000000-54b3-e7c7-0000-000046bffd97",
                "uid":"9",
                "token":"jBm5Ev9g",
                "userName": "苏先生",
                "card": "450521199808084949",
                "income": "100",
                "userEmail": "123456@qq.com",
                "area": "湖南省,长沙市",
                "contact": "18977999999",
                "relation": "2",
                "userMarriage": "2",
                "userChsi": "2"
            }
        };
        $.ajax({
            url: service_url,
            type: "POST",
            data: {"data":JSON.stringify(data)+transCode},
            dataType: "json",
            success: function (text) {
                alert(JSON.stringify(text));
            }
        });
    }
</script>
</body>
</html>