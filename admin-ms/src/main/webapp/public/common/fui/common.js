function reload(){
	window.location.reload();
}
function help(msg){
	alert('欢迎使用'+msg);
}

function to(url){
	window.location.href=url;
}
function back(){
	history.go(-1);
}
function save(url){
	alert('保存成功！');
	to(url);
}
function add(url){
	alert('新建成功！');
	to(url);
}
var timerObj="";
function setCurTime(objID,color){
	if(objID){
		timerObj=objID;
		var now=new Date();
		var year=now.getFullYear();
		var month=now.getMonth()+1;
		var date=now.getDate();
		var day=now.getDay();
		var hours=now.getHours();
		var minutes=now.getMinutes();
		var seconds=now.getSeconds();
		
		if(month<10) month="0"+month;
		if(date<10) date="0"+date;
		if(hours<10) hours="0"+hours;
		if(minutes<10) minutes="0"+minutes;
		if(seconds<10) seconds="0"+seconds;
		var arr_week=new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
		week=arr_week[day];
		var timeString="";
		timeString=year+"年"+month+"月"+date+"日 "+week+" "+hours+":"+minutes+":"+seconds;
		var oCtl = document.getElementById(timerObj);
		if(color != ""){
			oCtl.innerHTML = "<font color='blue'>"+timeString+"</font>";
		}else{
			oCtl.innerHTML = timeString;
		}
		setTimeout("setCurTime('"+timerObj+"','"+color+"');", 1000);
	}
}
function setCurTimeTop(objID){
	if(objID){
		timerObj=objID;
		var now=new Date();
		var year=now.getFullYear();
		var month=now.getMonth()+1;
		var date=now.getDate();
		var day=now.getDay();
		
		if(date<10) date="0"+date;
		var arr_week=new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
		week=arr_week[day];
		var timeString="";
		timeString=year+"年"+month+"月"+date+"日 "+" "+week;
		var oCtl = document.getElementById(timerObj);
		oCtl.innerHTML = timeString;
	}
}
function selectAllOrNot(flag){
	var myselect=document.getElementsByTagName("input");
	if(flag=="true"){
		for(var i=0;i<myselect.length;i++){
			if(myselect[i].type=="checkbox"){
				myselect[i].checked=true;
			}
		}
	}else if(flag=="false"){
		for(var i=0;i<myselect.length;i++){
			if(myselect[i].type=="checkbox"){
				myselect[i].checked=false;
			}
		}
	}
}
var count=1;
function selectAllOrNotNoFlag(){
	var myselect=document.getElementsByTagName("input");
	for(var i=0;i<myselect.length;i++){
		var itemElement=myselect[i];
		if(itemElement.type=="checkbox"){
			if(count%2==0){
				itemElement.checked=false;
			}else{
				itemElement.checked=true;
			}
		}
	}
	count++;
}