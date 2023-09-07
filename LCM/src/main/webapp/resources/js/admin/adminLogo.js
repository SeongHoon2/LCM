function getAdminLogo(){
	if($("#pg").val()==""){
		$("#pg").val("1");
	}
	
	$.ajax({
		type : "post",
		url : "/getAdminLogoAjax",
		success : function(rcvData){
			drawAdminLogo(rcvData.data.IMG);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function drawAdminLogo(img){
	var adminLogoDiv = "";
	adminLogoDiv += "<div class=\"adminLogoDiv\">";
	adminLogoDiv += "<div class=\"adminLogo_conDiv\">";
	adminLogoDiv += "<div class=\"adminLogo_topDiv\">대표 이미지";
	adminLogoDiv += "</div>";
	adminLogoDiv += "<div class=\"adminLogo_midDiv\">";
	if(img == "NOIMG"){
		adminLogoDiv += "<img alt=\"clanLogo\" src=\"source/img/clan/noImg.png\"/>";
	}
	else{
		adminLogoDiv += "<img alt=\"clanLogo\" src=\"source/img/clan/"+img+".png\"/>";
	}
	adminLogoDiv += "</div>";
	adminLogoDiv += "<div class=\"adminLogo_botDiv\">";
	adminLogoDiv += "<input type=\"button\" value=\"신규 등록\" class=\"admin_logo_addBtn\" id=\"admin_logo_addBtn\"/>&nbsp;&nbsp;";
	adminLogoDiv += "<input type=\"button\" value=\"기본 이미지\" class=\"admin_logo_addBtn\" id=\"admin_logo_basBtn\"/>";
	adminLogoDiv += "</div>";
	adminLogoDiv += "</div>";
	adminLogoDiv += "</div>";
	adminLogoDiv += "<div class=\"adminConDiv_logoHist\">";
	adminLogoDiv += "</div>";
	$(".adminConDiv").html(adminLogoDiv);
	
	getClanLogoHist();
	
	$("#admin_logo_basBtn").on("click", function(){
		var confirmChk = confirm('기본 이미지로 변경하시겠습니까?');
	    if(confirmChk) {
			updBaseLogo();
	    }
	});
	
	$("#admin_logo_addBtn").on("click", function(){
		$("#file").trigger("click");
	});
	
	$("#file").on("change", function(){
		var updLogoFlg = $(this).val();
		updLogoFlg = updLogoFlg.substring(updLogoFlg.lastIndexOf(".")+1);
		if(updLogoFlg=="png"){
			var maxSize = 5 * 1024 * 1024; // 5MB
			var fileSize = $("#file")[0].files[0].size;
			if(fileSize > maxSize){
				alert("이미지 용량은 5MB 이내로 등록 가능합니다.");
				$("#file").val("");
			}
			else{
				var time = new Date().getTime();
				$("#adminLogoTxt").val("_"+time);
				newBaseLogo();
			}
		}
		else{
			alert("png형식만 가능합니다.");
			$("#file").val("");
		}
	});
}

function updBaseLogo(){
	$.ajax({
		type : "post",
		url : "/updBaseLogoAjax",
		success : function(rcvData){
			alert("로고 변경이 완료되었습니다.");
			location.replace("/admin/adminLogo");
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function newBaseLogo(formData){
	var form = $('#adminLogoForm')[0];
	var formData = new FormData(form);
    $.ajax({
   		type : "post",
   		url  : "/newBaseLogoAjax",
   		processData: false,
        contentType: false,
        data: formData,
   		success : function(){
   			alert("로고 변경이 완료되었습니다.");
			location.replace("/admin/adminLogo");
   		},
   		error : function(request, status, error){
   			alert("Error");
   			console.log("status : " + request.status);
   			console.log("text : " + request.responseText);
   			console.log("error : " + error);
   		}
   	});
}

function getClanLogoHist(){
	var params = $("#adminLogoHistForm").serialize();
	$.ajax({
		type : "post",
		url : "/getClanLogoHistAjax",
		data : params,
		success : function(rcvData){
			drawClanLogoHist(rcvData.list, rcvData.pb);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function drawClanLogoHist(list, pb){
	var adminClanLogoHist = "";
	adminClanLogoHist += "<div class=\"adminLogoHistDiv\">";  
	adminClanLogoHist += "<div class=\"adminLogoHistDiv_t\">대표 이미지 변경 기록";  
	adminClanLogoHist += "</div>";
	adminClanLogoHist += "<div class=\"adminLogoHistConDiv\">";
	adminClanLogoHist += "<div class=\"adminLogoHistConDiv_title\">";
	adminClanLogoHist += "<div class=\"adminLogoHistConDiv_title_div\" style=\"width:40%\";\">닉네임</div>";
	adminClanLogoHist += "<div class=\"adminLogoHistConDiv_title_div\" style=\"width:20%\";\">일자</div>";
	adminClanLogoHist += "<div class=\"adminLogoHistConDiv_title_div\" style=\"width:40%\";\">비고</div>";
	adminClanLogoHist += "</div>";
	if(list.length==0){
		adminClanLogoHist += "<div class=\"adminLogoHistConDiv_con_div\" style=\"width:100%\";\">변경 이력이 존재하지 않습니다.</div>";
		for(var i=0; i<8; i++){
			adminClanLogoHist += "<div class=\"adminLogoHistConDiv_con_div\" style=\"width:100%\";\"></div>";
		}
	}
	else{
		for(var i=0; i<list.length; i++){
			adminClanLogoHist += "<div class=\"adminLogoHist_divHover\">";
			adminClanLogoHist += "<div class=\"adminLogoHistConDiv_con_div\" style=\"width:40%\";\">"+list[i].NICK+"</div>";
			adminClanLogoHist += "<div class=\"adminLogoHistConDiv_con_div\" style=\"width:20%\";\">"+list[i].WDATE+"</div>";
			adminClanLogoHist += "<div class=\"adminLogoHistConDiv_con_div\" style=\"width:40%\";\">"+list[i].DOC+"</div>";
			adminClanLogoHist += "</div>"; 
		}
		for(var i=0; i<9-list.length; i++){
			adminClanLogoHist += "<div class=\"adminLogoHistConDiv_con_div\" style=\"width : 100%\";\"></div>";
		}
	}
	adminClanLogoHist += "</div>";
	
	adminClanLogoHist += "<div class=\"adminLogoHistBtnDiv\">";
	if($("#pg").val() == "1"){
		adminClanLogoHist += "<input type=\"button\" class =\"clanlogoHistPgNbtn\"value=\"◀\"name=\"1\"/>";		
	}
	else{
		adminClanLogoHist += "<input type=\"button\" class =\"clanlogoHistPgNbtn\"value=\"◀\"name=\"" + ($("#pg").val()*1-1)+"\" />";
	}	
	for(var i = pb.startPcount ; i<= pb.endPcount ; i++){
		if(i == $("#pg").val()){
			adminClanLogoHist += "<input type=\"button\" class =\"clanlogoHistPgNbtn\" value=\""+ i + "\" disabled=\"disabled\" />";
		}
		else{
			adminClanLogoHist += "<input type=\"button\" class =\"clanlogoHistPgNbtn\" value=\"" + i + "\"name=\"" + i + "\" />";
		}
	}
	if($("#pg").val() == pb.maxPcount){
		adminClanLogoHist += "<input type=\"button\" class =\"clanlogoHistPgNbtn\"value=\"▶\" name=\"" + pb.maxPcount + "\" />";
	}
	else{
		adminClanLogoHist += "<input type=\"button\" class =\"clanlogoHistPgNbtn\" value=\"▶\"name=\"" + ($("#pg").val()*1+1)+"\" />";
	}
	adminClanLogoHist += "</div>";
	adminClanLogoHist += "</div>";
	$(".adminConDiv_logoHist").html(adminClanLogoHist);
	
	$(".adminLogoHistBtnDiv").on("click", "input", function(){
		$("#pg").val($(this).attr("name"));
		getClanLogoHist();
	});
}