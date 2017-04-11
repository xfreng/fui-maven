<%@page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>日历——展示数据操作</title>
<meta name="keywords" content="日程安排,日历,JSON,jquery">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/public/css/fc-main.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/public/css/fullcalendar.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/public/css/fancybox.css">
<style type="text/css">
#calendar{width:850px; margin:20px auto 10px auto}
.fancy{width:450px; height:auto}
.fancy h3{height:30px; line-height:30px; border-bottom:1px solid #d3d3d3; font-size:14px}
.fancy form{padding:10px}
.fancy p{height:28px; line-height:28px; padding:4px; color:#999}
.input{height:20px; line-height:20px; padding:2px; border:1px solid #d3d3d3; width:100px}
.select{padding:2px; border:1px solid #d3d3d3;}
.btn{-webkit-border-radius: 3px;-moz-border-radius:3px;padding:5px 12px; cursor:pointer}
.btn_ok{background: #360;border: 1px solid #390;color:#fff}
.btn_cancel{background:#f0f0f0;border: 1px solid #d3d3d3; color:#666 }
.btn_del{background:#f90;border: 1px solid #f80; color:#fff }
.sub_btn{height:32px; line-height:32px; padding-top:6px; border-top:1px solid #f0f0f0; text-align:right; position:relative}
.sub_btn .del{position:absolute; left:2px}
</style>
<script src='<%=request.getContextPath() %>/public/js/jquery-1.9.1.js'></script>
<script src='<%=request.getContextPath() %>/public/js/jquery-ui.js'></script>
<script src='<%=request.getContextPath() %>/public/js/jquery-ui.datepicker-zh-CN.js'></script>
<script src='<%=request.getContextPath() %>/public/js/fullcalendar.min.js'></script>
<script src='<%=request.getContextPath() %>/public/js/jquery.fancybox-1.3.1.pack.js'></script>
<script src='<%=request.getContextPath() %>/public/js/jquery.colorpicker.js'></script>
<script type="text/javascript">
$(function() {
	$('#calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		firstDay:0,
		height:400,
		selectable: true,
		select: function( startDate, endDate, allDay, jsEvent, view ){ 
		    var start =$.fullCalendar.formatDate(startDate,'yyyy-MM-dd'); 
		    var end =$.fullCalendar.formatDate(endDate,'yyyy-MM-dd'); 
		    $.fancybox({ 
		        'type':'ajax', 
		        'href':'<%=request.getContextPath() %>/eventopt?action=add&date='+start+'&end='+end 
		    }); 
		},
		editable: true,
		dragOpacity: {
	        agenda: .5, 
	        '': .6 
	    },
	    eventDrop: function(event,dayDelta,minuteDelta,allDay,revertFunc) { 
	        $.post("<%=request.getContextPath() %>/event?action=drag",{id:event.id,daydiff:dayDelta,minudiff:minuteDelta,allday:allDay},function(msg){ 
	            if(msg!=1){ 
	                alert(msg); 
	                revertFunc(); //恢复原状 
	            } 
	        }); 
	    },
	    eventResize: function(event,dayDelta,minuteDelta,revertFunc) {
	        $.post("<%=request.getContextPath() %>/event?action=resize",{id:event.id,daydiff:dayDelta,minudiff:minuteDelta},function(msg){ 
	            if(msg!=1){ 
	                alert(msg); 
	                revertFunc(); 
	            } 
	        }); 
	    },
	    events: '<%=request.getContextPath() %>/getCalendarJsonData',
		dayClick: function(date, allDay, jsEvent, view) {
			var selDate =$.fullCalendar.formatDate(date,'yyyy-MM-dd');
			$.fancybox({
				'type':'ajax',
				'href':'<%=request.getContextPath() %>/eventopt?action=add&date='+selDate
			});
    	},
    	eventClick: function(calEvent, jsEvent, view) {
            $.fancybox({
                'type':'ajax', 
                'href':'<%=request.getContextPath() %>/eventopt?action=edit&id='+calEvent.id
            }); 
        }
	});
	
});
</script>
</head>

<body>
	<div id="main" style="width:870px">
	   <div id='calendar'></div>
	</div>
</body>
</html>