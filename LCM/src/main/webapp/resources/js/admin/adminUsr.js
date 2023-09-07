function getAdminUsr(){
	if($("#usrPg").val()==""){
		$("#usrPg").val("1");
	}
	
	var params = $("#adminUsrForm").serialize();
	$.ajax({
		type : "post",
		url : "/getAdminUsrAjax",
		data : params,
		success : function(rcvData){
			drawAdminUsr(rcvData.list, rcvData.pb, rcvData.auth.AUTH, rcvData.cnt);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function drawAdminUsr(list, pb, auth, cnt){
	var adminUsrCon = "";
	adminUsrCon += "<div class=\"adminUsrDiv\">";  
	adminUsrCon += "<div class=\"adminUsrConDiv\">";
	adminUsrCon += "<div class=\"adminUsrConDiv_title\">";
	adminUsrCon += "<div class=\"adminUsrConDiv_title_div\" style=\"width:40%\";\">닉네임</div>";
	adminUsrCon += "<div class=\"adminUsrConDiv_title_div\" style=\"width:15%\";\">권한</div>";
	adminUsrCon += "<div class=\"adminUsrConDiv_title_div\" style=\"width:15%\";\">권한 변경</div>";
	adminUsrCon += "<div class=\"adminUsrConDiv_title_div\" style=\"width:15%\";\">클랜장 위임</div>";
	adminUsrCon += "<div class=\"adminUsrConDiv_title_div\" style=\"width:15%\";\">추방</div>";
	adminUsrCon += "</div>";
	if(list.length==0){
		adminUsrCon += "<div class=\"adminUsrConDiv_con_div\" style=\"width:100%\";\">검색 결과가 존재하지 않습니다.</div>";
		for(var i=0; i<14; i++){
			adminUsrCon += "<div class=\"adminUsrConDiv_con_div\" style=\"width:100%\";\"></div>";
		}
	}
	else{
		for(var i=0; i<list.length; i++){
			adminUsrCon += "<div class=\"adminUsr_divHover\">";
			adminUsrCon += "<div class=\"adminUsrConDiv_con_div\" style=\"width:40%\";\">"+list[i].NICK+"</div>";
			adminUsrCon += "<div class=\"adminUsrConDiv_con_div\" style=\"width:15%\";\">"+list[i].AUTH+"</div>";
			if(auth==3){
				if(list[i].AUTH=="클랜장"){
					adminUsrCon += "<div class=\"adminUsrConDiv_con_div\" style=\"width:15%\";\"></div>";
					adminUsrCon += "<div class=\"adminUsrConDiv_con_div\" style=\"width:15%\";\"></div>";
					adminUsrCon += "<div class=\"adminUsrConDiv_con_div\" style=\"width:15%\";\"></div>";
				}
				else{
					adminUsrCon += "<div class=\"adminUsrConDiv_con_div\" style=\"width:15%\";\">";
					adminUsrCon += "<input type=\"button\" value=\"V\" class=\"usrAuthBtn\" name=\""+list[i].EMAIL+"\"/>";
					adminUsrCon += "</div>";
					adminUsrCon += "<div class=\"adminUsrConDiv_con_div\" style=\"width:15%\";\">";
					adminUsrCon += "<input type=\"button\" value=\"V\" class=\"usrDelBtn\" name=\""+list[i].EMAIL+"\"/>";
					adminUsrCon += "</div>";
					adminUsrCon += "<div class=\"adminUsrConDiv_con_div\" style=\"width:15%\";\">";
					adminUsrCon += "<input type=\"button\" value=\"V\" class=\"usrBanBtn\" name=\""+list[i].EMAIL+"\"/>";
					adminUsrCon += "</div>"; 
				}
			}
			else{
				adminUsrCon += "<div class=\"adminUsrConDiv_con_div\" style=\"width:15%\";\">-</div>";
				adminUsrCon += "<div class=\"adminUsrConDiv_con_div\" style=\"width:15%\";\">-</div>";
				adminUsrCon += "<div class=\"adminUsrConDiv_con_div\" style=\"width:15%\";\">-</div>";
			}
			adminUsrCon += "</div>"; 
		}
		for(var i=0; i<15-list.length; i++){
			adminUsrCon += "<div class=\"adminUsrConDiv_con_div\" style=\"width : 100%\";\"></div>";
		}
	}
	adminUsrCon += "</div>";
	adminUsrCon += "<div class=\"adminUsrBtnDiv\">";
	adminUsrCon += "<div class=\"adminUsr_btn\">";
	if($("#usrPg").val() == "1"){
		adminUsrCon += "<input type=\"button\" class =\"adminPgNBtn\"value=\"◀\"name=\"1\"/>";		
	}
	else{
		adminUsrCon += "<input type=\"button\" class =\"adminPgNBtn\"value=\"◀\"name=\"" + ($("#usrPg").val()*1-1)+"\" />";
	}	
	for(var i = pb.startPcount ; i<= pb.endPcount ; i++){
		if(i == $("#usrPg").val()){
			adminUsrCon += "<input type=\"button\" class =\"adminPgNBtn\" value=\""+ i + "\" disabled=\"disabled\" />";
		}
		else{
			adminUsrCon += "<input type=\"button\" class =\"adminPgNBtn\" value=\"" + i + "\"name=\"" + i + "\" />";
		}
	}
	if($("#usrPg").val() == pb.maxPcount){
		adminUsrCon += "<input type=\"button\" class =\"adminPgNBtn\"value=\"▶\" name=\"" + pb.maxPcount + "\" />";
	}
	else{
		adminUsrCon += "<input type=\"button\" class =\"adminPgNBtn\" value=\"▶\"name=\"" + ($("#usrPg").val()*1+1)+"\" />";
	}
	adminUsrCon += "</div>";
	adminUsrCon += "<div class=\"adminUsr_write\">";
	adminUsrCon += "&nbsp;총 인원 : " + cnt;
	adminUsrCon += "</div>";
	adminUsrCon += "<div class=\"adminUsr_searchDiv\">";
	adminUsrCon += "<input type=\"text\" id=\"adminUsr_search\" class=\"adminUsr_search\"/>&nbsp;&nbsp;";
	adminUsrCon += "<img class=\"adminUsr_searchBtn\" src=\"source/img/util/search.png\" alt=\"searchBtn\"/>";
	adminUsrCon += "</div>";
	adminUsrCon += "</div>";
	adminUsrCon += "</div>";
	$(".adminConDiv").html(adminUsrCon);
	
	if($("#usrNick").val()!=""){
		$("#adminUsr_search").val($("#usrNick").val());
	}
	
	$(".adminUsr_btn").on("click", "input", function(){
		$("#usrPg").val($(this).attr("name"));
		$("#adminUsrForm").attr("action","/admin/adminUsr");
		$("#adminUsrForm").submit();
	});
	
	$(".adminUsr_searchBtn").on("click", function(){
		$("#usrNick").val($("#adminUsr_search").val());
		$("#usrPg").val("1");
		$("#adminUsrForm").attr("action","/admin/adminUsr");
		$("#adminUsrForm").submit();
	});
	
	$("#adminUsr_search").on("keyup",function(key){
        if(key.keyCode==13) {
			$("#usrNick").val($("#adminUsr_search").val());
			$("#usrPg").val("1");
			$("#adminUsrForm").attr("action","/admin/adminUsr");
			$("#adminUsrForm").submit();
        }
    });

	$(".usrAuthBtn").on("click", function(){
		var chkUsrUpd = prompt("해당 회원의 권한을 변경하시겠습니까?\n'변경' 작성시 변경됩니다.");
	    if(chkUsrUpd.trim()=="변경"){
			$("#usrEmail").val($(this).attr("name"));
	    	updUsrAuth();
	    }
	    else{
	    	alert("문구를 오입력 하였습니다.");
	    }
	});
	
	$(".usrDelBtn").on("click", function(){
		var chkUsrUpd = prompt("해당 회원에게 클랜을 위임하시겠습니까?\n'위임' 작성시 위임됩니다.");
	    if(chkUsrUpd.trim()=="위임"){
			$("#usrEmail").val($(this).attr("name"));
	  		  updUsrDelAuth();
	    }
	    else{
	    	alert("문구를 오입력 하였습니다.");
	    }
	});
	
	$(".usrBanBtn").on("click", function(){
		var chkUsrUpd = prompt("해당 회원을 추방하시겠습니까?\n'추방' 작성시 추방됩니다.");
	    if(chkUsrUpd.trim()=="추방"){
			$("#usrEmail").val($(this).attr("name"));
	  		  updUsrBan();
	    }
	    else{
	    	alert("문구를 오입력 하였습니다.");
	    }
	});
}

function updUsrAuth(){
	var params = $("#adminUsrForm").serialize();
	$.ajax({
		type : "post",
		url : "/updUsrAuthAjax",
		data : params,
		success : function(rcvData){
			alert("변경되었습니다.");
			$("#adminUsrForm").attr("action","/admin/adminUsr");
			$("#adminUsrForm").submit();
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function updUsrDelAuth(){
	var params = $("#adminUsrForm").serialize();
	$.ajax({
		type : "post",
		url : "/updUsrDelAuthAjax",
		data : params,
		success : function(rcvData){
			alert("위임되었습니다.");
			$("#adminUsrForm").attr("action","/admin/adminUsr");
			$("#adminUsrForm").submit();
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function updUsrBan(){
	var params = $("#adminUsrForm").serialize();
	$.ajax({
		type : "post",
		url : "/updUsrBanAjax",
		data : params,
		success : function(rcvData){
			alert("추방되었습니다.");
			$("#adminUsrForm").attr("action","/admin/adminUsr");
			$("#adminUsrForm").submit();
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}