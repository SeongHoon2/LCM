function getDrawBoardDoc(){
	var params = $("#boardCRUDForm").serialize();
	$.ajax({
		type : "post",
		url : "/getDrawBoardDocAjax",
		data : params,
		success : function(rcvData){
			drawBoardDoc(rcvData.data);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function drawBoardDoc(data){
	var titleTxt = "";
	titleTxt += "<span style=\"font-size : 18px; font-weight : bold;\">";
	titleTxt += data.TITLE;
	titleTxt += "</span><br>";
	titleTxt += data.NICK;
	titleTxt += "<br>";
	titleTxt += data.WDATE;
	$(".boardConDiv_docTitle_l").html(titleTxt);
	
	var titleBtn = "";
	if(data.CRUD_FLG == "PR"){
		titleBtn += "<input type=\"button\" class=\"docTitleBtn\" id=\"docTitleBtn_upd\" value=\"수정\"/>&nbsp;&nbsp;";
		titleBtn += "<input type=\"button\" class=\"docTitleBtn\" id=\"docTitleBtn_del\" value=\"삭제\"/>";
	}
	else if(data.CRUD_FLG == "P"){
		titleBtn += "<input type=\"button\" class=\"docTitleBtn\" id=\"docTitleBtn_del\" value=\"삭제\"/>";
	}
	$(".boardConDiv_docTitle_r").html(titleBtn);
	
	$("#docTitleBtn_del").on("click", function(){
		var confirmDelDoc = confirm("게시글을 삭제하시겠습니까?");
		if(confirmDelDoc){
			$("#boardNo").val(data.NO);
			delDoc();
		}
	});
	
	$("#docTitleBtn_upd").on("click", function(){
		$("#boardNo").val(data.NO);
		$("#boardCRUDForm").attr("action","/board/boardUpd");
		$("#boardCRUDForm").submit();
	});
	
	var conTxt = "";
	conTxt += data.CON;
	$(".boardConDiv_docDoc").html(conTxt);
}

function getDrawBoardReple(){
	var params = $("#boardCRUDForm").serialize();
	$.ajax({
		type : "post",
		url : "/getDrawBoardRepleAjax",
		data : params,
		success : function(rcvData){
			if(rcvData.list.length!=0){
				drawBoardDocReple(rcvData.list, rcvData.pb);
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

function writeReple(){
	var params = $("#boardCRUDForm").serialize();
	$.ajax({
		type : "post",
		url : "/writeRepleAjax",
		data : params,
		success : function(rcvData){
			$("#repleTxt").val("");
			$("#boardReplePg").val("1");
			getDrawBoardReple();
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function drawBoardDocReple(list, pb){
	var repleTxt = "";
	repleTxt += "<div class=\"repleDiv_rep\">";
	for(var i=0; i<list.length; i++){
		repleTxt += "<div class=\"repleDiv_repDoc\">";
		repleTxt += "<span style=\"font-weight:bold;line-height:2;\">"+list[i].NICK+"</span>";
		repleTxt += "<br>";
		repleTxt += "<span style=\"line-height:1.5;\">"+list[i].CON;+"</span>";
		repleTxt += "<br>";
		repleTxt += "<span>"+list[i].WDATE+"</span>";
		if(list[i].CRUD_FLG=="P"){
			repleTxt += "&nbsp<img class=\"repDelBtn\" name=\""+list[i].NO+"\" src=\"source/img/util/trash.png\" alt=\"delete\"/>";
		}
		repleTxt += "</div>";
	}
	repleTxt += "</div>";
	repleTxt += "<div class=\"repleDiv_pg\">";
		if($("#boardReplePg").val() == "1"){
		repleTxt += "<input type=\"button\" class =\"replePgNBtn\"value=\"◀\"name=\"1\"/>";		
	}
	else{
		repleTxt += "<input type=\"button\" class =\"replePgNBtn\"value=\"◀\"name=\"" + ($("#boardReplePg").val()*1-1)+"\" />";
	}
	for(var i = pb.startPcount ; i<= pb.endPcount ; i++){
		if(i == $("#boardReplePg").val()){
			repleTxt += "<input type=\"button\" class =\"replePgNBtn\" value=\""+ i + "\" disabled=\"disabled\" />";
		}
		else{
			repleTxt += "<input type=\"button\" class =\"replePgNBtn\" value=\"" + i + "\"name=\"" + i + "\" />";
		}
	}
	if($("#boardReplePg").val() == pb.maxPcount){
		repleTxt += "<input type=\"button\" class =\"replePgNBtn\"value=\"▶\" name=\"" + pb.maxPcount + "\" />";
	}
	else{
		repleTxt += "<input type=\"button\" class =\"replePgNBtn\" value=\"▶\"name=\"" + ($("#boardReplePg").val()*1+1)+"\" />";
	}
	repleTxt += "</div>";
	$(".boardDocRepleDiv").html(repleTxt);
	
	$(".repleDiv_pg").on("click", "input", function(){
		$("#boardReplePg").val($(this).attr("name"));
		getDrawBoardReple();
	});
	
	$(".repDelBtn").on("click", function(){
		var confirmDelRep = confirm("댓글을 삭제하시겠습니까?");
		if(confirmDelRep){
			$("#delRepNo").val($(this).attr("name"));
			delRep();
		}
	});
}

function delRep(){
	var params = $("#boardCRUDForm").serialize();
	$.ajax({
		type : "post",
		url : "/delRepAjax",
		data : params,
		success : function(rcvData){
			$("#boardReplePg").val("1");
			getDrawBoardReple();
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function delDoc(){
	var params = $("#boardCRUDForm").serialize();
	$.ajax({
		type : "post",
		url : "/delDocAjax",
		data : params,
		success : function(rcvData){
			$("#boardCRUDForm").attr("action","/board/board");
			$("#boardCRUDForm").submit();
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}