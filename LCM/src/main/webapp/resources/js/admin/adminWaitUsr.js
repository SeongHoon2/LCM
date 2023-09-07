function getAdminWaitUsr(){
	if($("#pg").val()==""){
		$("#pg").val("1");
	}
	
	var params = $("#adminWaitUsrForm").serialize();
	$.ajax({
		type : "post",
		url : "/getAdminWaitUsrAjax",
		data : params,
		success : function(rcvData){
			drawAdminWaitUsr(rcvData.list, rcvData.pb);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function drawAdminWaitUsr(list, pb){
	var adminWaitUsrCon = "";
	adminWaitUsrCon += "<div class=\"adminWaitUsrDiv\">";  
	adminWaitUsrCon += "<div class=\"adminWaitUsrConDiv\">";
	adminWaitUsrCon += "<div class=\"adminWaitUsrConDiv_title\">";
	adminWaitUsrCon += "<div class=\"adminWaitUsrConDiv_title_div\" style=\"width:70%\";\">닉네임</div>";
	adminWaitUsrCon += "<div class=\"adminWaitUsrConDiv_title_div\" style=\"width:15%\";\">승인</div>";
	adminWaitUsrCon += "<div class=\"adminWaitUsrConDiv_title_div\" style=\"width:15%\";\">반려</div>";
	adminWaitUsrCon += "</div>";
	if(list.length==0){
		adminWaitUsrCon += "<div class=\"adminWaitUsrConDiv_con_div\" style=\"width:100%\";\">가입 대기인원이 존재하지 않습니다.</div>";
		for(var i=0; i<14; i++){
			adminWaitUsrCon += "<div class=\"adminWaitUsrConDiv_con_div\" style=\"width:100%\";\"></div>";
		}
	}
	else{
		for(var i=0; i<list.length; i++){
			adminWaitUsrCon += "<div class=\"adminWaitUsr_divHover\">";
			adminWaitUsrCon += "<div class=\"adminWaitUsrConDiv_con_div\" style=\"width:70%\";\">"+list[i].NICK+"</div>";
			adminWaitUsrCon += "<div class=\"adminWaitUsrConDiv_con_div\" style=\"width:15%\";\">";
			adminWaitUsrCon += "<input type=\"button\" value=\"V\" class=\"waitUsrSucBtn\" name=\""+list[i].EMAIL+"\"/>";
			adminWaitUsrCon += "</div>";
			adminWaitUsrCon += "<div class=\"adminWaitUsrConDiv_con_div\" style=\"width:15%\";\">";
			adminWaitUsrCon += "<input type=\"button\" value=\"V\" class=\"waitUsrFaiBtn\" name=\""+list[i].EMAIL+"\"/>";
			adminWaitUsrCon += "</div>";
			adminWaitUsrCon += "</div>"; 
		}
		for(var i=0; i<15-list.length; i++){
			adminWaitUsrCon += "<div class=\"adminWaitUsrConDiv_con_div\" style=\"width : 100%\";\"></div>";
		}
	}
	adminWaitUsrCon += "</div>";
	adminWaitUsrCon += "<div class=\"adminWaitUsrBtnDiv\">";
	if($("#pg").val() == "1"){
		adminWaitUsrCon += "<input type=\"button\" class =\"waitUsrPgNBtn\"value=\"◀\"name=\"1\"/>";		
	}
	else{
		adminWaitUsrCon += "<input type=\"button\" class =\"waitUsrPgNBtn\"value=\"◀\"name=\"" + ($("#pg").val()*1-1)+"\" />";
	}	
	for(var i = pb.startPcount ; i<= pb.endPcount ; i++){
		if(i == $("#pg").val()){
			adminWaitUsrCon += "<input type=\"button\" class =\"waitUsrPgNBtn\" value=\""+ i + "\" disabled=\"disabled\" />";
		}
		else{
			adminWaitUsrCon += "<input type=\"button\" class =\"waitUsrPgNBtn\" value=\"" + i + "\"name=\"" + i + "\" />";
		}
	}
	if($("#pg").val() == pb.maxPcount){
		adminWaitUsrCon += "<input type=\"button\" class =\"waitUsrPgNBtn\"value=\"▶\" name=\"" + pb.maxPcount + "\" />";
	}
	else{
		adminWaitUsrCon += "<input type=\"button\" class =\"waitUsrPgNBtn\" value=\"▶\"name=\"" + ($("#pg").val()*1+1)+"\" />";
	}
	adminWaitUsrCon += "</div>";
	adminWaitUsrCon += "</div>";
	$(".adminConDiv").html(adminWaitUsrCon);
	
	$(".adminWaitUsrBtnDiv").on("click", "input", function(){
		$("#pg").val($(this).attr("name"));
		$("#adminWaitUsrForm").attr("action","/admin/adminWaitUsr");
		$("#adminWaitUsrForm").submit();
	});

	$(".waitUsrSucBtn").on("click", function(){
		var confirmChk = confirm('가입을 승인하시겠습니까?');
	    if(confirmChk) {
			$("#joinEmail").val($(this).attr("name"));
			agreeClanJoin();
	    }
	});	

	$(".waitUsrFaiBtn").on("click", function(){
		var confirmChk = confirm('가입을 반려하시겠습니까?');
	    if(confirmChk) {
			$("#joinEmail").val($(this).attr("name"));
			disagreeClanJoin();
	    }
	});	
}

function agreeClanJoin(){
	var params = $("#adminWaitUsrForm").serialize();
	$.ajax({
		type : "post",
		url : "/agreeClanJoinAjax",
		data : params,
		success : function(rcvData){
			alert("승인되었습니다.");
			$("#pg").val("1");
			$("#adminWaitUsrForm").attr("action","/admin/adminWaitUsr");
			$("#adminWaitUsrForm").submit();
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function disagreeClanJoin(){
	var params = $("#adminWaitUsrForm").serialize();
	$.ajax({
		type : "post",
		url : "/disagreeClanJoinAjax",
		data : params,
		success : function(rcvData){
			alert("반려되었습니다.");
			$("#pg").val("1");
			$("#adminWaitUsrForm").attr("action","/admin/adminWaitUsr");
			$("#adminWaitUsrForm").submit();
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

