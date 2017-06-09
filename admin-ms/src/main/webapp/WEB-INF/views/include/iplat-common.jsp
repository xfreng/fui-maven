<%@ page language="java" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ page import="com.fui.common.MemCachedUtils" %>
<%@ page import="com.fui.common.UserUtils" %>
<%@ page import="com.fui.model.User" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<c:set value="${pageContext.request.contextPath}" var="path" scope="page"/>
<script type="text/javascript" src="${path}/public/EF/jQuery/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="${path}/public/EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="${path}/public/EF/jQuery/iplat.ui.accordionx.js"></script>
<script type="text/javascript" src="${path}/public/EP/index.menuTree.js"></script>

<link rel="stylesheet" type="text/css" href="${path}/public/EF/iplat-ui-2.0.css"/>
<%
    User user = UserUtils.getCurrent();
    String menuType = "pact";
    String menuStyle = "red";
    String iPlatStyle = "Blue";

    if (user != null) {
        menuType = user.getMenuType();
        menuStyle = user.getStyle();
    }

    if ("red".equals(menuStyle)) {
        iPlatStyle = "Red";
    } else if ("black".equals(menuStyle)) {
        iPlatStyle = "ModernBlack";
    }
    Object projectName = MemCachedUtils.get("projectName");
    Object logo = MemCachedUtils.get("logo");
    Object dev = MemCachedUtils.get("dev");
    request.setAttribute("menuType", menuType);
    request.setAttribute("menuStyle", menuStyle);
    request.setAttribute("iPlatStyle", iPlatStyle);
    request.setAttribute("user", user);
    request.setAttribute("projectName", projectName);
    request.setAttribute("logo", logo);
    request.setAttribute("dev", dev);
%>
<c:set value="${projectName eq null ? 'fuiPlat4j' : projectName}" var="p_name" scope="page"/>
<c:set value="${dev eq null ? '框架研发' : dev}" var="p_dev" scope="page"/>
<link rel="stylesheet" type="text/css" href="${path}/public/EF/Themes/styleApple/${iPlatStyle}/jquery-ui.custom.css"/>
<link rel="stylesheet" type="text/css" href="${path}/public/EF/Themes/styleApple/${iPlatStyle}/iplat-ui-theme-2.0.css"/>
<link rel="stylesheet" type="text/css" href="${path}/public/EP/indexReal-${iPlatStyle}-3.0.css"/>
<script type="text/javascript">
    /** Ajax请求异常处理全局设置 */
    $(document).ajaxComplete(function (evt, request, settings) {
        var text = request.responseText;
        //判断返回的数据内容，如果是超时，则跳转到登陆页面
        if (text == "timeout") {
            alert("未登录或登录超时!");
            var win = window.parent || window;
            win.location.href = fui.contextPath + '/login.jsp';
        }
    });
    /**
     * 自动layout高度
     * @param layoutId
     */
    function autoLayoutSize(layoutId, minus) {
        var layout = fui.get(layoutId);
        var pageHeadHeight = $("#ef_form_head").outerHeight();
        if (self != top) {
            pageHeadHeight = 0;
        }
        var minusHeight = 0;
        if (minus != undefined) {
            minusHeight = minus;
        }
        layout.setHeight($(window).height() - pageHeadHeight - minusHeight);
        $(window).resize(function () {
            layout.setHeight($(window).height() - pageHeadHeight - minusHeight);
        });
    };
    /**
     * 关闭所有子窗口(IE下有效)
     */
    function closeSonWindow() {
        var win = window.winMap;
        for (var index = 0; index < winCount; index++) {
            //如果窗口已关闭
            if (win[index].closed) {
                continue;
            }
            //如果窗口没有可以打开的子窗口
            if (typeof(win[index].openedWindow) == "undefined") {
                win[index].close();
                continue;
            }
            if (win[index].openedWindow.length == 0) {
                win[index].close();
            } else {
                win[index].close();
                closeSonWindow();
            }
        }
    };
</script>