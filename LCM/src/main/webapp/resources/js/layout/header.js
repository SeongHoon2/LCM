function checkLogin(){
	$.ajax({
		type : "post",
		url : "/checkSessionAjax",
		success : function(rcvData){
			if(rcvData.result=="success"){
				drawLogout();
			}
			else{
				drawLogin();
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

function drawLogout(){
	var con = "";
	con += "<button type=\"button\" class=\"loginBtn\" onclick=\"location.replace(\'/user/mypageInfo\');\">내정보</button>";
	con += "<button type=\"button\" class=\"loginBtn\" onclick=\"logout();\">로그아웃</button>";
	$(".loginDiv").html(con);
}

function drawLogin(){
	var con = "";
	con += "<button type=\"button\" class=\"loginBtn\" onclick=\"location.replace(\'/user/login\');\">로그인</button>";
	$(".loginDiv").html(con);
}

function logout(){
	$.ajax({
		type : "post",
		url : "/logoutAjax",
		success : function(){
			location.replace("/home/home");
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}