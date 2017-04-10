<%@page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>制药MES产品研发[运行环境]登录界面</title>
	<%@include file="/WEB-INF/jsp/include/fui-common.jsp"%>
</head>
<body class="background">
	<div class="login_body">
      	<form id="loginForm" class="fui-form" method="post">
	    	<div><img src="${path }/public/mainframe/images/login/login-logo-black.png" width="176px" height="45px" class="pos_rel l_186 t_-31"></div>
	        <div class="mg_0_auto w_510 pos_rel l_255">
	            <div style="text-align: center;">
	               	<span style="font-weight:bold;font-size:20px">制药MES产品研发</span>
	                <span style="font-size:12px">运行环境</span>
	            </div>
	            <div class="clear"></div>
	            <div class="login" style="padding:0px 0px 30px 0px;">
	                <div class="login_box">
	                    <div class="box">
	                        <div class="text f_l mg_t_21">
	                            <div class="f_l"><img src="${path }/public/mainframe/images/login/user.png" class="mg_l_19 mg_r_10" /></div>
	                            <div class="box_con f_l">
	                                <input class="fui-textbox" id="ename" name="ename" requiredErrorText="请输入用户帐号..." style="width:100%;" onenter="login()" required="true"/>
	                            </div>
	                        </div>
	                        <div class="clear"></div>
	                        <div class="text f_l mg_t_21">
	                            <div class="f_l"><img src="${path }/public/mainframe/images/login/password.png" class="mg_l_20 mg_r_10" style="margin-left:22px;" /></div>
	                            <div class="box_con f_l">
	                        		<input class="fui-password" id="upass" name="upass" requiredErrorText="请输入密码..." style="width:100%;" onenter="login()" required="true"/>
	                            </div>
	                        </div>
	                        <div class="clear"></div>
		                    <div class="icon_rand">
								<div class="text f_l mg_t_21">
		                            <div class="f_l"><img src="${path }/public/mainframe/images/login/rand.png" class="mg_l_20 mg_r_10" /></div>
		                            <div class="box_con f_l">
		                                <input class="fui-textbox" id="rand" name="rand" requiredErrorText="请输入验证码..." style="width:100%;" onenter="login()" required="true"/>
		                            </div>
		                            <img title="单击更换验证码" src="${path }/image" class="f_r color_8a8a8a mg_r_rand" onclick="loadimage(this)" />
		                        </div>
		                    </div>
		                    <div class="clear"></div>
		                    <div class="a_c">
		                        <a href="javascript:void(0)" class="login_btn" onclick="login()" onenter="login()">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</a>
		                    </div>
	                    </div>
	                </div>
	            </div>
      		</div>
      	</form>
    </div>
</body>
<script type="text/javascript">
	fui.parse();
	var form = new fui.Form("#loginForm");
	focusInput("uname");
	
	function focusInput(id) {
        var el = document.getElementById(id);
        if (el) el.focus();
    }
	
	function login(){
        form.validate();
        if (form.isValid() == false) return;
        var data = fui.encode(form.getData());
        var messageid = fui.loading("登录中，马上进入系统...", "提示信息");
        $.ajax({
            url: fui.contextPath + "/login",
            type: "post",
            data:  {submitData:data},
            success: function (text) {
            	text = fui.decode(text);
                var state = text.state;
                if(state == "1"){
                	window.location.href = fui.contextPath+"/"+text.toIndexURL;
                }else{
                	fui.alert(text.message);
                }
                fui.hideMessageBox(messageid);
            }
        });
	}
    
    function loadimage(e){
    	e.src = fui.contextPath + "/image?"+Math.random();
    }
</script>
</html>