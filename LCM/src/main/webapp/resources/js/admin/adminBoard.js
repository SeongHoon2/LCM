function getAdminBoard(){
	$.ajax({
		type : "post",
		url : "/getAdminBoardAjax",
		success : function(rcvData){
			drawBoardManage(rcvData.list);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function drawBoardManage(list){
	var boardManageCon = "";
	boardManageCon += "<div class=\"admin_board\">";
	boardManageCon += "<div class=\"admin_board_conDiv\">";
	boardManageCon += "<div class=\"admin_board_con\">";
	boardManageCon += "<div class=\"admin_board_con_title\">";
	boardManageCon += "<div class=\"admin_board_con_title_div\" style=\"width : 60%\";\">게시판명</div>";
	boardManageCon += "<div class=\"admin_board_con_title_div\" style=\"width : 10%\";\">순서</div>";
	boardManageCon += "<div class=\"admin_board_con_title_div\" style=\"width : 15%\";\"></div>";
	boardManageCon += "<div class=\"admin_board_con_title_div\" style=\"width : 7.5%\";\">수정</div>";
	boardManageCon += "<div class=\"admin_board_con_title_div\" style=\"width : 7.5%\";\">삭제</div>";
	if(list.length==0){
		boardManageCon += "<div class=\"ctgDiv\" style=\"border-bottom:1px solid lightgray;\">게시판을 추가해주세요.</div>";
	}
	else{
		for(var i=0; i<list.length; i++){
			if(i==list.length-1&&i>9){
				boardManageCon += "<div class=\"eCtgDiv\" style=\"border-bottom : 0;\">";
			}
			else{
				boardManageCon += "<div class=\"eCtgDiv\">";
			}
			boardManageCon += "<div class=\"eCtgDivTh\" id=\"ctgThNm_"+i+"\" style=\"width : 60%\";\">"+list[i].NM+"</div>";
			boardManageCon += "<div class=\"eCtgDivTh\" style=\"width : 10%\";\">"+list[i].SORT+"</div>";
			boardManageCon += "<div class=\"eCtgDivTh\" style=\"width : 15%\";\">";
			if(i!=0&&i!=list.length-1){
				boardManageCon += "<input type=\"button\" value=\"▲\" class=\"ctgUpBtn\" name=\""+i+"\"/>";
				boardManageCon += "<input type=\"button\" value=\"▼\" class=\"ctgDownBtn\" name=\""+i+"\"/>";
			}
			boardManageCon += "</div>";
			boardManageCon += "<div class=\"eCtgDivTh\" style=\"width : 7.5%\"\">";
			boardManageCon += "<input type=\"button\" id=\"ctgThUpdNo_"+i+"\" value=\"V\" class=\"ctgUpdBtn\" name=\""+list[i].NO+"\"/>";
			boardManageCon += "</div>";
			boardManageCon += "<div class=\"eCtgDivTh\" style=\"width : 7.5%\";\">";
			boardManageCon += "<input type=\"button\" id=\"ctgThDelNo_"+i+"\" value=\"V\" class=\"ctgDelBtn\" name=\""+list[i].NO+"\"/>";
			boardManageCon += "</div></div>";
		}
	}
	boardManageCon += "</div></div>";
	boardManageCon += "<div class=\"admin_board_btnDiv\">";
	if(list.length<2){
		boardManageCon += "<input type=\"button\" value=\"추가\" class=\"admin_board_addBtn\" id=\"admin_board_addBtn\" />";
	}
	else{
		boardManageCon += "<input type=\"button\" value=\"추가\" class=\"admin_board_addBtn\" id=\"admin_board_addBtn\" />&nbsp;&nbsp;";
		boardManageCon += "<input type=\"button\" value=\"저장\" class=\"admin_board_addBtn\" id=\"admin_board_savBtn\" />";
	}
	boardManageCon += "</div></div>";
	$(".adminConDiv").html(boardManageCon);
	
	$("#admin_board_addBtn").on("click", function(){
		var ctgAdd = prompt("추가할 게시판명을 입력해주세요.");
	    if(ctgAdd.trim()==""){
	    	alert("게시판명을 입력해주세요.");
	    }
	    else if(ctgAdd.trim().length<2||ctgAdd.trim().length>10){
	    	alert("게시판명은 2~10자리 입니다.");
	    }
		else if(ctgAdd!=null){
			var chkboardCtgCheck = checkBoardCtgNm(ctgAdd);
		    if(chkboardCtgCheck){
				$("#addAdminBoardTxt").val(ctgAdd);
				addCtg();
			}
	    	else{
	    		alert("불가능한 게시판명입니다.");
			}
		}
	});
	
	$(".ctgDelBtn").on("click", function(){
		var confirmChk = confirm('게시판을 삭제하시겠습니까?\n삭제된 게시글들은 복구가 불가능합니다.');
	    if(confirmChk) {
			$("#ctgDelNo").val($(this).attr("name"));
			delCtg();
	    }
	});
	
	$(".ctgUpdBtn").on("click", function(){
		var ctgUpd = prompt("수정 후 게시판명을 입력해주세요.");
	    if(ctgUpd.trim()==""){
	    	alert("게시판명을 입력해주세요.");
	    }
	    else if(ctgUpd.trim().length<2||ctgUpd.trim().length>10){
	    	alert("게시판명은 2~10자리 입니다.");
	    }
		else if(ctgUpd!=null){
			var chkboardCtgCheck = checkBoardCtgNm(ctgUpd);
		    if(chkboardCtgCheck){
				$("#ctgDelNo").val($(this).attr("name"));
				$("#ctgUpdNm").val(ctgUpd);
				updCtg();
			}
	    	else{
	    		alert("불가능한 게시판명입니다.");
			}
		}
	});
	
	$(".ctgDownBtn").on("click", function(){
		var clickI = $(this).attr("name");
		var preNm = $("#ctgThNm_"+clickI).text();
		var preNo = $("#ctgThUpdNo_"+clickI).attr("name");
		var preNo = $("#ctgThDelNo_"+clickI).attr("name");

		var nxtI = Number(clickI)+1;
		var nxtNm = $("#ctgThNm_"+nxtI).text();
		var nxtNo = $("#ctgThUpdNo_"+nxtI).attr("name");
		var nxtNo = $("#ctgThDelNo_"+nxtI).attr("name");
		
		$("#ctgThNm_"+clickI).html(nxtNm);
		$("#ctgThUpdNo_"+clickI).attr("name", nxtNo);
		$("#ctgThDelNo_"+clickI).attr("name", nxtNo);
		
		$("#ctgThNm_"+nxtI).html(preNm);
		$("#ctgThUpdNo_"+nxtI).attr("name", preNo);
		$("#ctgThDelNo_"+nxtI).attr("name", preNo);
	});
	
	$(".ctgUpBtn").on("click", function(){
		var clickI = $(this).attr("name");
		var preNm = $("#ctgThNm_"+clickI).text();
		var preNo = $("#ctgThUpdNo_"+clickI).attr("name");
		var preNo = $("#ctgThDelNo_"+clickI).attr("name");
		
		var nxtI = Number(clickI)-1;
		var nxtNm = $("#ctgThNm_"+nxtI).text();
		var nxtNo = $("#ctgThUpdNo_"+nxtI).attr("name");
		var nxtNo = $("#ctgThDelNo_"+nxtI).attr("name");
		
		$("#ctgThNm_"+clickI).html(nxtNm);
		$("#ctgThUpdNo_"+clickI).attr("name", nxtNo);
		$("#ctgThDelNo_"+clickI).attr("name", nxtNo);
		
		$("#ctgThNm_"+nxtI).html(preNm);
		$("#ctgThUpdNo_"+nxtI).attr("name", preNo);
		$("#ctgThDelNo_"+nxtI).attr("name", preNo);
	});
	
	$("#admin_board_savBtn").on("click", function(){
		var flg = "";
		for(var i=0; i<list.length; i++){
			flg +=$("#ctgThUpdNo_"+i).attr("name") + ",";
		}
		var confirmChk = confirm('저장하시겠습니까?');
	    if(confirmChk) {
			$("#ctgUpd").val(flg);
			updCtgSort();
	    }
	});
}

function checkBoardCtgNm(value){
    var count = 0;
    for(var i=0; i<value.length; i++){
        if((value.charCodeAt(i)>=32 && value.charCodeAt(i)<=126) || (value.charCodeAt(i)>=44032 && value.charCodeAt(i)<=55203)){
            count += 1;
        }
    }
    if(count === (value.length)){
        return true;
    } else{
        return false;
    }
}

function addCtg(){
	var params = $("#adminBoardForm").serialize();
	$.ajax({
		type : "post",
		url : "/addCtgAjax",
		data : params,
		success : function(rcvData){
		alert("게시판이 추가되었습니다.");
			 location.replace("/admin/adminBoard");
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function delCtg(){
	var params = $("#adminBoardForm").serialize();
	$.ajax({
		type : "post",
		url : "/delCtgAjax",
		data : params,
		success : function(rcvData){
		alert("게시판이 삭제되었습니다.");
			 location.replace("/admin/adminBoard");
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function updCtg(){
	var params = $("#adminBoardForm").serialize();
	$.ajax({
		type : "post",
		url : "/updCtgAjax",
		data : params,
		success : function(rcvData){
		alert("게시판이 수정되었습니다.");
			 location.replace("/admin/adminBoard");
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function updCtgSort(){
	var params = $("#adminBoardForm").serialize();
	$.ajax({
		type : "post",
		url : "/updCtgSortAjax",
		data : params,
		success : function(rcvData){
		alert("수정이 완료되었습니다.");
			 location.replace("/admin/adminBoard");
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}
