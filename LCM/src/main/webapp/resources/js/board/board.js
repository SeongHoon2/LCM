function getDrawBoard(){
	if($("#boardPage").val()==""){
		$("#boardPage").val("1");
	}
	if($("#sarchFlg").val()==""){
		$("#sarchFlg").val("0");
	}

	var params = $("#boardForm").serialize();
	$.ajax({
		type : "post",
		url : "/getDrawBoardAjax",
		data : params,
		success : function(rcvData){
			if(rcvData.result=="noBoardCtg"){
				drawNoBoard();
			}
			else{
				drawBoard(rcvData.boardCtgList, rcvData.boardDocList, rcvData.boardDocPb);
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

function drawNoBoard(){
	var con = "";
	con += "<div class=\"boardMenuDiv_noCtg\">";
	con += "게시판이 존재하지 않습니다.";
	con += "</div>";
	$(".boardMenuDiv").html(con);
	var docCon = "";
	docCon += "<div class=\"boardConDiv_noDoc\">";
	docCon += "</div>";
	$(".boardConDiv_doc").html(docCon);
}

function drawBoard(ctgList, docList, docPb){
	if($("#boardCtg").val()==""){
		$("#boardCtg").val(ctgList[0].NO);
	}
	
	var menuCon = "";
	menuCon += "<table>";
	for(var i=0; i<ctgList.length; i++){
		if(ctgList[i].NO==$("#boardCtg").val()){
			menuCon += "<tr class=\"selectBoardCtgTr\" name =\""+ctgList[i].NO+"\"><th>"+ctgList[i].NM+"</th></tr>";
		}
		else{
			menuCon += "<tr class=\"boardCtgTr\" name =\""+ctgList[i].NO+"\">";
			menuCon += "<th>"+ctgList[i].NM+"</th>";
			menuCon += "</tr>";
		}
	}
	menuCon += "</table>";	
	
	$(".boardMenuDiv").html(menuCon);
	
	$(".boardCtgTr, .selectBoardCtgTr").on("click", function(){
		$("#sarchFlg").val("0");
		$("#sarchTxt").val("");
		$("#boardPage").val("1");
		$("#boardCtg").val($(this).attr("name"));
		$("#boardForm").attr("action","/board/board");
		$("#boardForm").submit();
	});
	
	var docCon = "";
	docCon += "<div class=\"boardDocTr_top\"><div class=\"boardDocTr_top_inline\" style=\"width : 704px;\">제목</div>";
	docCon += "<div class=\"boardDocTr_top_inline\" style=\"width : 102px;\">작성자</div>";
	docCon += "<div class=\"boardDocTr_top_inline\" style=\"width : 120px;\">작성일자</div></div>";
	docCon += "<table>";
	if(docList.length==0){
			docCon += "<tr class=\"boardDocBlankTr\"><th>게시물이 존재하지 않습니다.</th></tr>";
		for(var k=0; k<13; k++){
			docCon += "<tr class=\"boardDocBlankTr\"><th></th></tr>";
		}
	}
	else if(docList.length==14){
		for(var j=0; j<docList.length; j++){
			docCon += "<tr class=\"boardDocTr\" name =\""+docList[j].NO+"\">";
			docCon += "<td class=\"boardDocTr_title\">"+docList[j].TITLE+"</td>";
			docCon += "<td class=\"boardDocTr_nick\">"+docList[j].NICK+"</td>";
			docCon += "<th class=\"boardDocTr_wdate\">"+docList[j].WDATE+"</th>";
			docCon += "</tr>";	
		}
	}
	else{
		for(var p=0; p<docList.length; p++){
			docCon += "<tr class=\"boardDocTr\" name =\""+docList[p].NO+"\">";
			docCon += "<td class=\"boardDocTr_title\">"+docList[p].TITLE+"</td>";
			docCon += "<td class=\"boardDocTr_nick\">"+docList[p].NICK+"</td>";
			docCon += "<th class=\"boardDocTr_wdate\">"+docList[p].WDATE+"</th>";
			docCon += "</tr>";	
		}
		for(var u=0; u<14-docList.length; u++){
			docCon += "<tr class=\"boardDocBlankTr\"><th colspan=\"3\"></th></tr>";
		}
	}
	docCon += "</table>";
	$(".boardConDiv_doc").html(docCon);

	var pgCon = "";
	pgCon += "<div class=\"boardConDiv_Btn\">";
	if($("#boardPage").val() == "1"){
		pgCon += "<input type=\"button\" class =\"boardPgNBtn\"value=\"◀\"name=\"1\"/>";		
	}
	else{
		pgCon += "<input type=\"button\" class =\"boardPgNBtn\"value=\"◀\"name=\"" + ($("#boardPage").val()*1-1)+"\" />";
	}	
	for(var i = docPb.startPcount ; i<= docPb.endPcount ; i++){
		if(i == $("#boardPage").val()){
			pgCon += "<input type=\"button\" class =\"boardPgNBtn\" value=\""+ i + "\" disabled=\"disabled\" />";
		}
		else{
			pgCon += "<input type=\"button\" class =\"boardPgNBtn\" value=\"" + i + "\"name=\"" + i + "\" />";
		}
	}
	if($("#boardPage").val() == docPb.maxPcount){
		pgCon += "<input type=\"button\" class =\"boardPgNBtn\"value=\"▶\" name=\"" + docPb.maxPcount + "\" />";
	}
	else{
		pgCon += "<input type=\"button\" class =\"boardPgNBtn\" value=\"▶\"name=\"" + ($("#boardPage").val()*1+1)+"\" />";
	}
	pgCon += "</div>";
	$(".boardConDiv_pg").html(pgCon);
	
	var wriCon = "";
	wriCon += "<div class=\"boardConDiv_write\">";
	wriCon += "<input type=\"button\" value=\"글 작성\" class=\"boardConDiv_writeBtn\"/>";
	wriCon += "</div>";
	$(".boardConDiv_pg").append(wriCon);
	
	$(".boardConDiv_write").on("click", function(){
		$("#boardForm").attr("action","/board/boardWri");
		$("#boardForm").submit();
	});
	
	var searchCon = "";
	searchCon += "<div class=\"boardConDiv_search\">";
	searchCon += "<select class=\"boardConDiv_combo\"><option value=\"0\">제목</option><option value=\"1\">작성자</option></select>&nbsp;";
	searchCon += "<input type=\"text\" id=\"boardCon_search\" class=\"boardCon_search\"/>&nbsp;";
	searchCon += "<img class=\"boardCon_searchBtn\" src=\"source/img/util/search.png\" alt=\"searchBtn\"/>";
	searchCon += "</div>";
	$(".boardConDiv_pg").append(searchCon);
	
	if($("#sarchTxt").val()!=""){
		$("#boardCon_search").val($("#sarchTxt").val());
		if($("#sarchFlg").val()=="1"){
			$(".boardConDiv_combo option:eq(1)").prop("selected", true);
		}
	}
	
	$(".boardConDiv_Btn").on("click", "input", function(){
		$("#boardPage").val($(this).attr("name"));
		$("#boardForm").attr("action","/board/board");
		$("#boardForm").submit();
	});
	
	$(".boardCon_searchBtn").on("click", function(){
		$("#sarchFlg").val($(".boardConDiv_combo").val());
		$("#sarchTxt").val($("#boardCon_search").val());
		$("#boardPage").val("1");
		$("#boardForm").attr("action","/board/board");
		$("#boardForm").submit();
	});
	
	$("#boardCon_search").on("keyup",function(key){
        if(key.keyCode==13) {
			$("#sarchFlg").val($(".boardConDiv_combo").val());
			$("#sarchTxt").val($("#boardCon_search").val());
			$("#boardPage").val("1");
			$("#boardForm").attr("action","/board/board");
			$("#boardForm").submit();
        }
    });
    
    $(".boardDocTr").on("click", function(){
    	$("#boardNo").val($(this).attr("name"));
    	$("#boardForm").attr("action","/board/boardDoc");
		$("#boardForm").submit();
    });
}

function drawBoardMenu(){
	$.ajax({
		type : "post",
		url : "/drawBoardMenuAjax",
		success : function(rcvData){
			drawBoardCtg(rcvData.boardCtgList);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function drawBoardCtg(ctgList){
	var menuCon = "";
	menuCon += "<table>";
	for(var i=0; i<ctgList.length; i++){
		if(ctgList[i].NO==$("#boardCtg").val()){
			menuCon += "<tr class=\"selectBoardCtgTr\" name =\""+ctgList[i].NO+"\"><th>"+ctgList[i].NM+"</th></tr>";
		}
		else{
			menuCon += "<tr class=\"boardCtgTr\" name =\""+ctgList[i].NO+"\">";
			menuCon += "<th>"+ctgList[i].NM+"</th>";
			menuCon += "</tr>";
		}
	}
	menuCon += "</table>";	
	$(".boardMenuDiv").html(menuCon);
	
	$(".boardCtgTr, .selectBoardCtgTr").on("click", function(){
		$("#boardCtg").val($(this).attr("name"));
		$("#boardCRUDForm").attr("action","/board/board");
		$("#boardCRUDForm").submit();
	});
}

function setCKEditorDoc(){
	var params = $("#boardCRUDForm").serialize();
	$.ajax({
		type : "post",
		url : "/setCKEditorDocAjax",
		data : params,
		success : function(rcvData){
			CKEDITOR.instances.boardWriTextarea.setData(rcvData.data.CON);
			$("#boardConDiv_Title").val(rcvData.data.TITLE);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}