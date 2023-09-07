function drawGameMenu(){
	var adminHtml = "";
	adminHtml += "<button class=\"gameMenuBtn\" id=\"gameInsBtn\">데이터 입력</button>&nbsp;&nbsp;";
	adminHtml += "<button class=\"gameMenuBtn\" id=\"gameMakeBtn\">경기 생성</button>";
	$(".gameMenuBtnDiv").html(adminHtml);

	var urlTxt = $(location).attr('pathname').trim().split("/")[2];
	$("#"+urlTxt+"Btn").removeClass("gameMenuBtn");
	$("#"+urlTxt+"Btn").addClass("gameMenuBtn_sel");
	
	$(".gameMenuBtn, .gameMenuBtn_sel").on("click", function(){
		var url = $(this).attr("id");
		url = url.replaceAll("Btn", "");
		url = "/game/" + url;
		location.replace(url);
	});
}