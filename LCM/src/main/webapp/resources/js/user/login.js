function drawInitLogin(){
	var con = "";
	con += "<div class=\"content_loginDiv\">";
	con += "<div class=\"content_loginDiv_id\">";
	con += "<input type=\"text\" class=\"content_loginDiv_emailTxt\" id=\"emailTxt\" placeHolder=\"E-mail\" maxlength=\"50\"/>";
	con += "</div>";
	con += "<div class=\"content_loginDiv_pw\">";
	con += "<input type=\"password\" class=\"content_loginDiv_pwTxt\" id=\"pwTxt\" placeHolder=\"PW\" maxlength=\"20\"/>";
	con += "</div>";
	con += "<div class=\"content_loginDiv_btn\">";
	con += "<button class=\"content_loginDiv_LoginBtn\" id=\"loginBtn\">로그인</button>&nbsp;&nbsp;";
	con += "<button class=\"content_loginDiv_JoinBtn\" id=\"joinBtn\">회원가입</button>";
	con += "</div>";
	con += "<div class=\"content_loginDiv_find\">";
	con += "<button class=\"content_loginDiv_FindBtn\" id=\"findBtn\">비밀번호 찾기</button>";
	con += "</div>";
	con += "</div>";
	$(".contentWrapDiv").html(con);
	
	$("#emailTxt").focus();
	
	$("#loginBtn").on("click", function(){
		if($("#emailTxt").val().trim()==""){
			alert("E-mail을 입력하세요.");
			$("#emailTxt").focus();		
		}
		else if($("#pwTxt").val().trim()==""){
			alert("PW를 입력하세요.");
			$("#pwTxt").focus();
		}
		else{
			$("#email").val($("#emailTxt").val());
			$("#pw").val($("#pwTxt").val());
			login();
		}
	});
	
    $("#emailTxt, #pwTxt").on("keyup",function(key){
        if(key.keyCode==13) {
    		if($("#emailTxt").val().trim()==""){
    			alert("E-mail을 입력하세요.");
    			$("#emailTxt").focus();
    		}
    		else if($("#pwTxt").val().trim()==""){
    			alert("PW를 입력하세요.");
    			$("#pwTxt").focus();
    		}
    		else{
    			$("#email").val($("#emailTxt").val());
    			$("#pw").val($("#pwTxt").val());
    			login();
    		}
        }
    });
	
	$("#joinBtn").on("click", function(){
		drawJoinFrame();
	});
	
	$("#findBtn").on("click", function(){
		drawFindFrame();
	});
}

