function getGameInsList(){
	var params = $("#gameInsForm").serialize();
	$.ajax({
		type : "post",
		url : "/getGameInsListAjax",
		data : params,
		success : function(rcvData){
			drawGameInsList(rcvData.list, rcvData.pb, rcvData.no);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function drawGameInsList(list, pb, no){
	var menuCon = "";
	menuCon += "<div class=\"gameDateDiv\">";
	menuCon += "<input type=\"button\" value=\"◀\" id=\"preDateBtn\" class=\"gameDateBtn\">";
	menuCon += "<span id=\"preDateBtn\" id=\"adminGameDateText\">"+$("#ym").val()+"</span>";
	menuCon += "<input type=\"button\" value=\"▶\" id=\"nextDateBtn\" class=\"gameDateBtn\">";
	menuCon += "</div>";
	menuCon += "<div class=\"gameTitleDIv\">경기명</div>";
	if(list.length == 0){
		menuCon += "<div class=\"noGameListDiv\">미반영 경기가 존재하지 않습니다.</div>";
		for(var i=0; i<9; i++){
			menuCon += "<div class=\"blankgameListDiv\"></div>";
		}
	}
	else{
		for(var i=0; i<list.length; i++){
			if(list[i].NO == no){
				if(list[i].NAME.length>16){
					menuCon += "<div class=\"gameListDiv_2h selectGameListDiv_2h\" name =\""+list[i].NO+"\">"+list[i].NAME+"</div>";
				}
				else{
					menuCon += "<div class=\"gameListDiv_1h selectGameListDiv_1h\" name =\""+list[i].NO+"\">"+list[i].NAME+"</div>";
				}
			}
			else{
				if(list[i].NAME.length>16){
					menuCon += "<div class=\"gameListDiv_2h\" name =\""+list[i].NO+"\">"+list[i].NAME+"</div>";
				}
				else{
					menuCon += "<div class=\"gameListDiv_1h\" name =\""+list[i].NO+"\">"+list[i].NAME+"</div>";
				}
			}
		}
		for(var i=0; i<10-list.length; i++){
			menuCon += "<div class=\"blankgameListDiv\"></div>";
		}
	}
	$(".gameMenuDiv_list").html(menuCon);
	
		$("#preDateBtn").on("click", function(){
		var fullDate = $("#ym").val();
		var year = fullDate.split("-")[0];
		var month = fullDate.split("-")[1]; 
		month = parseInt(month)-1;
		var dateTxt = new Date(year, month);
		dateTxt.setMonth(parseInt(dateTxt.getMonth())-1);
		var yeTxt = dateTxt.getFullYear();
		var dtTxt = dateTxt.getMonth();
		dtTxt = parseInt(dtTxt)+1;
		if(parseInt(dtTxt)<10){
			$("#ym").val(yeTxt+"-0"+dtTxt);
		}
		else{
			$("#ym").val(yeTxt+"-"+dtTxt);
		}
		$("#pg").val("1");
		getGameInsList();
	});
	
	$("#nextDateBtn").on("click", function(){
		var fullDate = $("#ym").val();
		var year = fullDate.split("-")[0];
		var month = fullDate.split("-")[1]; 
		month = parseInt(month)-1;
		var dateTxt = new Date(year, month);
		dateTxt.setMonth(parseInt(dateTxt.getMonth())+1);
		var yeTxt = dateTxt.getFullYear();
		var dtTxt = dateTxt.getMonth();
		dtTxt = parseInt(dtTxt)+1;
		if(parseInt(dtTxt)<10){
			$("#ym").val(yeTxt+"-0"+dtTxt);
		}
		else{
			$("#ym").val(yeTxt+"-"+dtTxt);
		}
		$("#pg").val("1");
		getGameInsList();
	});
	
	$(".selectGameListDiv_1h, .selectGameListDiv_2h, .gameListDiv_1h, .gameListDiv_2h").on("click", function(){
		$("#no").val($(this).attr("name"));
		if($(this).text().length>16){
			$(this).siblings().removeClass("selectGameListDiv_1h");
			$(this).siblings().removeClass("selectGameListDiv_2h");
			$(this).addClass("selectGameListDiv_2h");
		}
		else{
			$(this).siblings().removeClass("selectGameListDiv_1h");
			$(this).siblings().removeClass("selectGameListDiv_2h");
			$(this).addClass("selectGameListDiv_1h");
		}
		getGameInsDoc();
	});
	
	var pgCon = "";
	pgCon += "<div class=\"gamePgDIv\">";
	if($("#pg").val() == "1"){
		pgCon += "<input type=\"button\" class =\"gamePgNBtn\"value=\"◀\"name=\"1\"/>";		
	}
	else{
		pgCon += "<input type=\"button\" class =\"gamePgNBtn\"value=\"◀\"name=\"" + ($("#pg").val()*1-1)+"\" />";
	}	
	for(var i = pb.startPcount ; i<= pb.endPcount ; i++){
		if(i == $("#pg").val()){
			pgCon += "<input type=\"button\" class =\"gamePgNBtn\" value=\""+ i + "\" disabled=\"disabled\" />";
		}
		else{
			pgCon += "<input type=\"button\" class =\"gamePgNBtn\" value=\"" + i + "\"name=\"" + i + "\" />";
		}
	}
	if($("#pg").val() == pb.maxPcount){
		pgCon += "<input type=\"button\" class =\"gamePgNBtn\"value=\"▶\" name=\"" + pb.maxPcount + "\" />";
	}
	else{
		pgCon += "<input type=\"button\" class =\"gamePgNBtn\" value=\"▶\"name=\"" + ($("#pg").val()*1+1)+"\" />";
	}
	pgCon += "</div>";
	$(".gameMenuDiv_pg").html(pgCon);
	
		
	$(".gamePgNBtn").on("click",function(){
		$("#pg").val($(this).attr("name"));
		getGameInsList();
	});
	
	
}

function getGameInsDoc(){
	var params = $("#gameInsForm").serialize();
	$.ajax({
		type : "post",
		url : "/getGameInsDocAjax",
		data : params,
		success : function(rcvData){
			drawGameInsDoc(rcvData.data, rcvData.list);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function drawGameInsDoc(data, list){
	if($("#no").val()==""){
		$("#no").val(data.NO);
	}
	var gameDocCon = "";
	if(data.NO != null){
		gameDocCon += "<div class=\"gameDocDiv_frame\">";
		gameDocCon += "<div class=\"gameDocDiv_titleDiv\">";
		gameDocCon += "<div class=\"gameDocDiv_titleDiv_l\"></div>";
		gameDocCon += "<div class=\"gameDocDiv_titleDiv_m\">";
		gameDocCon += "<span style=\"font-weight : bold; font-size : 16px;\">"+data.NAME+"</span>";
		gameDocCon += "<br>"+data.GDATE+" / "+data.REG_FLG+"</div>";
		gameDocCon += "<div class=\"gameDocDiv_titleDiv_r\">생성자 : "+data.WRITER+"<br>생성일자 : "+data.WDATE+"</div></div>";
		gameDocCon += "<div class=\"gameDocDiv_utilDiv\">";
		gameDocCon += "<div class=\"gameDocDiv_utilDiv_l\">TEAM BLUE</div>"; 
		gameDocCon += "<div class=\"gameDocDiv_utilDiv_m\">";
		gameDocCon += "<div class=\"gameDocDiv_utilDiv_m_l\"></div>";
		gameDocCon += "<div class=\"gameDocDiv_utilDiv_m_m\">";
		gameDocCon += "<div class=\"utilDiv_m_m_top\">승리</div>";
		gameDocCon += "<div class=\"utilDiv_m_m_bot\">";
		gameDocCon += "<span style=\"width:29px; color:#2C55CD; font-weight:bold; font-size:20px;\">B</span>";
		gameDocCon += "<input type=\"radio\" class=\"utilRadioBtn\" id=\"bRadioBtn\"/>&nbsp;&nbsp;";
		gameDocCon += "<input type=\"radio\" class=\"utilRadioBtn\" id=\"rRadioBtn\"/>";
		gameDocCon += "<span style=\"width:29px; color:#CD2C2C; font-weight:bold; font-size:20px;\">R</span>";
		gameDocCon += "</div></div>";
		gameDocCon += "<div class=\"gameDocDiv_utilDiv_m_r\">";
		if(data.WIN_WRITER!=null){
			gameDocCon += "<span class=\"gameDocWriter\" style=\"font-size : 13px;\">"+data.WIN_WRITER+"</span>";
		} 
		gameDocCon += "</div>";
		gameDocCon += "</div>";
		gameDocCon += "<div class=\"gameDocDiv_utilDiv_r\">TEAM RED</div></div>";
		gameDocCon += "<div class=\"gameDocDiv_conDiv\">";
		gameDocCon += "<div class=\"gameDocDiv_conDiv_l\">";
		for(var i=0; i<5; i++){
			gameDocCon += "<div class=\"gameDocDiv_conDiv_l_div\">";
			gameDocCon += "<div class=\"gameDoc_top\">";
			gameDocCon += "<div class=\"gameDoc_img\">";
			if(list[i]!=null){
				gameDocCon += "<img src=\"source/img/champ/"+list[i].CHAMP+".png\"/>";
			}
			gameDocCon += "</div>";
			gameDocCon += "<div class=\"gameDoc_con\">";
			gameDocCon += "<div class=\"gameDoc_con_top\">";
			gameDocCon += "<div class=\"gameDoc_con_top_l\">";
			if(list[i]!=null){
				if(list[i].NICK==null){
					gameDocCon += "사용자 설정 유저";
				}else{
					gameDocCon += list[i].NICK;
				}
			}
			gameDocCon += "</div>";
			gameDocCon += "<div class=\"gameDoc_con_top_r\">";
			gameDocCon += "<img src=\"source/img/util/pen.png\" class=\"updGameInsBtn\" name=\"B_"+(parseInt(i)+1)+"\"/>";
			gameDocCon += "</div></div>";
			gameDocCon += "<div class=\"gameDoc_con_bot\">";
			gameDocCon += "<div class=\"gameDoc_con_bot_l\">";
			if(list[i]!=null){
				gameDocCon += "<span style=\"font-size : 11px; font-weight : bold;\">K</span>";
				gameDocCon += "<span style=\"font-size : 19px; font-weight : bold;\">"+list[i].K+"</span>&nbsp;&nbsp;";
				gameDocCon += "<span style=\"font-size : 11px; font-weight : bold;\">D</span>";
				gameDocCon += "<span style=\"font-size : 19px; font-weight : bold;\">"+list[i].D+"</span>&nbsp;&nbsp;";
				gameDocCon += "<span style=\"font-size : 11px; font-weight : bold;\">A</span>";
				gameDocCon += "<span style=\"font-size : 19px; font-weight : bold;\">"+list[i].A+"</span>";
			}
			gameDocCon += "</div>";
			gameDocCon += "<div class=\"gameDoc_con_bot_r\">";
			if(list[i]!=null){
				gameDocCon += "<span class=\"gameDocWriter\" style=\"font-size:13px;color:#CD2C2C;line-height:2;\">"+list[i].WRITER+"</span>";
			}
			gameDocCon += "</div></div></div></div></div>";
		}
		gameDocCon += "</div>";
		gameDocCon += "<div class=\"gameDocDiv_conDiv_m\">";
		gameDocCon += "<div class=\"gameDocDiv_conDiv_m_div\"><img src=\"source/img/line/top.png\" alt=\"top\"/></div>";
		gameDocCon += "<div class=\"gameDocDiv_conDiv_m_div\"><img src=\"source/img/line/jg.png\" alt=\"jg\"/></div>";
		gameDocCon += "<div class=\"gameDocDiv_conDiv_m_div\"><img src=\"source/img/line/mid.png\" alt=\"mid\"/></div>";
		gameDocCon += "<div class=\"gameDocDiv_conDiv_m_div\"><img src=\"source/img/line/ad.png\" alt=\"ad\"/></div>";
		gameDocCon += "<div class=\"gameDocDiv_conDiv_m_div\"><img src=\"source/img/line/sup.png\" alt=\"sup\"/></div>";
		gameDocCon += "</div>";
		gameDocCon += "<div class=\"gameDocDiv_conDiv_r\">";
		for(var i=5; i<10; i++){
			gameDocCon += "<div class=\"gameDocDiv_conDiv_r_div\">";
			gameDocCon += "<div class=\"gameDoc_top\">";
			gameDocCon += "<div class=\"gameDoc_con\">";
			gameDocCon += "<div class=\"gameDoc_con_top\">";
			gameDocCon += "<div class=\"gameDoc_con_top_r\">";
			gameDocCon += "<img class=\"updGameInsBtn\" src=\"source/img/util/pen.png\" name=\"R_"+(parseInt(i)-4)+"\"/></div>";
			gameDocCon += "<div class=\"gameDoc_con_top_l_RED\">";
			if(list[i]!=null){
				if(list[i].NICK==null){
					gameDocCon += "사용자 설정 유저";
				}else{
					gameDocCon += list[i].NICK;
				}
			}
			gameDocCon += "</div></div>";
			gameDocCon += "<div class=\"gameDoc_con_bot\">";
			gameDocCon += "<div class=\"gameDoc_con_bot_r_RED\">";
			if(list[i]!=null){
				gameDocCon += "<span class=\"gameDocWriter\" style=\"font-size:13px;color:#2C55CD;line-height:2;\">"+list[i].WRITER+"</span>";
			}
			gameDocCon += "</div>";
			gameDocCon += "<div class=\"gameDoc_con_bot_l_RED\">";
			if(list[i]!=null){
				gameDocCon += "<span style=\"font-size : 11px; font-weight : bold;\">K</span>";
				gameDocCon += "<span style=\"font-size : 19px; font-weight : bold;\">"+list[i].K+"</span>&nbsp;&nbsp;";
				gameDocCon += "<span style=\"font-size : 11px; font-weight : bold;\">D</span>";
				gameDocCon += "<span style=\"font-size : 19px; font-weight : bold;\">"+list[i].D+"</span>&nbsp;&nbsp;";
				gameDocCon += "<span style=\"font-size : 11px; font-weight : bold;\">A</span>";
				gameDocCon += "<span style=\"font-size : 19px; font-weight : bold;\">"+list[i].A+"</span>";
			}
			gameDocCon += "</div></div></div>";
			gameDocCon += "<div class=\"gameDoc_img\">";
			if(list[i]!=null){
				gameDocCon += "<img src=\"source/img/champ/"+list[i].CHAMP+".png\"/>";
			}
			gameDocCon += "</div></div></div>";
		}
		gameDocCon += "</div></div></div>";
		gameDocCon += "<div class=\"gameDocDiv_btnDiv\">";
		gameDocCon += "<input type=\"button\" value=\"최종 작성자 확인\" class=\"viewWriter\" id=\"viewWriter\" /></div>";
	}
	else{
		gameDocCon += "<div class=\"emptyGameDocDiv\"></div>";
	}
	$(".gameDocDiv").html(gameDocCon);
	
	$(".viewWriter").hover(function(){
		$(".gameDocWriter").css("display", "inline");
	}, function(){
		$(".gameDocWriter").css("display", "none");
	});
	
	$(".updGameInsBtn").on("click", function(){
		var popup;
		var popupName = "경기 데이터 입력";
		var width = "460";
		var height = "820";
		var params = $(this).attr("name");
		var no = $("#no").val();
		var left = Math.ceil((window.screen.width - width)/2);
	    var top = Math.ceil((window.screen.height - height)/2);
		popup = window.open("/game/gameInsPopup?params="+params+"&no="+no, "_blank", "width=" + width + ", height=" + height + ", left= " + left + ", top=" + top);
	});
	
	if(data.NO != null){
		if(data.WIN==0){
			$("#bRadioBtn").prop('checked',true);
		}
		else if(data.WIN==1){
			$("#rRadioBtn").prop('checked',true);
		}
	}
	
	$("#bRadioBtn").on("click", function(){
		var confirmChk = confirm('승리팀을 등록하시겠습니까?');
	    if(confirmChk) {
			$("#win").val(0);
			updateWinTeam();
	    }
	});
	
	$("#rRadioBtn").on("click", function(){
		var confirmChk = confirm('승리팀을 등록하시겠습니까?');
	    if(confirmChk) {
			$("#win").val(1);
			updateWinTeam();
	    }
	});
}

function updateWinTeam(){
	var params = $("#gameInsForm").serialize();
	$.ajax({
		type : "post",
		url : "/updateWinTeamAjax",
		data : params,
		success : function(rcvData){
			alert("등록을 완료하였습니다.");
			$("#gameInsForm").attr("action","/game/gameIns");
			$("#gameInsForm").submit();
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}