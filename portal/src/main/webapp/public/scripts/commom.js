$.ajaxSetup({
    complete : function (xhr, status) {
        switch (xhr.status){
            case 404:
                alert(xhr.statusText);
                break;
            case 0:
                alert("server 500 error");
                break;
            case 500:
                alert("server 500 error");
                break;
            case 520:
                alert("未登录或登录超时!");
                break;
        }
    }
});