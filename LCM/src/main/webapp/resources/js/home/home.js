function drawInitHome(){
	$.ajax({
		type : "post",
		url : "/drawHomeAjax",
		success : function(rcvData){
			if(rcvData.result=="success"){
				$("#eloPg").val("1");
				$("#gamePg").val("1");
				drawHome();
			}
			else if(rcvData.result=="wait"){
				drawHomeWait();
			}
			else{
				drawHomeJoinMake(rcvData.clanList);
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

function drawHomeJoinMake(clanList){
	var con = "";
	con += "<div class=\"content_homeBtnDiv\">";
	con += "<button class=\"homeClanBtn\" id=\"homeJoinClanBtn\">클랜 가입</button>&nbsp;&nbsp;";
	con += "<button class=\"homeClanBtn\" id=\"homeMakeClanBtn\">클랜 생성</button>";
	con += "</div>";
	con += "<div class=\"content_homeConDiv\">";
	con += "</div>";
	$(".contentWrapDiv").html(con);
	
	$("#homeJoinClanBtn").addClass("homeClanBtn_select");
	
	$(".homeClanBtn").on("click", function(){
		$(this).siblings().removeClass("homeClanBtn_select");
		$(this).addClass("homeClanBtn_select");
	});
	
	drawHomeJoin(clanList);
	
	$("#homeMakeClanBtn").on("click", function(){
		chkDrawHomeMake();
	});
	
	$("#homeJoinClanBtn").on("click", function(){
		drawHomeJoin(clanList);
	});
}

function drawHomeJoin(clanList){
	var con = "";
	var boxLineCount = Math.ceil(clanList.length/5)*5;
	var boxCount = 0;
	
	for(i=0; i<boxLineCount; i++){
		if(boxCount==0){
			con += "<div class=\"homeJoinLine\">";
			if(clanList[i]!=null){
				con += "<div class=\"homeJoinBox\">";
				con += "<div class=\"homeJoinBox_imgBox\">";
				if(clanList[i].IMG!=null&&clanList[i].IMG!=""){
					con += "<img alt=\"clanLogo\" src=\"source/img/clan/"+clanList[i].IMG+".png\" />";
				}
				else{
					con += "<img alt=\"clanLogo\" src=\"source/img/clan/noImg.png\" />";
				}
				con += "</div>";
				con += "<div class=\"homeJoinBox_txtBox\">";
				con += clanList[i].NM;
				con += "</div>";
				con += "<div class=\"homeJoinBox_btnBox\">";
				con += "<button class=\"homeJoinBox_joinClanBtn\" name=\""+clanList[i].NM+"\">가입하기</button>";
				con += "</div>";
				con += "</div>";
				boxCount++;
			}
			else{
				con += "<div class=\"homeJoinBox_empty\"></div>";
				boxCount++;
			}
		}
		else if(boxCount==4){
			if(clanList[i]!=null){
				con += "<div class=\"homeJoinBox\">";
				con += "<div class=\"homeJoinBox_imgBox\">";
				if(clanList[i].IMG!=null&&clanList[i].IMG!=""){
					con += "<img alt=\"clanLogo\" src=\"source/img/clan/"+clanList[i].IMG+".png\"  />";
				}
				else{
					con += "<img alt=\"clanLogo\" src=\"source/img/clan/noImg.png\" />";
				}
				con += "</div>";
				con += "<div class=\"homeJoinBox_txtBox\">";
				con += clanList[i].NM;
				con += "</div>";
				con += "<div class=\"homeJoinBox_btnBox\">";
				con += "<button class=\"homeJoinBox_joinClanBtn\" name=\""+clanList[i].NM+"\">가입하기</button>";
				con += "</div>";
				con += "</div>";
				boxCount = 0;
			}
			else{
				con += "<div class=\"homeJoinBox_empty\"></div>";
				boxCount = 0;
			}
			con += "</div>";
		}
		else{
			if(clanList[i]!=null){
				con += "<div class=\"homeJoinBox\">";
				con += "<div class=\"homeJoinBox_imgBox\">";
				if(clanList[i].IMG!=null&&clanList[i].IMG!=""){
					con += "<img alt=\"clanLogo\" src=\"source/img/clan/"+clanList[i].IMG+".png\" />";
				}
				else{
					con += "<img alt=\"clanLogo\" src=\"source/img/clan/noImg.png\" />";
				}
				con += "</div>";
				con += "<div class=\"homeJoinBox_txtBox\">";
				con += clanList[i].NM;
				con += "</div>";
				con += "<div class=\"homeJoinBox_btnBox\">";
				con += "<button class=\"homeJoinBox_joinClanBtn\" name=\""+clanList[i].NM+"\">가입하기</button>";
				con += "</div>";
				con += "</div>";
				boxCount++;
			}
			else{
				con += "<div class=\"homeJoinBox_empty\"></div>";
				boxCount++;
			}
		}
	}
	
	$(".content_homeConDiv").html(con);
	
	$(".homeJoinBox_joinClanBtn").on("click", function(){
		var clanNmInput = $(this).attr("name");
	    var confirmClan = confirm(clanNmInput + '에 가입하시겠습니까?');
	    if(confirmClan) {
	    	$.ajax({
				type : "post",
				url : "/checkSessionAjax",
				success : function(rcvData){
					if(rcvData.result=="noSession"){
						alert("로그인이 필요합니다.");
						location.replace("/user/login");
					}
					else{
					    var clanNickInput = prompt("사용할 닉네임을 입력해주세요.");
					    if(clanNickInput.trim()==""){
					    	alert("닉네임을 입력해주세요.");
					    }
					    else if(clanNickInput.trim().length<2||clanNickInput.trim().length>16){
					    	alert("닉네임은 2~16자리 입니다.");
					    }
						else if(clanNickInput!=null){
						    var clanNickCheck = checkKorEng(clanNickInput);
						    if(clanNickCheck){
								$("#clanNm").val(clanNmInput);
								$("#clanNick").val(clanNickInput);
								joinClan();
							}
					    	else{
					    		alert("가입 불가능한 닉네임입니다.");
							}
						}
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
	});
} 	

function checkKorEng(value){
    var count = 0;
    for(var i=0; i<value.length; i++){
        if((value.charCodeAt(i)>=32 && value.charCodeAt(i)<=122) || (value.charCodeAt(i)>=44032 && value.charCodeAt(i)<=55203)){
            count += 1;
        }
    }
    if(count === (value.length)){
        return true;
    } else{
        return false;
    }
}
    
function joinClan(){
	var params = $("#joinClanForm").serialize(); 
    $.ajax({
		type : "post",
		url : "/joinClanAjax",
		data : params,
		success : function(rcvData){
			if(rcvData.result=="success"){
				alert("가입을 완료하였습니다.");
				location.replace("/user/login");
			}
			else if(rcvData.result=="fail_withdraw"){
				var confirmMakeClan = confirm('해당 클랜 가입 이력이 있습니다.\n재가입의 경우 클랜 탈퇴 이전 데이터가 복구됩니다.\n재가입 하시겠습니까?');
				if(confirmMakeClan){
					joinDuplicateClan();
				}
			}
			else{
				alert("중복된 닉네임입니다.");
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

function joinDuplicateClan(){
	var params = $("#joinClanForm").serialize(); 
    $.ajax({
		type : "post",
		url : "/joinDuplicateClanAjax",
		data : params,
		success : function(){
			alert("재가입을 완료하였습니다.");
			location.replace("/user/login");
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function chkDrawHomeMake(){
	$.ajax({
			type : "post",
			url : "/checkSessionAjax",
			success : function(rcvData){
				if(rcvData.result=="noSession"){
					alert("로그인이 필요합니다.");
					location.replace("/user/login");
				}
				else{
					drawHomeMake();
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

function drawHomeMake(){
	var con = "";
	con += "<div class=\"homeMakeBox\">";
	con += "<div class=\"homeMakeBox_txtBox\">";
	con += "<input type=\"text\" placeHolder=\"클랜명\" id=\"makeClanTxt\" class=\"makeClanTxt\" maxlength=\"20\" /><br>";
	con += "<input type=\"text\" placeHolder=\"닉네임\" id=\"makeClanNickTxt\" class=\"makeClanTxt\" maxlength=\"16\" />";
	con += "</div>";
	con += "<div class=\"homeMakeBox_btnBox\">";
	con += "<button class=\"makeClanBtn\" id=\"makeClanBtn\">생성하기</button>";
	con += "</div>";
	con += "</div>";
	
	$(".content_homeConDiv").html(con);
	$("#makeClanTxt").focus();
	
	$("#makeClanBtn").on("click", function(){
		$("#makeClanNm").val($("#makeClanTxt").val());
		$("#makeClanNick").val($("#makeClanNickTxt").val());
		var confirmMakeClan = confirm('클랜을 생성하시겠습니까?');
		if(confirmMakeClan){
			var clanNmCheck = checkKorEng($("#makeClanTxt").val().trim());
			var clanNickCheck = checkKorEng($("#makeClanNickTxt").val().trim());
			if($("#makeClanTxt").val().trim()==""){
				alert("클랜명을 입력해주세요.");
			}
			else if($("#makeClanTxt").val().trim().length>20||$("#makeClanTxt").val().trim().length<2){
				alert("클랜명은 2~20자리 입니다.");
			}
			else if(clanNmCheck==false){
				alert("사용 불가능한 클랜명입니다.");
			}
			else if($("#makeClanNickTxt").val().trim()==""){
				alert("닉네임을 입력해주세요.");
			}
			else if($("#makeClanNickTxt").val().trim().length>16||$("#makeClanNickTxt").val().trim().length<2){
				alert("닉네임은 2~16자리 입니다.");
			}
			else if(clanNickCheck==false){
				alert("사용 불가능한 닉네임입니다.");
			}
			else{
				chkMakeClan();
			}
		}
	});
}

function chkMakeClan(){
	var params = $("#makeClanForm").serialize(); 
    $.ajax({
		type : "post",
		url : "/chkMakeClanAjax",
		data : params,
		success : function(rcvData){
			if(rcvData.result=="success"){
				alert("클랜이 생성되었습니다.");
				location.replace("/user/login");
			}
			else if(rcvData.result=="fail_duplicate"){
				alert("중복된 클랜명입니다.");
			}
			else{
				alert("사용할 수 없는 클랜명입니다.");
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

function drawHome(){
	var con = "";
	con += "<div class=\"homeConDivFrame\">";
	con += "<div class=\"homeConDiv\">";
	con += "<div class=\"homeConDiv_left\">";
	con += "<div class=\"homeConDiv_left_top\">";
	con += "<div class=\"homeConDiv_left_top_l\">";
	con += "</div>";
	con += "<div class=\"homeConDiv_left_top_r\">";
	con += "<div class=\"homeConDiv_left_top_r_1\">";
	con += "</div>";
	con += "<div class=\"homeConDiv_left_top_r_2\">";
	con += "</div>";
	con += "<div class=\"homeConDiv_left_top_r_3\">";
	con += "</div>";
	con += "<div class=\"homeConDiv_left_top_r_4\">";
	con += "</div>";
	con += "</div>";
	con += "</div>";
	con += "<div class=\"homeConDiv_left_bot\">";
	con += "<div class=\"homeConDiv_left_bot_l\">";
	con += "<div class=\"homeConDiv_left_bot_l_title\">";
	con += "<table>";
	con += "<tr>";
	con += "<th width=\"20%\">반영전</th>";
	con += "<th width=\"20%\"></th>";
	con += "<th width=\"20%\">반영후</th>";
	con += "<th width=\"40%\">반영일시</th>";
	con += "</tr>";
	con += "</table>";
	con += "</div>";
	con += "<div class=\"homeConDiv_left_bot_l_list\">";
	con += "</div>";
	con += "<div class=\"homeConDiv_left_bot_l_pb\">";
	con += "</div>";
	con += "</div>";
	con += "<div class=\"homeConDiv_left_bot_r\">";
	con += "<div class=\"homeConDiv_left_bot_r_top\">";
	con += "<div class=\"homeConDiv_left_bot_r_top_title\">Most Pick";
	con += "</div>";
	con += "<div class=\"homeConDiv_left_bot_r_top_list\">";
	con += "</div>";
	con += "</div>";
	con += "<div class=\"homeConDiv_left_bot_r_bot\">";
	con += "<div class=\"homeConDiv_left_bot_r_bot_title\">Highest Win Rate";
	con += "</div>";
	con += "<div class=\"homeConDiv_left_bot_r_bot_list\">";
	con += "</div>";
	con += "</div>";
	con += "</div>";
	con += "</div>";
	con += "</div>";
	con += "<div class=\"homeConDiv_right\">";
	con += "<div class=\"homeConDiv_right_top\">";
	con += "<div class=\"homeConDiv_right_top_left\">";
	con += "<div class=\"homeConDiv_right_top_left_title\">최근 게시글";
	con += "</div>";
	con += "<div class=\"homeConDiv_right_top_left_con\">";
	con += "</div>";
	con += "</div>";
	con += "<div class=\"homeConDiv_right_top_right\">";
	con += "<div class=\"homeConDiv_right_top_right_title\">전적 검색";
	con += "</div>";
	con += "<div class=\"homeConDiv_right_top_right_con\">";
	con += "<input type=\"text\" class=\"idTxt\" id=\"idTxt\" />&nbsp;&nbsp;";
	con += "<img alt=\"search\" src=\"source/img/util/search.png\" class=\"searchBtn\" id=\"searchBtn\">";
	con += "</div>";
	con += "<div class=\"homeConDiv_right_top_right_title2\">공지";
	con += "</div>";
	con += "<div class=\"homeConDiv_right_top_right_notice\">";
	con += "</div>";
	con += "</div>";
	con += "</div>";
	con += "<div class=\"homeConDiv_right_bot_title\">최근 전적";
	con += "</div>";
	con += "<div class=\"homeConDiv_right_bot\">";
	con += "<div class=\"homeConDiv_right_bot_list\">";
	con += "</div>";
	con += "<div class=\"homeConDiv_right_bot_pb\">";
	con += "</div>";
	con += "</div>";
	con += "</div>";
	con += "</div>";
	con += "</div>";
	$(".contentWrapDiv").html(con);
	
	$("#searchBtn").on("click", function(){
		if($("#idTxt").val().trim()==""){
			alert("닉네임을 입력해주세요.");
		}
		else{
			$("#searchFlg").val("1");
			$("#searchNick").val($("#idTxt").val().trim());
			$("#homeForm").attr("action","/data/dataSearch");
			$("#homeForm").submit();
		}
	});
		
	$("#idTxt").on("keyup",function(key){
        if(key.keyCode==13) {
        	if($("#idTxt").val().trim()==""){
				alert("닉네임을 입력해주세요.");
			}
			else{
				$("#searchFlg").val("1");
				$("#searchNick").val($("#idTxt").val().trim());
				$("#homeForm").attr("action","/data/dataSearch");
				$("#homeForm").submit();
			}
        }
    });
	
	getHomeInfo();
	getHomeElo();
	getHomeGame();
	getHomeBoard();
}

function getHomeInfo(){
	$.ajax({
		type : "post",
		url : "/getHomeInfoAjax",
		success : function(rcvData){
			drawHomeInfo(rcvData.data, rcvData.mList, rcvData.wList);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function drawHomeInfo(data, mList, wList){
	var usrCon = "";
	if(data.IMG!=null&&data.IMG!=""){
		usrCon += "<img alt=\"logo\" src=\"source/img/clan/"+data.IMG+".png\" />";
	}
	else{
		usrCon += "<img alt=\"logo\" src=\"source/img/clan/noImg.png\" />";
	}
	$(".homeConDiv_left_top_l").html(usrCon);
	
	var topCon1 = data.CLAN;
	$(".homeConDiv_left_top_r_1").html(topCon1);
	
	var topCon2 = "";
	topCon2 += data.NICK;
	$(".homeConDiv_left_top_r_2").html(topCon2);	
	
	var topCon3 = "";
	topCon3 += "Elo : "+data.ELO;
	$(".homeConDiv_left_top_r_3").html(topCon3);	
	
	var topCon4 = "";
	topCon4 += "주라인 : "+data.PREFER_LINE+"&nbsp;&nbsp;/&nbsp;&nbsp;권한 : "+data.AUTH;
	$(".homeConDiv_left_top_r_4").html(topCon4);
	
	var noticeCon = "";
	if(data.NOTICE!=""&&data.NOTICE!=null){
		noticeCon += data.NOTICE;
	}
	else{
		noticeCon += "공지가 없습니다.";
	}
	$(".homeConDiv_right_top_right_notice").html(noticeCon);
	
	var mListCon = "";
	if(mList.length==0){
		mListCon += "<div class=\"homeDiv_left_bot_blank\">";
		mListCon += "데이터가 없습니다.";
		mListCon += "</div>";
	}
	else{
		for(var i=0; i<mList.length; i++){
			if(i==3){
				mListCon += "<div style=\"border-bottom:0;\" class=\"homeDiv_left_bot_hang\">";
			}
			else{
				mListCon += "<div class=\"homeDiv_left_bot_hang\">";
			}
			mListCon += "<div class=\"homeDiv_left_bot_l\">";
			mListCon += "<img alt=\"champ\" src=\"source/img/champ/"+mList[i].CHAMP+".png\">";
			mListCon += "</div>";
			mListCon += "<div class=\"homeDiv_left_bot_m\">";
			mListCon += "<div class=\"homeDiv_left_bot_m_top\">";
			mListCon += "<span style=\"font-size : 11px; font-weight : bold;\">KDA </span>";
			mListCon += "<span style=\"font-size : 15px; font-weight : bold;\">"+mList[i].KDA.toFixed(2)+"</span>";
			mListCon += "</div>";
			mListCon += "<div class=\"homeDiv_left_bot_m_bot\">";
			mListCon += mList[i].K+" / "+mList[i].D+" / "+mList[i].A;
			mListCon += "</div>";
			mListCon += "</div>";
			mListCon += "<div class=\"homeDiv_left_bot_r\">";
			mListCon += "<div class=\"homeDiv_left_bot_r_top\">";
			mListCon += mList[i].WIN_RATE+"%";
			mListCon += "</div>";
			mListCon += "<div class=\"homeDiv_left_bot_r_bot\">";
			mListCon += mList[i].GAME_CNT+"전 "+mList[i].WIN+"승 "+mList[i].DEF+"패";
			mListCon += "</div>";
			mListCon += "</div>";
			mListCon += "</div>";
		}
	}
	$(".homeConDiv_left_bot_r_top_list").html(mListCon);	

	var wListCon = "";
	if(wList.length==0){
		wListCon += "<div class=\"homeDiv_left_bot_blank\">";
		wListCon += "데이터가 없습니다.";
		wListCon += "</div>";
	}
	else{
		for(var i=0; i<wList.length; i++){
			if(i==3){
				wListCon += "<div style=\"border-bottom:0;\" class=\"homeDiv_left_bot_hang\">";
			}
			else{
				wListCon += "<div class=\"homeDiv_left_bot_hang\">";
			}
			wListCon += "<div class=\"homeDiv_left_bot_l\">";
			wListCon += "<img alt=\"champ\" src=\"source/img/champ/"+wList[i].CHAMP+".png\">";
			wListCon += "</div>";
			wListCon += "<div class=\"homeDiv_left_bot_m\">";
			wListCon += "<div class=\"homeDiv_left_bot_m_top\">";
			wListCon += "<span style=\"font-size : 11px; font-weight : bold;\">KDA </span>";
			wListCon += "<span style=\"font-size : 15px; font-weight : bold;\">"+wList[i].KDA.toFixed(2)+"</span>";
			wListCon += "</div>";
			wListCon += "<div class=\"homeDiv_left_bot_m_bot\">";
			wListCon += wList[i].K+" / "+wList[i].D+" / "+wList[i].A;
			wListCon += "</div>";
			wListCon += "</div>";
			wListCon += "<div class=\"homeDiv_left_bot_r\">";
			wListCon += "<div class=\"homeDiv_left_bot_r_top\">";
			wListCon += wList[i].WIN_RATE+"%";
			wListCon += "</div>";
			wListCon += "<div class=\"homeDiv_left_bot_r_bot\">";
			wListCon += wList[i].GAME_CNT+"전 "+wList[i].WIN+"승 "+wList[i].DEF+"패";
			wListCon += "</div>";
			wListCon += "</div>";
			wListCon += "</div>";
		}
	}
	$(".homeConDiv_left_bot_r_bot_list").html(wListCon);	
}

function getHomeElo(){
	var params = $("#homeForm").serialize(); 
    $.ajax({
		type : "post",
		url : "/getHomeEloAjax",
		data : params,
		success : function(rcvData){
			drawHomeElo(rcvData.list, rcvData.pb);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function drawHomeElo(list, pb){
	var con = "";
	con += "<table>";
	if(list.length==0){
		con += "<tr class=\"histBlankTr\">";
		con += "<th colspan=\"4\">Elo 변동기록이 없습니다.</th>";
		con += "</tr>";
		for(var i=0; i<13; i++){
			con += "<tr class=\"histBlankTr\">";
			con += "<th colspan=\"4\"></th>";
			con += "</tr>";
		}
	}
	else{
		for(var i=0; i<list.length; i++){
			con += "<tr class=\"histConTr\" name=\""+list[i].EMAIL+"\">";
			con += "<th width=\"20%\">"+list[i].BEF_ELO+"</th>";
			if(list[i].PM_ELO>0){
				con += "<th width=\"20%\" style=\"color:#2C55CD;\">+"+list[i].PM_ELO+"</th>";
			}
			else if(list[i].PM_ELO<0){
				con += "<th width=\"20%\" style=\"color:#CD2C2C;\">"+list[i].PM_ELO+"</th>";
			}
			else{
				con += "<th width=\"20%\">"+list[i].PM_ELO+"</th>";
			}
			con += "<th width=\"20%\">"+list[i].AFT_ELO+"</th>";
			con += "<th width=\"40%\">"+list[i].WDATE+"</th>";
			con += "</tr>";
		}
		for(var i=0; i<14-list.length; i++){
			con += "<tr class=\"histBlankTr\">";
			con += "<th colspan=\"4\"></th>";
			con += "</tr>";
		}
	}
	con += "</table>";
	$(".homeConDiv_left_bot_l_list").html(con);

	var pgCon = "";
	pgCon += "<div class=\"gamePgDIv\">";
	if($("#eloPg").val() == "1"){
		pgCon += "<input type=\"button\" class =\"homeEloPgBtn\"value=\"◀\"name=\"1\"/>";		
	}
	else{
		pgCon += "<input type=\"button\" class =\"homeEloPgBtn\"value=\"◀\"name=\"" + ($("#eloPg").val()*1-1)+"\" />";
	}	
	for(var i = pb.startPcount ; i<= pb.endPcount ; i++){
		if(i == $("#eloPg").val()){
			pgCon += "<input type=\"button\" class =\"homeEloPgBtn\" value=\""+ i + "\" disabled=\"disabled\" />";
		}
		else{
			pgCon += "<input type=\"button\" class =\"homeEloPgBtn\" value=\"" + i + "\"name=\"" + i + "\" />";
		}
	}
	if($("#eloPg").val() == pb.maxPcount){
		pgCon += "<input type=\"button\" class =\"homeEloPgBtn\"value=\"▶\" name=\"" + pb.maxPcount + "\" />";
	}
	else{
		pgCon += "<input type=\"button\" class =\"homeEloPgBtn\" value=\"▶\"name=\"" + ($("#eloPg").val()*1+1)+"\" />";
	}
	pgCon += "</div>";
	$(".homeConDiv_left_bot_l_pb").html(pgCon);
	
	$(".homeEloPgBtn").on("click",function(){
		$("#eloPg").val($(this).attr("name"));
		getHomeElo();
	});
}

function getHomeGame(){
	var params = $("#homeForm").serialize(); 
    $.ajax({
		type : "post",
		url : "/getHomeGameAjax",
		data : params,
		success : function(rcvData){
			drawHomeGame(rcvData.list, rcvData.pb);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function drawHomeGame(list, pb){
	var con = "";
	if(list.length==0){
		con += "<div class=\"homeConDiv_right_bot_list_blank\">데이터가 없습니다.</div>";
	}
	else{
		for(var i=0; i<list.length; i++){
			if(list[i].WIN==1){
				con += "<div class=\"homeDiv_right_list_hang\" style=\"background-color:#2E47A145;border:1px solid #2E47A145\">";
			}
			else{
				con += "<div class=\"homeDiv_right_list_hang\" style=\"background-color:#A12E2E45;border:1px solid #A12E2E45\">";
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
		for(var i=0; i<5-list.length; i++){
			con += "<div class=\"homeDiv_right_list_blank\"></div>";
		}
	}
	$(".homeConDiv_right_bot_list").html(con);
	
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
	$(".homeConDiv_right_bot_pb").html(pgCon);
	
	$(".gamePgNBtn").on("click",function(){
		$("#gamePg").val($(this).attr("name"));
		getHomeGame();
	});
}

function getHomeBoard(){
    $.ajax({
		type : "post",
		url : "/getHomeBoardAjax",
		success : function(rcvData){
			drawHomeBoard(rcvData.list);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});	
}

function drawHomeBoard(list){
	var con = "";
	if(list.length==0){
		con += "<div class=\"homeBoardDiv_none\">데이터가 없습니다.</div>";
	}
	else{
		for(var i=0; i<list.length; i++){
			con += "<div class=\"homeBoardDiv\" name=\""+list[i].CTG+"|"+list[i].NO+"\">"+list[i].TITLE+"</div>";
		}
		for(var i=0; i<7-list.length; i++){
		con += "<div class=\"homeBoardDiv_blank\"></div>";
		}
	}
	$(".homeConDiv_right_top_left_con").html(con);
	
	$(".homeBoardDiv").on("click", function(){
		var ctg = $(this).attr("name").split("|")[0];
		var no  = $(this).attr("name").split("|")[1];
		$("#boardNo").val(no);
		$("#boardCtg").val(ctg);
		$("#homeForm").attr("action","/board/boardDoc");
		$("#homeForm").submit();
	});
				
}

function drawHomeWait(){
	var con = "";
	con += "<div class=\"homeConDivFrame_blank\">";
	con += "<div class=\"homeConDiv_blank\">";
	con += "<div class=\"homeConDiv_blank_top\">클랜 가입을 대기중입니다.";
	con += "</div>";
	con += "<div class=\"homeConDiv_blank_bot\">";
	con += "</div>";
	con += "<div class=\"homeConDiv_blank_btn\">";
	con += "<input type=\"button\" value=\"가입 취소하기\" class=\"cancelBtn\" id=\"cancelBtn\" />";
	con += "</div>";
	con += "</div>";
	con += "<div class=\"homeConDiv_blank2\">";
	con += "<div class=\"homeConDiv_left\">";
	con += "<div class=\"homeConDiv_left_top\">";
	con += "<div class=\"homeConDiv_left_top_l\">";
	con += "</div>";
	con += "<div class=\"homeConDiv_left_top_r\">";
	con += "<div class=\"homeConDiv_left_top_r_1\">";
	con += "</div>";
	con += "<div class=\"homeConDiv_left_top_r_2\">";
	con += "</div>";
	con += "<div class=\"homeConDiv_left_top_r_3\">";
	con += "</div>";
	con += "<div class=\"homeConDiv_left_top_r_4\">";
	con += "</div>";
	con += "</div>";
	con += "</div>";
	con += "<div class=\"homeConDiv_left_bot\">";
	con += "<div class=\"homeConDiv_left_bot_l\">";
	con += "<div class=\"homeConDiv_left_bot_l_title\">";
	con += "<table>";
	con += "<tr>";
	con += "<th width=\"20%\">반영전</th>";
	con += "<th width=\"20%\"></th>";
	con += "<th width=\"20%\">반영후</th>";
	con += "<th width=\"40%\">반영일시</th>";
	con += "</tr>";
	con += "</table>";
	con += "</div>";
	con += "<div class=\"homeConDiv_left_bot_l_list\">";
	con += "</div>";
	con += "<div class=\"homeConDiv_left_bot_l_pb\">";
	con += "</div>";
	con += "</div>";
	con += "<div class=\"homeConDiv_left_bot_r\">";
	con += "<div class=\"homeConDiv_left_bot_r_top\">";
	con += "<div class=\"homeConDiv_left_bot_r_top_title\">Most Pick";
	con += "</div>";
	con += "<div class=\"homeConDiv_left_bot_r_top_list\">";
	con += "</div>";
	con += "</div>";
	con += "<div class=\"homeConDiv_left_bot_r_bot\">";
	con += "<div class=\"homeConDiv_left_bot_r_bot_title\">Highest Win Rate";
	con += "</div>";
	con += "<div class=\"homeConDiv_left_bot_r_bot_list\">";
	con += "</div>";
	con += "</div>";
	con += "</div>";
	con += "</div>";
	con += "</div>";
	con += "<div class=\"homeConDiv_right\">";
	con += "<div class=\"homeConDiv_right_top\">";
	con += "<div class=\"homeConDiv_right_top_left\">";
	con += "<div class=\"homeConDiv_right_top_left_title\">최근 게시글";
	con += "</div>";
	con += "<div class=\"homeConDiv_right_top_left_con\">";
	con += "</div>";
	con += "</div>";
	con += "<div class=\"homeConDiv_right_top_right\">";
	con += "<div class=\"homeConDiv_right_top_right_title\">전적 검색";
	con += "</div>";
	con += "<div class=\"homeConDiv_right_top_right_con\">";
	con += "<input type=\"text\" class=\"idTxt\" id=\"idTxt\" />&nbsp;&nbsp;";
	con += "<img alt=\"search\" src=\"source/img/util/search.png\" class=\"searchBtn\" id=\"searchBtn\">";
	con += "</div>";
	con += "<div class=\"homeConDiv_right_top_right_title2\">공지";
	con += "</div>";
	con += "<div class=\"homeConDiv_right_top_right_notice\">";
	con += "</div>";
	con += "</div>";
	con += "</div>";
	con += "<div class=\"homeConDiv_right_bot_title\">최근 전적";
	con += "</div>";
	con += "<div class=\"homeConDiv_right_bot\">";
	con += "<div class=\"homeConDiv_right_bot_list\">";
	con += "</div>";
	con += "<div class=\"homeConDiv_right_bot_pb\">";
	con += "</div>";
	con += "</div>";
	con += "</div>";
	con += "</div>";
	con += "</div>";
	$(".contentWrapDiv").html(con);
	
	getWaitingClan();
	
	$("#cancelBtn").on("click", function(){
		var confirmClan = confirm("클랜 가입을 취소하시겠습니까?");
	    if(confirmClan) {
			cancelAccount();
		}
	});
}

function getWaitingClan(){
    $.ajax({
		type : "post",
		url : "/getWaitingClanAjax",
		success : function(rcvData){
			drawWaitingClan(rcvData.data);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});	
}

function drawWaitingClan(data){
	var con = "";
	con += "클랜명 : ";
	con += data.CLAN;
	$(".homeConDiv_blank_bot").html(con);
}

function cancelAccount(){
    $.ajax({
		type : "post",
		url : "/cancelAccountAjax",
		success : function(rcvData){
			alert("가입 취소를 완료하였습니다.");
			location.replace("/home/home");
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});	
}