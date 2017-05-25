<%@ page language="java" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<script type="text/javascript" src="${path}/public/common/fui/fui.js"></script>
<script type="text/javascript" src="${path}/public/common/fui/fui-ext.js"></script>
<script type="text/javascript" src="${path}/public/common/fui/common.js"></script>
<script type="text/javascript" src="${path}/public/common/fui/json2.js"></script>
<script type="text/javascript" src="${path}/public/common/fui/jquery/jquery.cookies.js"></script>
<c:choose>
	<c:when test="${'pact' eq menuType}">
		<link rel="stylesheet" type="text/css" href="${path}/public/common/fui/themes/pact/fui.css"/>
		<link rel="stylesheet" type="text/css" href="${path}/public/common/fui/themes/${menuStyle}/common.css"/>
		<link rel="stylesheet" type="text/css" href="${path}/public/common/fui/themes/${menuStyle}/skin.css"/>
		<link rel="stylesheet" type="text/css" href="${path}/public/common/fui/themes/${menuStyle}/icons.css"/>
	</c:when>
	<c:otherwise>
		<link rel="stylesheet" type="text/css" href="${path}/public/common/fui/themes/default/fui.css"/>
		<link rel="stylesheet" type="text/css" href="${path}/public/common/fui/themes/icons.css"/>
		<link rel="stylesheet" type="text/css" href="${path}/public/common/fui/themes/${menuStyle}/skin.css"/>
	</c:otherwise>
</c:choose>

<link rel="stylesheet" type="text/css" href="${path}/public/common/fui/themes/pact/demo.css"/>

<script type="text/javascript">
	fui.contextPath="${path }";
	fui.DataTree.prototype.dataField="data";//兼容改造
	
	/**
	 * 将yyyyMMddHHmmss格式化成yyyy-MM-dd HH:mm:ss
	 *
	 * @param e
	 *         grid列对象
	 */
	function formatDate(e){
		var dateString = e.value;
		if(typeof(dateString) != "undefined" && dateString.trim() != ""){
			var pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
			dateString = dateString.replace(pattern, "$1-$2-$3 $4:$5:$6");
		}
		return dateString;
	}
	/**
	 * 转换被JSON格式化后的日期
	 *
	 * @param e
	 *         grid列对象
	 */
	function formatJsonDate(e){
		var dateString = e.value;
		if(typeof(dateString) != "undefined" && dateString.toString().trim() != ""){
			dateString = fui.formatDate(new Date(dateString),"yyyy-MM-dd HH:mm:ss");
		}
		return dateString;
	}
	/**
	 * 日期转换（支持cst -6时区时间格式）
	 *
	 * @param val
	 *         要转换的日期值
	 * @param size
	 *         转换的日期格式
	 *			(支持8-yyyyMMdd、10-yyyy-MM-dd、14-yyyyMMddHHmmss、19-yyyy-MM-dd HH:mm:ss)
	 * @param iscst
	 *         是否是cst格式
	 *
	 */
	function formatterDate(val,size,iscst) {
		if (typeof(val) == "undefined" && val.trim() != "") {
			return "";
		}
		var date = new Date(val);
		if(!(iscst === false)){
			var localTime = date.getTime(); 
			var localOffset = date.getTimezoneOffset()*60000;
			var utc = localTime + localOffset;
			var offset = -6;
			var cst = utc + (3600000*offset);
			date = new Date(cst);
		}
		var formaterDataStr = "";
		var year = date.getFullYear();
		if (date.getFullYear() < 1900) {
			return "";
		}
		var month = date.getMonth() + 1;
		month = month < 10 ? "0" + month : month;
		var day = date.getDate();
		day = day < 10 ? ("0" + day) : day;
		var hours = date.getHours();
		hours = hours < 10 ? ("0" + hours) : hours;
		var minutes = date.getMinutes();
		minutes = minutes < 10 ? ("0" + minutes) : minutes;
		var seconds = date.getSeconds();
		seconds = seconds < 10 ? ("0" + seconds) : seconds;
		if(size == 8){
			formaterDataStr = year + "" + month + day;
		}else if(size == 10){
			formaterDataStr = year + "-" + month + "-" + day;
		}else if(size == 14){
			formaterDataStr = year + "" + month + day + hours + minutes + seconds;
		}else if(size == 19){
			formaterDataStr = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
		}
		return formaterDataStr;
	}
</script>