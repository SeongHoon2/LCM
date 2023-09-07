function getAdminEloUsr(){
	if($("#usrPg").val()==""){
		$("#usrPg").val("1");
	}
	
	var params = $("#adminEloForm").serialize();
	$.ajax({
		type : "post",
		url : "/getAdminEloUsrAjax",
		data : params,
		success : function(rcvData){
			drawAdminEloUsr(rcvData.list, rcvData.pb);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function drawAdminEloUsr(list, pb){
	var listCon = "";
	listCon += "<table>";
	if(list.length == 0){
		listCon += "<tr class=\"blankUsrTr\"><th>검색 결과가 없습니다.</th></tr>";
		for(var i=0; i<14; i++){
			listCon += "<tr class=\"blankUsrTr\"><th></th></tr>";
		}
	}
	else{
		for(var i=0; i<list.length; i++){
			if(list[i].EMAIL==$("#usrEmail").val()){
				listCon += "<tr class=\"selectUsrTr\" name=\""+list[i].EMAIL+"\"><th>";
				listCon += list[i].NICK;
				listCon += "</th></tr>";
			}
			else{
				listCon += "<tr class=\"usrTr\" name=\""+list[i].EMAIL+"\"><th>";
				listCon += list[i].NICK;
				listCon += "</th></tr>";
			}
		}
		for(var i=0; i<15-list.length; i++){
			listCon += "<tr class=\"blankUsrTr\"><th></th></tr>";
		}
	}
	listCon += "</table>";
	$(".adminEloUsrDiv_list").html(listCon);
	
	var pgCon = "";
	if($("#usrPg").val() == "1"){
		pgCon += "<input type=\"button\" class =\"adminPgNBtn\"value=\"◀\"name=\"1\"/>";		
	}
	else{
		pgCon += "<input type=\"button\" class =\"adminPgNBtn\"value=\"◀\"name=\"" + ($("#usrPg").val()*1-1)+"\" />";
	}	
	for(var i = pb.startPcount ; i<= pb.endPcount ; i++){
		if(i == $("#usrPg").val()){
			pgCon += "<input type=\"button\" class =\"adminPgNBtn\" value=\""+ i + "\" disabled=\"disabled\" />";
		}
		else{
			pgCon += "<input type=\"button\" class =\"adminPgNBtn\" value=\"" + i + "\"name=\"" + i + "\" />";
		}
	}
	if($("#usrPg").val() == pb.maxPcount){
		pgCon += "<input type=\"button\" class =\"adminPgNBtn\"value=\"▶\" name=\"" + pb.maxPcount + "\" />";
	}
	else{
		pgCon += "<input type=\"button\" class =\"adminPgNBtn\" value=\"▶\"name=\"" + ($("#usrPg").val()*1+1)+"\" />";
	}
	$(".adminEloUsrDiv_pg").html(pgCon);
	
	$(".adminPgNBtn").on("click", function(){
		$("#usrPg").val($(this).attr("name"));
		$("#adminEloForm").attr("action","/admin/adminElo");
		$("#adminEloForm").submit();
	});
	
	$(".usrTr, .selectUsrTr").on("click", function(){
		$("#usrEmail").val($(this).attr("name"));
		$("#eloPg").val("1");
		$("#adminEloForm").attr("action","/admin/adminElo");
		$("#adminEloForm").submit();
	});
}
function getAdminEloList(){
	if($("#eloPg").val()==""){
		$("#eloPg").val("1");
	}
	
	var params = $("#adminEloForm").serialize();
	$.ajax({
		type : "post",
		url : "/getAdminEloListAjax",
		data : params,
		success : function(rcvData){
			drawAdminEloList(rcvData.list, rcvData.pb);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function drawAdminEloList(list, pb){
	var con = "";
	con += "<div class=\"eloHistDiv_list\">";
	con += "<table>";
	con += "<tr class=\"titleTr\">";
	con += "<th width = \"10%\">반영전</th>";
	con += "<th width = \"10%\"></th>";
	con += "<th width = \"10%\">반영후</th>";
	con += "<th width = \"50%\">비고</th>";
	con += "<th width = \"20%\">반영 일자</th>";
	con += "</tr>";
	if(list.length == 0){
		con += "<tr class=\"blankEloTr\"><th colspan=\"5\">검색 결과가 없습니다.</th></tr>";
		for(var i=0; i<12; i++){
			con += "<tr class=\"blankEloTr\"><th></th></tr>";
		}
	}
	else{
		for(var i=0; i<list.length; i++){
			con += "<tr class=\"eloTr\">";
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
			con += "<td>"+list[i].NOTE+"</td>";
			con += "<th>"+list[i].WDATE+"</th>";
			con += "</tr>";
		}
		for(var i=0; i<13-list.length; i++){
			con += "<tr class=\"blankEloTr\"><th></th></tr>";
		}
	}
	con += "</table>";
	con += "</div>";
	con += "<div class=\"eloHistDiv_pg\">";
	if($("#eloPg").val() == "1"){
		con += "<input type=\"button\" class =\"adminEloPgNBtn\"value=\"◀\"name=\"1\"/>";		
	}
	else{
		con += "<input type=\"button\" class =\"adminEloPgNBtn\"value=\"◀\"name=\"" + ($("#eloPg").val()*1-1)+"\" />";
	}	
	for(var i = pb.startPcount ; i<= pb.endPcount ; i++){
		if(i == $("#eloPg").val()){
			con += "<input type=\"button\" class =\"adminEloPgNBtn\" value=\""+ i + "\" disabled=\"disabled\" />";
		}
		else{
			con += "<input type=\"button\" class =\"adminEloPgNBtn\" value=\"" + i + "\"name=\"" + i + "\" />";
		}
	}
	if($("#eloPg").val() == pb.maxPcount){
		con += "<input type=\"button\" class =\"adminEloPgNBtn\"value=\"▶\" name=\"" + pb.maxPcount + "\" />";
	}
	else{
		con += "<input type=\"button\" class =\"adminEloPgNBtn\" value=\"▶\"name=\"" + ($("#eloPg").val()*1+1)+"\" />";
	}
	con += "</div>";
	$(".eloHistDiv").html(con);
	
	$(".adminEloPgNBtn").on("click", function(){
		$("#eloPg").val($(this).attr("name"));
		$("#adminEloForm").attr("action","/admin/adminElo");
		$("#adminEloForm").submit();
	});
}

function updEloHist(){
	var params = $("#adminEloForm").serialize();
	$.ajax({
		type : "post",
		url : "/updEloHistAjax",
		data : params,
		success : function(rcvData){
			alert("Elo 업데이트를 완료하였습니다.");
			$("#eloPg").val("1");
			$("#adminEloForm").attr("action","/admin/adminElo");
			$("#adminEloForm").submit();
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function initElo(){
	$.ajax({
		type : "post",
		url : "/initEloAjax",
		success : function(rcvData){
			alert("초기화를 완료하였습니다.");
			$("#eloPg").val("1");
			$("#adminEloForm").attr("action","/admin/adminElo");
			$("#adminEloForm").submit();
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}