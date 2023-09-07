function getInitUsr(){
	$.ajax({
		type : "post",
		url : "/getInitUsrAjax",
		success : function(rcvData){
			drawInitUsr(rcvData.data);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function drawInitUsr(data){
	var con = "";
	con += data.NICK;
	$(".conDiv_top").html(con);
	$("#email").val(data.EMAIL);
}

function getUsrList(){
	var params = $("#gamePopupForm").serialize();
	$.ajax({
		type : "post",
		url : "/getUsrListAjax",
		data : params,
		success : function(rcvData){
			drawGameUsrList(rcvData.list);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function drawGameUsrList(list){
	var con = "";
	con += "<table>";
	for(var i=0; i<list.length; i++){
		con += "<tr class=\"usrTr\" name=\""+list[i].EMAIL+"\">";
		con += "<th>"+list[i].NICK;
		con += "</th>";
		con += "</tr>";
	}
	con += "</table>";
	$(".nickDiv_bot").html(con);
	
	$(".usrTr").on("click", function(){
		var con = "";
		con += $(this).text();
		$(".conDiv_top").html(con);
		$("#email").val($(this).attr("name"));
	});
}

function getChamp(){
	var params = $("#gamePopupForm").serialize();
	$.ajax({
		type : "post",
		url : "/getChampAjax",
		data : params,
		success : function(rcvData){
			drawChamp(rcvData.list);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function drawChamp(list){
	var con = "";
	var count = 0;
	
	for(var i=0; i<list.length; i++){
		if(count==0){
			con += "<div class=\"champTr\">";
			con += "<div class=\"champTh\">";
			con += "<img class=\"champImg\" src=\"source/img/champ/"+list[i].NO+".png\" alt=\""+list[i].NM+"\" name=\""+list[i].NO+"\">";
			con += "</div>";
			count++;
		}
		else if(count==4){
			con += "<div class=\"champTh\">";
			con += "<img class=\"champImg\" src=\"source/img/champ/"+list[i].NO+".png\" alt=\""+list[i].NM+"\" name=\""+list[i].NO+"\">";
			con += "</div>";
			con += "</div>";
			count = 0;
		}
		else{
			con += "<div class=\"champTh\">";
			con += "<img class=\"champImg\" src=\"source/img/champ/"+list[i].NO+".png\" alt=\""+list[i].NM+"\" name=\""+list[i].NO+"\">";
			con += "</div>";
			count++;
		}
	}
	$(".champDiv_bot").html(con);
	
	$(".champImg").on("click", function(){
		var chpNo = $(this).attr("name");
		$("#champNo").val(chpNo);
		var champCon = "<img src=\"source/img/champ/"+chpNo+".png\" >";
		$(".conDiv_img").html(champCon);
	});
}

function insGameData(){
	var params = $("#gamePopupForm").serialize();
	$.ajax({
		type : "post",
		url : "/insGameDataAjax",
		data : params,
		success : function(){
			alert("등록을 완료하였습니다.");
			opener.parent.gameInsForm.submit();
			window.close();
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}