function login(){
	var params = $("#loginForm").serialize(); 
	$.ajax({
		type : "post",
		url : "/loginAjax",
		dataType : "json",
		data : params,
		success : function(rcvData){
			if(rcvData.result=="success"){
				location.replace("/home/home");
			}
			else if(rcvData.result=="email_auth"){
				drawAuthFrame();
			}
			else{
				alert("아이디 또는 비밀번호가 일치하지 않습니다.");
			}
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function drawJoinFrame(){
	var email_rule =  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
	var con = "";
	con += "<div class=\"content_formDiv_term\">";
	con += "</div>";
	con += "<div class=\"content_formDiv_chk\">";
	con += "<input type=\"checkBox\" class=\"termChkBtn\" id=\"termChkBtn\"/>&nbsp;";
	con += "상기 이용약관 및 개인정보 처리방침에 동의합니다.";
	con += "</div>";
	con += "<div class=\"content_formDiv\">";
    con += "<div class=\"content_formDiv_id\">";
	con += "<input type=\"text\" class=\"content_formDiv_emailTxt\" id=\"emailTxt\" placeHolder=\"E-mail\" maxlength=\"50\"/>";
    con += "</div>"; 
    con += "<div class=\"content_formDiv_pw\">";
    con += "<input type=\"password\" class=\"content_formDiv_pwTxt\" id=\"pwTxt\" placeHolder=\"PW\" maxlength=\"16\"/>";
    con += "</div>"; 
	con += "<div class=\"content_formDiv_btn\">";
	con += "<button class=\"content_formDiv_joinBtn\" id=\"joinBtn\">가입하기</button>&nbsp;&nbsp;";
	con += "<button class=\"content_formDiv_backBtn\" id=\"backBtn\">뒤로가기</button>";
	con += "</div>";
	con += "</div>";
	$(".contentWrapDiv").html(con);
	drawJoinTerm();
	
	$("#emailTxt").focus();
	
	
	$("#joinBtn").on("click", function(){
	    if($("#emailTxt").val().trim()==""){
			alert("E-mail을 입력하세요.");
			$("#emailTxt").focus();		
		}
		else if(!email_rule.test($("#emailTxt").val().trim())){
			alert("E-mail을 형식에 맞게 입력하세요.");
			$("#emailTxt").focus();
		}
		else if($("#pwTxt").val().trim()==""){
			alert("PW를 입력하세요.");
			$("#pwTxt").focus();
		}
		else if($("#pwTxt").val().trim().length<8){
			alert("비밀번호는 8~16자리 입니다.");
			$("#pwTxt").focus();
		}
		else if(!$("#termChkBtn").is(":checked")){
			alert("약관에 동의하여야 가입이 가능합니다.");
		}
		else{
			$("#joinForm_email").val($("#emailTxt").val());
			$("#joinForm_pw").val($("#pwTxt").val());
		    var result = confirm('해당 정보로 가입하시겠습니까?');
        	if(result) {
				join();
        	}
		}
	});
	
	$("#backBtn").on("click", function(){
	    var result = confirm('로그인 페이지로 돌아가시겠습니까?');
        if(result) {
            location.replace("/user/login");
        }
	});
}

function join(){
	var params = $("#joinForm").serialize(); 
	$.ajax({
		type : "post",
		url : "/joinAjax",
		dataType : "json",
		data : params,
		success : function(rcvData){
			if(rcvData.result=="success"){
				alert("가입이 완료되었습니다.");
				location.replace("/user/login");
			}
			else if(rcvData.result=="fail_duplicate"){
				alert("이미 가입된 이메일입니다.");
			}
			else if(rcvData.result=="fail_withdraw"){
				alert("가입 불가능한 이메일입니다.");
			}
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});	
}

function drawFindFrame(){
	var email_rule =  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
	var con = "";
	con += "<div class=\"content_findDiv\">";
    con += "<div class=\"content_findDiv_id\">";
	con += "<input type=\"text\" class=\"content_findDiv_emailTxt\" id=\"emailTxt\" placeHolder=\"LCM 가입 이메일을 입력해주세요.\" maxlength=\"50\"/>";
    con += "</div>"; 
	con += "<div class=\"content_findDiv_btn\">";
	con += "<button class=\"content_findDiv_findBtn\" id=\"findBtn\">찾기</button>&nbsp;&nbsp;";
	con += "<button class=\"content_findDiv_backBtn\" id=\"backBtn\">뒤로가기</button>";
	con += "</div>";
	con += "</div>";
	$(".contentWrapDiv").html(con);
	
	$("#emailTxt").focus();
	
	$("#findBtn").on("click", function(){
	    if($("#emailTxt").val().trim()==""){
			alert("E-mail을 입력하세요.");
			$("#emailTxt").focus();		
		}
		else if(!email_rule.test($("#emailTxt").val().trim())){
			alert("E-mail을 형식에 맞게 입력하세요.");
			$("#emailTxt").focus();
		}
		else{
			$("#findForm_email").val($("#emailTxt").val());
		    var result = confirm('해당 이메일로 가입된 계정의 비밀번호를 찾으시겠습니까?');
        	if(result) {
				find();
        	}
		}
	});
	
	$("#emailTxt").on("keyup",function(key){
        if(key.keyCode==13) {
        	if($("#emailTxt").val().trim()==""){
				alert("E-mail을 입력하세요.");
				$("#emailTxt").focus();		
			}
			else if(!email_rule.test($("#emailTxt").val().trim())){
				alert("E-mail을 형식에 맞게 입력하세요.");
				$("#emailTxt").focus();
			}
			else{
				$("#findForm_email").val($("#emailTxt").val());
			    var result = confirm('해당 이메일로 가입된 계정의 비밀번호를 찾으시겠습니까?');
	        	if(result) {
					find();
	        	}
			}
        }
    });
	
	$("#backBtn").on("click", function(){
	    var result = confirm('로그인 페이지로 돌아가시겠습니까?');
        if(result) {
            location.replace("/user/login");
        }
	});
}

function find(){
	var params = $("#findForm").serialize(); 
	$.ajax({
		type : "post",
		url : "/findAjax",
		dataType : "json",
		data : params,
		success : function(rcvData){
			if(rcvData.result=="success"){
				alert("해당 이메일로 변경된 비밀번호가 전송되었습니다.");
				location.replace("/user/login");
			}
			else{
				alert("존재하지 않는 이메일입니다.");
			}
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function drawAuthFrame(){
	$("#authForm_email").val($("#email").val());
	$("#authForm_auth").val("");
	
	var con = "";
	con += "<div class=\"content_authDiv\">";
    con += "<div class=\"content_authDiv_auth\">";
	con += "<input type=\"text\" class=\"content_authDiv_emailAuthTxt\" id=\"emailAuthTxt\" placeHolder=\"이메일의 인증번호를 입력해주세요.\" maxlength=\"12\"/>";
    con += "</div>"; 
	con += "<div class=\"content_authDiv_btn\">";
	con += "<button class=\"content_authDiv_authBtn\" id=\"authBtn\">인증</button>&nbsp;&nbsp;";
	con += "<button class=\"content_authDiv_backBtn\" id=\"backBtn\">뒤로가기</button>";
	con += "</div>";
	con += "</div>";
	$(".contentWrapDiv").html(con);
	
	$("#emailAuthTxt").focus();
		
	$("#backBtn").on("click", function(){
	    var result = confirm('로그인 페이지로 돌아가시겠습니까?');
        if(result) {
            location.replace("/user/login");
        }
	});
		
	$("#authBtn").on("click", function(){
	    if($("#emailAuthTxt").val().trim()==""){
			alert("인증번호를 입력하세요.");
			$("#emailAuthTxt").focus();		
		}
		else{
			$("#authForm_auth").val($("#emailAuthTxt").val());
			authEmail();
		}
	});
	
	$("#emailAuthTxt").on("keyup",function(key){
        if(key.keyCode==13) {
	    if($("#emailAuthTxt").val().trim()==""){
			alert("인증번호를 입력하세요.");
			$("#emailAuthTxt").focus();		
		}
		else{
			$("#authForm_auth").val($("#emailAuthTxt").val());
			authEmail();
		}
        }
    });
}

function authEmail(){
	var params = $("#authForm").serialize(); 
	$.ajax({
		type : "post",
		url : "/authEmailAjax",
		dataType : "json",
		data : params,
		success : function(rcvData){
			if(rcvData.result=="success"){
				alert("인증이 완료되었습니다.");
				location.replace("/home/home");
			}
			else{
				alert("인증번호가 틀립니다.");
			}
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}