function drawDataMenu(){
	var adminHtml = "";
	adminHtml += "<button class=\"dataMenuBtn\" id=\"dataRecordBtn\">경기 기록</button>&nbsp;&nbsp;";
	adminHtml += "<button class=\"dataMenuBtn\" id=\"dataSearchBtn\">전적 검색</button>&nbsp;&nbsp;";
	adminHtml += "<button class=\"dataMenuBtn\" id=\"dataRankBtn\">Elo 랭킹</button>&nbsp;&nbsp;";
	$(".dataMenuBtnDiv").html(adminHtml);

	var urlTxt = $(location).attr('pathname').trim().split("/")[2];
	$("#"+urlTxt+"Btn").removeClass("dataMenuBtn");
	$("#"+urlTxt+"Btn").addClass("dataMenuBtn_sel");
	
	$(".dataMenuBtn, .dataMenuBtn_sel").on("click", function(){
		var url = $(this).attr("id");
		url = url.replaceAll("Btn", "");
		url = "/data/" + url;
		location.replace(url);
	});
}