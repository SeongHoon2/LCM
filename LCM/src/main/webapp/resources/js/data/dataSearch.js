function chkSearch(){
	var params = $("#dataSearchForm").serialize();
	$.ajax({
		type : "post",
		url : "/chkSearchAjax",
		data : params,
		success : function(rcvData){
			if(rcvData.result=="pass"){
				$("#gamePg").val("1");
				$("#totalBtn").addClass("dataSubMenuBtn_select");
				$("#dataBtn").removeClass("dataSubMenuBtn_select");
				$(".dataSearch_con_blank").css("display","none");
				$(".dataSearch_con_data").css("display","none");
				$(".dataSearch_con_total").css("display","block");
				$(".dataSearch_menu").css("display","block");
				drawInitSearch(rcvData);
				getSearchGameData();
			}
			else if(rcvData.result=="fail_noUsr"){
				alert("존재하지 않는 사용자입니다.");
			}
			else{
				alert("전적이 존재하지 않습니다.");
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

function drawInitSearch(data){
	var con = "";
	con += "<div class=\"totalDiv_left_top_id\">";
	con += data.info.NICK
	con += "</div>";
	con += "<div class=\"totalDiv_left_top_elo\">";
	con += "Elo : "+data.info.ELO+" / 주라인 : "+data.info.LINE
	con += "</div>";
	con += "<div class=\"totalDiv_left_top_totWrate\">";
	if(data.TOT!=null){
		con += "승률 (전체) : " + data.TOT.WRATE+"% ("+data.TOT.TOT+"전 "+data.TOT.W+"승 "+data.TOT.D+"패)";
	}
	else{
		con += "승률 (전체) : -";
	}
	con += "</div>";
	con += "<div class=\"totalDiv_left_top_mainWrate\">";
	if(data.DAT_M!=null){
		con += "승률 (정기) : " + data.DAT_M.WRATE+"% ("+data.DAT_M.TOT+"전 "+data.DAT_M.W+"승 "+data.DAT_M.D+"패)";
	}
	else{
		con += "승률 (정기) : -";
	}
	con += "</div>";
	con += "<div class=\"totalDiv_left_top_subWrate\">";
		if(data.DAT_S!=null){
		con += "승률 (수시) : " + data.DAT_S.WRATE+"% ("+data.DAT_S.TOT+"전 "+data.DAT_S.W+"승 "+data.DAT_S.D+"패)";
	}
	else{
		con += "승률 (수시) : -";
	}
	con += "</div>";
	$(".totalDiv_left_top").html(con);
	
	var champCon = "";
	for(var i=0; i<data.list.length; i++){
		champCon += "<div class=\"totalDiv_left_bot_hang\">";
		champCon += "<div class=\"totalDiv_left_bot_l\">";
		champCon += "<img alt=\"champ\" src=\"source/img/champ/"+data.list[i].CHAMP+".png\">";
		champCon += "</div>";
		champCon += "<div class=\"totalDiv_left_bot_m\">";
		champCon += "<div class=\"totalDiv_left_bot_m_top\">";
		champCon += "<span style=\"font-size : 11px; font-weight : bold;\">KDA </span>";
		champCon += "<span style=\"font-size : 18px; font-weight : bold;\">"+data.list[i].KDA.toFixed(2)+"</span>";
		champCon += "</div>";
		champCon += "<div class=\"totalDiv_left_bot_m_bot\">";
		champCon += data.list[i].K+" / "+data.list[i].D+" / "+data.list[i].A;
		champCon += "</div>";
		champCon += "</div>";
		champCon += "<div class=\"totalDiv_left_bot_r\">";
		champCon += "<div class=\"totalDiv_left_bot_r_top\">";
		champCon += data.list[i].WIN_RATE+"%";
		champCon += "</div>";
		champCon += "<div class=\"totalDiv_left_bot_r_bot\">";
		champCon += data.list[i].GAME_CNT+"전 "+data.list[i].WIN+"승 "+data.list[i].DEF+"패";
		champCon += "</div>";
		champCon += "</div>";
		champCon += "</div>";
	}
	$(".totalDiv_left_bot").html(champCon);
}

function getSearchGameData(){
	var params = $("#dataSearchForm").serialize();
	$.ajax({
		type : "post",
		url : "/getSearchGameDataAjax",
		data : params,
		success : function(rcvData){
			drawSearchGameData(rcvData.list, rcvData.pb);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function drawSearchGameData(list, pb){
	var con = "";
	for(var i=0; i<list.length; i++){
		if(list[i].WIN==1){
			con += "<div class=\"totalDiv_right_list_hang\" style=\"background-color:#2E47A145;border:1px solid #2E47A145\">";
		}
		else{
			con += "<div class=\"totalDiv_right_list_hang\" style=\"background-color:#A12E2E45;border:1px solid #A12E2E45\">";
		}
		con += "<div class=\"dataList_l\">";
		con += "<img alt=\"champ\" src=\"source/img/champ/"+list[i].CHAMP+".png\" />";
		con += "</div>";
		con += "<div class=\"dataList_m\">";
		con += "<div class=\"dataList_m_top\">";
		con += "<span style=\"font-size : 11px; font-weight : bold;\">KDA </span>";
		con += "<span style=\"font-size : 21px; font-weight : bold;\">"+list[i].KDA.toFixed(2)+"</span>";
		con += "</div>";
		con += "<div class=\"dataList_m_bot\">";
		con += list[i].K+" / "+list[i].D+" / "+list[i].A;
		con += "</div>";
		con += "</div>";
		con += "<div class=\"dataList_r\">";
		con += "<div class=\"dataList_r_top\">";
		if(list[i].REG_FLG==0){
			con += list[i].BEF_ELO;
			if(list[i].PM_ELO>0){
				con += "<span style=\"color:#2C55CD\"> (+"+list[i].PM_ELO+")</span>";
			}
			else if(list[i].PM_ELO<0){
				con += "<span style=\"color:#CD2C2C\"> ("+list[i].PM_ELO+")</span>";
			}
			else{
				con += "<span>(+"+list[i].PM_ELO+")</span>";
			}
			con += "<span> / 정기</span>";
		}
		else{
			con += "<span>수시</span>";
		}
		con += "</div>";
		con += "<div class=\"dataList_r_bot\">";
		con += list[i].WDATE
		con += "</div>";
		con += "</div>";
		con += "<div class=\"dataList_btn\" name=\""+list[i].NO+"\">▶";
		con += "</div>";
		con += "</div>";
	}
	for(var i=0; i<6-list.length; i++){
		con += "<div class=\"totalDiv_right_list_blank\"></div>";
	}
	$(".totalDiv_right_list").html(con);
	
	$(".dataList_btn").on("click", function(){
		var popup;
		var popupName = "경기 데이터";
		var width = "976";
		var height = "590";
		var no = $(this).attr("name");
		var left = Math.ceil((window.screen.width - width)/2);
	    var top = Math.ceil((window.screen.height - height)/2);
		popup = window.open("/data/dataGamePopup?no="+no, "_blank", "width=" + width + ", height=" + height + ", left= " + left + ", top=" + top);
	});
	
	var pgCon = "";
	if($("#gamePg").val() == "1"){
		pgCon += "<input type=\"button\" class =\"gamePgNBtn\"value=\"◀\"name=\"1\"/>";		
	}
	else{
		pgCon += "<input type=\"button\" class =\"gamePgNBtn\"value=\"◀\"name=\"" + ($("#gamePg").val()*1-1)+"\" />";
	}	
	for(var i = pb.startPcount ; i<= pb.endPcount ; i++){
		if(i == $("#gamePg").val()){
			pgCon += "<input type=\"button\" class =\"gamePgNBtn\" value=\""+ i + "\" disabled=\"disabled\" />";
		}
		else{
			pgCon += "<input type=\"button\" class =\"gamePgNBtn\" value=\"" + i + "\"name=\"" + i + "\" />";
		}
	}
	if($("#gamePg").val() == pb.maxPcount){
		pgCon += "<input type=\"button\" class =\"gamePgNBtn\"value=\"▶\" name=\"" + pb.maxPcount + "\" />";
	}
	else{
		pgCon += "<input type=\"button\" class =\"gamePgNBtn\" value=\"▶\"name=\"" + ($("#gamePg").val()*1+1)+"\" />";
	}
	$(".totalDiv_right_pb").html(pgCon);
	
	$(".gamePgNBtn").on("click",function(){
		$("#gamePg").val($(this).attr("name"));
		getSearchGameData();
	});
}

function initSearchData(){
	$("#dataBtn").addClass("dataSubMenuBtn_select");
	$("#totalBtn").removeClass("dataSubMenuBtn_select");
	$(".dataSearch_con_total").css("display","none");
	$(".dataSearch_con_blank").css("display","none");
	$(".dataSearch_con_data").css("display","block");
	getDiv1Data();
	getDiv2Data();
	getDiv3Data();
}

function getDiv1Data(){
	var params = $("#dataSearchForm").serialize();
	$.ajax({
		type : "post",
		url : "/getDiv1DataAjax",
		data : params,
		success : function(rcvData){
			drawDiv1Data(rcvData.list, rcvData.pb);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function getDiv2Data(){
	var params = $("#dataSearchForm").serialize();
	$.ajax({
		type : "post",
		url : "/getDiv2DataAjax",
		data : params,
		success : function(rcvData){
			drawDiv2Data(rcvData.list, rcvData.pb);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function getDiv3Data(){
	var params = $("#dataSearchForm").serialize();
	$.ajax({
		type : "post",
		url : "/getDiv3DataAjax",
		data : params,
		success : function(rcvData){
			drawDiv3Data(rcvData.list, rcvData.pb);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function drawDiv1Data(list, pb){
	var con = "";
	for(var i=0; i<list.length; i++){
		con += "<div class=\"dataDiv_left_list_hang\">";
		con += "<div class=\"dataDiv_left_bot_l\">";
		con += "<img alt=\"champ\" src=\"source/img/champ/"+list[i].CHAMP+".png\">";
		con += "</div>";
		con += "<div class=\"dataDiv_left_bot_m\">";
		con += "<div class=\"dataDiv_left_bot_m_top\">";
		con += "<span style=\"font-size : 11px; font-weight : bold;\">KDA </span>";
		con += "<span style=\"font-size : 18px; font-weight : bold;\">"+list[i].KDA.toFixed(2)+"</span>";
		con += "</div>";
		con += "<div class=\"dataDiv_left_bot_m_bot\">";
		con += list[i].K+" / "+list[i].D+" / "+list[i].A;
		con += "</div>";
		con += "</div>";
		con += "<div class=\"dataDiv_left_bot_r\">";
		con += "<div class=\"dataDiv_left_bot_r_top\">";
		con += list[i].WIN_RATE+"%";
		con += "</div>";
		con += "<div class=\"dataDiv_left_bot_r_bot\">";
		con += list[i].GAME_CNT+"전 "+list[i].WIN+"승 "+list[i].DEF+"패";
		con += "</div>";
		con += "</div>";
		con += "</div>";
	}
	for(var i=0; i<8-list.length; i++){
		con += "<div class=\"dataDiv_left_list_blank\"></div>";
	}
	$(".dataDiv_left_list").html(con);
	
	var pgCon = "";
	if($("#dataPg1").val() == "1"){
		pgCon += "<input type=\"button\" class =\"game1PgNBtn\"value=\"◀\"name=\"1\"/>";		
	}
	else{
		pgCon += "<input type=\"button\" class =\"game1PgNBtn\"value=\"◀\"name=\"" + ($("#dataPg1").val()*1-1)+"\" />";
	}	
	for(var i = pb.startPcount ; i<= pb.endPcount ; i++){
		if(i == $("#dataPg1").val()){
			pgCon += "<input type=\"button\" class =\"game1PgNBtn\" value=\""+ i + "\" disabled=\"disabled\" />";
		}
		else{
			pgCon += "<input type=\"button\" class =\"game1PgNBtn\" value=\"" + i + "\"name=\"" + i + "\" />";
		}
	}
	if($("#dataPg1").val() == pb.maxPcount){
		pgCon += "<input type=\"button\" class =\"game1PgNBtn\"value=\"▶\" name=\"" + pb.maxPcount + "\" />";
	}
	else{
		pgCon += "<input type=\"button\" class =\"game1PgNBtn\" value=\"▶\"name=\"" + ($("#dataPg1").val()*1+1)+"\" />";
	}
	$(".dataDiv_left_pb").html(pgCon);
	
	$(".game1PgNBtn").on("click",function(){
		$("#dataPg1").val($(this).attr("name"));
		getDiv1Data();
	});
}

function drawDiv2Data(list, pb){
	var con = "";
	for(var i=0; i<list.length; i++){
		con += "<div class=\"dataDiv_left_list_hang\">";
		con += "<div class=\"dataDiv_left_bot_l\">";
		con += "<img alt=\"champ\" src=\"source/img/champ/"+list[i].CHAMP+".png\">";
		con += "</div>";
		con += "<div class=\"dataDiv_left_bot_m\">";
		con += "<div class=\"dataDiv_left_bot_m_top\">";
		con += "<span style=\"font-size : 11px; font-weight : bold;\">KDA </span>";
		con += "<span style=\"font-size : 18px; font-weight : bold;\">"+list[i].KDA.toFixed(2)+"</span>";
		con += "</div>";
		con += "<div class=\"dataDiv_left_bot_m_bot\">";
		con += list[i].K+" / "+list[i].D+" / "+list[i].A;
		con += "</div>";
		con += "</div>";
		con += "<div class=\"dataDiv_left_bot_r\">";
		con += "<div class=\"dataDiv_left_bot_r_top\">";
		con += list[i].WIN_RATE+"%";
		con += "</div>";
		con += "<div class=\"dataDiv_left_bot_r_bot\">";
		con += list[i].GAME_CNT+"전 "+list[i].WIN+"승 "+list[i].DEF+"패";
		con += "</div>";
		con += "</div>";
		con += "</div>";
	}
	for(var i=0; i<8-list.length; i++){
		con += "<div class=\"dataDiv_left_list_blank\"></div>";
	}
	$(".dataDiv_mid_list").html(con);
	
	var pgCon = "";
	if($("#dataPg2").val() == "1"){
		pgCon += "<input type=\"button\" class =\"game2PgNBtn\"value=\"◀\"name=\"1\"/>";		
	}
	else{
		pgCon += "<input type=\"button\" class =\"game2PgNBtn\"value=\"◀\"name=\"" + ($("#dataPg2").val()*1-1)+"\" />";
	}	
	for(var i = pb.startPcount ; i<= pb.endPcount ; i++){
		if(i == $("#dataPg2").val()){
			pgCon += "<input type=\"button\" class =\"game2PgNBtn\" value=\""+ i + "\" disabled=\"disabled\" />";
		}
		else{
			pgCon += "<input type=\"button\" class =\"game2PgNBtn\" value=\"" + i + "\"name=\"" + i + "\" />";
		}
	}
	if($("#dataPg2").val() == pb.maxPcount){
		pgCon += "<input type=\"button\" class =\"game2PgNBtn\"value=\"▶\" name=\"" + pb.maxPcount + "\" />";
	}
	else{
		pgCon += "<input type=\"button\" class =\"game2PgNBtn\" value=\"▶\"name=\"" + ($("#dataPg2").val()*1+1)+"\" />";
	}
	$(".dataDiv_mid_pb").html(pgCon);
	
	$(".game2PgNBtn").on("click",function(){
		$("#dataPg2").val($(this).attr("name"));
		getDiv2Data();
	});
}

function drawDiv3Data(list, pb){
	var con = "";
	for(var i=0; i<list.length; i++){
		con += "<div class=\"dataDiv_left_list_hang\">";
		con += "<div class=\"dataDiv_left_bot_l\">";
		con += "<img alt=\"champ\" src=\"source/img/champ/"+list[i].CHAMP+".png\">";
		con += "</div>";
		con += "<div class=\"dataDiv_left_bot_m\">";
		con += "<div class=\"dataDiv_left_bot_m_top\">";
		con += "<span style=\"font-size : 11px; font-weight : bold;\">KDA </span>";
		con += "<span style=\"font-size : 18px; font-weight : bold;\">"+list[i].KDA.toFixed(2)+"</span>";
		con += "</div>";
		con += "<div class=\"dataDiv_left_bot_m_bot\">";
		con += list[i].K+" / "+list[i].D+" / "+list[i].A;
		con += "</div>";
		con += "</div>";
		con += "<div class=\"dataDiv_left_bot_r\">";
		con += "<div class=\"dataDiv_left_bot_r_top\">";
		con += list[i].WIN_RATE+"%";
		con += "</div>";
		con += "<div class=\"dataDiv_left_bot_r_bot\">";
		con += list[i].GAME_CNT+"전 "+list[i].WIN+"승 "+list[i].DEF+"패";
		con += "</div>";
		con += "</div>";
		con += "</div>";
	}
	for(var i=0; i<8-list.length; i++){
		con += "<div class=\"dataDiv_left_list_blank\"></div>";
	}
	$(".dataDiv_right_list").html(con);
	
	var pgCon = "";
		if($("#dataPg3").val() == "1"){
		pgCon += "<input type=\"button\" class =\"game3PgNBtn\"value=\"◀\"name=\"1\"/>";		
	}
	else{
		pgCon += "<input type=\"button\" class =\"game3PgNBtn\"value=\"◀\"name=\"" + ($("#dataPg3").val()*1-1)+"\" />";
	}	
	for(var i = pb.startPcount ; i<= pb.endPcount ; i++){
		if(i == $("#dataPg3").val()){
			pgCon += "<input type=\"button\" class =\"game3PgNBtn\" value=\""+ i + "\" disabled=\"disabled\" />";
		}
		else{
			pgCon += "<input type=\"button\" class =\"game3PgNBtn\" value=\"" + i + "\"name=\"" + i + "\" />";
		}
	}
	if($("#dataPg3").val() == pb.maxPcount){
		pgCon += "<input type=\"button\" class =\"game3PgNBtn\"value=\"▶\" name=\"" + pb.maxPcount + "\" />";
	}
	else{
		pgCon += "<input type=\"button\" class =\"game3PgNBtn\" value=\"▶\"name=\"" + ($("#dataPg3").val()*1+1)+"\" />";
	}
	$(".dataDiv_right_pb").html(pgCon);
	
	$(".game3PgNBtn").on("click",function(){
		$("#dataPg3").val($(this).attr("name"));
		getDiv3Data();
	});
}