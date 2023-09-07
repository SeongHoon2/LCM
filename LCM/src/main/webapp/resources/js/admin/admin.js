function drawAdminMenu(){
	var adminHtml = "";
	adminHtml += "<button class=\"adminMenuBtn\" id=\"adminUsrBtn\">회원</button>&nbsp;&nbsp;";
	adminHtml += "<button class=\"adminMenuBtn\" id=\"adminWaitUsrBtn\">가입대기</button>&nbsp;&nbsp;";
	adminHtml += "<button class=\"adminMenuBtn\" id=\"adminNoticeBtn\">공지</button>&nbsp;&nbsp;";
	adminHtml += "<button class=\"adminMenuBtn\" id=\"adminLogoBtn\">로고</button>&nbsp;&nbsp;";
	adminHtml += "<button class=\"adminMenuBtn\" id=\"adminBoardBtn\">게시판</button>&nbsp;&nbsp;";
	adminHtml += "<button class=\"adminMenuBtn\" id=\"adminGameBtn\">경기</button>&nbsp;&nbsp;";
	adminHtml += "<button class=\"adminMenuBtn\" id=\"adminEloBtn\">ELO</button>";
	$(".adminMenuBtnDiv").html(adminHtml);

	var urlTxt = $(location).attr('pathname').trim().split("/")[2];
	$("#"+urlTxt+"Btn").removeClass("adminMenuBtn");
	$("#"+urlTxt+"Btn").addClass("adminMenuBtn_sel");
	
	$(".adminMenuBtn, .adminMenuBtn_sel").on("click", function(){
		var url = $(this).attr("id");
		url = url.replaceAll("Btn", "");
		url = "/admin/" + url;
		location.replace(url);
	});
}