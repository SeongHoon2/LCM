function drawDataCon(){
	getEloRankData();
	if($("#rnkEmail").val()!=""){
		getEloHistData();
	}
}

function getEloRankData(){
	if($("#rnkPg").val()==""){
		$("#rnkPg").val("1");
	}
	var params = $("#dataRankForm").serialize();
	$.ajax({
		type : "post",
		url : "/getEloRankDataAjax",
		data : params,
		success : function(rcvData){
			drawEloRankData(rcvData.list, rcvData.pb);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function drawEloRankData(list, pb){
	var con = "";
	con += "<table>";
	con += "<tr class=\"titleTr\">";
	con += "<th width=\"15%\">순위</th>";
	con += "<th width=\"60%\">닉네임</th>";
	con += "<th width=\"10%\">주라인</th>";
	con += "<th width=\"15%\">Elo</th>";
	con += "</tr>";
	for(var i=0; i<list.length; i++){
		if($("#rnkEmail").val()==list[i].EMAIL){
			con += "<tr class=\"conTr_sel\" name=\""+list[i].EMAIL+"\">";
		}
		else{
			con += "<tr class=\"conTr\" name=\""+list[i].EMAIL+"\">";
		}
		con += "<th>"+list[i].RANKING+"</th>";
		con += "<th>"+list[i].NICK+"</th>";
		con += "<th>"+list[i].PREFER_LINE+"</th>";
		con += "<th>"+list[i].ELO+"</th>";
		con += "</tr>";
	}
	for(var i=0; i<13-list.length; i++){
		con += "<tr class=\"blankTr\">";
		con += "<th colspan=\"4\"></th>";
		con += "</tr>";
	}
	con += "</table>";
	$(".dataRankDiv_list").html(con);
	
	var pgCon = "";
	if($("#rnkPg").val() == "1"){
		pgCon += "<input type=\"button\" class =\"dataPgNBtn\"value=\"◀\"name=\"1\"/>";		
	}
	else{
		pgCon += "<input type=\"button\" class =\"dataPgNBtn\"value=\"◀\"name=\"" + ($("#rnkPg").val()*1-1)+"\" />";
	}	
	for(var i = pb.startPcount ; i<= pb.endPcount ; i++){
		if(i == $("#rnkPg").val()){
			pgCon += "<input type=\"button\" class =\"dataPgNBtn\" value=\""+ i + "\" disabled=\"disabled\" />";
		}
		else{
			pgCon += "<input type=\"button\" class =\"dataPgNBtn\" value=\"" + i + "\"name=\"" + i + "\" />";
		}
	}
	if($("#rnkPg").val() == pb.maxPcount){
		pgCon += "<input type=\"button\" class =\"dataPgNBtn\"value=\"▶\" name=\"" + pb.maxPcount + "\" />";
	}
	else{
		pgCon += "<input type=\"button\" class =\"dataPgNBtn\" value=\"▶\"name=\"" + ($("#rnkPg").val()*1+1)+"\" />";
	}
	$(".dataRankDiv_pg").html(pgCon);
	
	$(".dataPgNBtn").on("click", function(){
		$("#rnkPg").val($(this).attr("name"));
		$("#dataRankForm").attr("action","/data/dataRank");
		$("#dataRankForm").submit();
	});
	
	$(".conTr, .conTr_sel").on("click", function(){
		$("#rnkEmail").val($(this).attr("name"));
		$("#histPg").val("1");
		$("#dataRankForm").attr("action","/data/dataRank");
		$("#dataRankForm").submit();
	});
}

function getEloHistData(){
	if($("#histPg").val()==""){
		$("#histPg").val("1");
	}
	var params = $("#dataRankForm").serialize();
	$.ajax({
		type : "post",
		url : "/getEloHistDataAjax",
		data : params,
		success : function(rcvData){
			drawEloHistData(rcvData.list, rcvData.pb);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function drawEloHistData(list, pb){
	con = "";
	con += "<div class=\"dataEloHistDiv_list\">";
	con += "<table>";
	con += "<tr class=\"titleTr\">";
	con += "<th width=\"10%\">반영전</th>";
	con += "<th width=\"10%\"></th>";
	con += "<th width=\"10%\">반영후</th>";
	con += "<th width=\"50%\">비고</th>";
	con += "<th width=\"20%\">반영일자</th>";
	con += "</tr>";
	if(list.length==0){
		con += "<tr class=\"histBlankTr\">";
		con += "<th colspan=\"5\">검색 결과가 없습니다.</th>";
		con += "</tr>";
		for(var i=0; i<13; i++){
			con += "<tr class=\"histBlankTr\">";
			con += "<th colspan=\"5\"></th>";
			con += "</tr>";
		}
	}
	else{
		for(var i=0; i<list.length; i++){
			con += "<tr class=\"histConTr\" name=\""+list[i].EMAIL+"\">";
			con += "<th>"+list[i].BEF_ELO+"</th>";
			if(list[i].PM_ELO>0){
				con += "<th style=\"color:#2C55CD;\">+"+list[i].PM_ELO+"</th>";
			}
			else if(list[i].PM_ELO<0){
				con += "<th style=\"color:#CD2C2C;\">"+list[i].PM_ELO+"</th>";
			}
			else{
				con += "<th>"+list[i].PM_ELO+"</th>";
			}
			con += "<th>"+list[i].AFT_ELO+"</th>";
			con += "<th>"+list[i].NOTE+"</th>";
			con += "<th>"+list[i].WDATE+"</th>";
			con += "</tr>";
		}
		for(var i=0; i<14-list.length; i++){
			con += "<tr class=\"histBlankTr\">";
			con += "<th colspan=\"5\"></th>";
			con += "</tr>";
		}
	}
	con += "</table>";
	con += "</div>";
	con += "<div class=\"dataEloHistDiv_pb\">";
	if($("#histPg").val() == "1"){
		con += "<input type=\"button\" class =\"dataHistPgNBtn\"value=\"◀\"name=\"1\"/>";		
	}
	else{
		con += "<input type=\"button\" class =\"dataHistPgNBtn\"value=\"◀\"name=\"" + ($("#histPg").val()*1-1)+"\" />";
	}	
	for(var i = pb.startPcount ; i<= pb.endPcount ; i++){
		if(i == $("#histPg").val()){
			con += "<input type=\"button\" class =\"dataHistPgNBtn\" value=\""+ i + "\" disabled=\"disabled\" />";
		}
		else{
			con += "<input type=\"button\" class =\"dataHistPgNBtn\" value=\"" + i + "\"name=\"" + i + "\" />";
		}
	}
	if($("#histPg").val() == pb.maxPcount){
		con += "<input type=\"button\" class =\"dataHistPgNBtn\"value=\"▶\" name=\"" + pb.maxPcount + "\" />";
	}
	else{
		con += "<input type=\"button\" class =\"dataHistPgNBtn\" value=\"▶\"name=\"" + ($("#histPg").val()*1+1)+"\" />";
	}
	con += "</div>";
	$(".dataEloHistDiv").html(con);
		
	$(".dataHistPgNBtn").on("click", function(){
		$("#histPg").val($(this).attr("name"));
		$("#dataRankForm").attr("action","/data/dataRank");
		$("#dataRankForm").submit();
	});
	
}