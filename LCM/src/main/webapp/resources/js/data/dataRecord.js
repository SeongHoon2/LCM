function getDataList(){
	var params = $("#dataRecordForm").serialize();
	$.ajax({
		type : "post",
		url : "/getDataListAjax",
		data : params,
		success : function(rcvData){
			drawDataList(rcvData.list, rcvData.pb, rcvData.no);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function drawDataList(list, pb, no){
	var menuCon = "";
	menuCon += "<div class=\"dataDateDiv\">";
	menuCon += "<input type=\"button\" value=\"◀\" id=\"preDateBtn\" class=\"dataDateBtn\">";
	menuCon += "<span id=\"preDateBtn\" id=\"dataGameDateText\">"+$("#ym").val()+"</span>";
	menuCon += "<input type=\"button\" value=\"▶\" id=\"nextDateBtn\" class=\"dataDateBtn\">";
	menuCon += "</div>";
	menuCon += "<div class=\"dataGameTitleDiv\">경기명</div>";
	if(list.length == 0){
		menuCon += "<div class=\"noGameListDiv\">경기가 존재하지 않습니다.</div>";
		for(var i=0; i<9; i++){
			menuCon += "<div class=\"blankGameListDiv\"></div>";
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
			menuCon += "<div class=\"blankGameListDiv\"></div>";
		}
	}
	$(".dataGameDiv_list").html(menuCon);
	
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
		getDataList();
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
		getDataList();
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
		getDataDoc();
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
	$(".dataGameDiv_pg").html(pgCon);
	
	$(".gamePgNBtn").on("click",function(){
		$("#pg").val($(this).attr("name"));
		getDataList();
	});
}

function getDataDoc(){
	var params = $("#dataRecordForm").serialize();
	$.ajax({
		type : "post",
		url : "/getDataDocAjax",
		data : params,
		success : function(rcvData){
			drawDataDoc(rcvData.data, rcvData.list);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function drawDataDoc(data, list){
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
		gameDocCon += "<br>"+data.GDATE+" / "+data.REG_FLG+"</div></div>";
		gameDocCon += "<div class=\"gameDocDiv_utilDiv\">";
		gameDocCon += "<div class=\"gameDocDiv_utilDiv_l\">TEAM BLUE</div>"; 
		gameDocCon += "<div class=\"gameDocDiv_utilDiv_m\">";
		if(data.WIN == "0"){
			gameDocCon += "<span style=\"color:#2C55CD; font-weight:bold; font-size:20px;\">TEAM BLUE WIN</span>";
		}
		else{
			gameDocCon += "<span style=\"color:#CD2C2C; font-weight:bold; font-size:20px;\">TEAM RED WIN</span>";
		}
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
			gameDocCon += "</div></div>";
			gameDocCon += "<div class=\"gameDoc_con_bot\">";
			gameDocCon += "<div class=\"gameDoc_con_bot_l\">";
			if(list[i]!=null){
				gameDocCon += "<span style=\"font-size : 11px; font-weight : bold;\">K</span>";
				gameDocCon += "<span style=\"font-size : 19px; font-weight : bold;\">"+list[i].K+"</span>&nbsp;&nbsp;";
				gameDocCon += "<span style=\"font-size : 11px; font-weight : bold;\">D</span>";
				gameDocCon += "<span style=\"font-size : 19px; font-weight : bold;\">"+list[i].D+"</span>&nbsp;&nbsp;";
				gameDocCon += "<span style=\"font-size : 11px; font-weight : bold;\">A</span>";
				gameDocCon += "<span style=\"font-size : 19px; font-weight : bold;\">"+list[i].A+"</span>&nbsp;&nbsp;";
				gameDocCon += "<span style=\"font-size : 11px; font-weight : bold;\">Elo</span>";
				if(list[i].NICK!=null){
					if(list[i].PM_ELO==null){
						gameDocCon += "<span style=\"font-size:16px;font-weight:bold;\">사용자 변경</span>";
					}
					else{
						if(list[i].PM_ELO<0){
							gameDocCon += "<span style=\"font-size:19px;font-weight:bold;\">"+list[i].BEF_ELO+"</span>";
							gameDocCon += "<span style=\"font-size:13px;font-weight:bold;\">(</span>";
							gameDocCon += "<span style=\"font-size:13px;font-weight:bold;color:#CD2C2C\">"+list[i].PM_ELO+"</span>";
							gameDocCon += "<span style=\"font-size:13px;font-weight:bold;\">)</span>";
						}
						else if(list[i].PM_ELO>0){
							gameDocCon += "<span style=\"font-size:19px;font-weight:bold;\">"+list[i].BEF_ELO+"</span>";
							gameDocCon += "<span style=\"font-size:13px;font-weight:bold;\">(</span>";
							gameDocCon += "<span style=\"font-size:13px;font-weight:bold;color:#2C55CD\">+"+list[i].PM_ELO+"</span>";
							gameDocCon += "<span style=\"font-size:13px;font-weight:bold;\">)</span>";
						}
						else{
							gameDocCon += "<span style=\"font-size:19px;font-weight:bold;\">"+list[i].BEF_ELO+"</span>";
							gameDocCon += "<span style=\"font-size:13px;font-weight:bold;\">(</span>";
							gameDocCon += "<span style=\"font-size:13px;font-weight:bold;\">"+list[i].PM_ELO+"</span>";
							gameDocCon += "<span style=\"font-size:13px;font-weight:bold;\">)</span>";
						}
					}
				}
				else{
					gameDocCon += "<span style=\"font-size:16px;font-weight:bold;\">사용자 설정</span>";
				}
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
			gameDocCon += "<div class=\"gameDoc_con_bot_l_RED\">";
			if(list[i]!=null){
				gameDocCon += "<span style=\"font-size : 11px; font-weight : bold;\">K</span>";
				gameDocCon += "<span style=\"font-size : 19px; font-weight : bold;\">"+list[i].K+"</span>&nbsp;&nbsp;";
				gameDocCon += "<span style=\"font-size : 11px; font-weight : bold;\">D</span>";
				gameDocCon += "<span style=\"font-size : 19px; font-weight : bold;\">"+list[i].D+"</span>&nbsp;&nbsp;";
				gameDocCon += "<span style=\"font-size : 11px; font-weight : bold;\">A</span>";
				gameDocCon += "<span style=\"font-size : 19px; font-weight : bold;\">"+list[i].A+"</span>&nbsp;&nbsp;";
				gameDocCon += "<span style=\"font-size : 11px; font-weight : bold;\">Elo</span>";
				if(list[i].NICK!=null){
					if(list[i].PM_ELO==null){
						gameDocCon += "<span style=\"font-size:16px;font-weight:bold;\">사용자 변경</span>";
					}
					else{
						if(list[i].PM_ELO<0){
							gameDocCon += "<span style=\"font-size:19px;font-weight:bold;\">"+list[i].BEF_ELO+"</span>";
							gameDocCon += "<span style=\"font-size:13px;font-weight:bold;\">(</span>";
							gameDocCon += "<span style=\"font-size:13px;font-weight:bold;color:#CD2C2C\">"+list[i].PM_ELO+"</span>";
							gameDocCon += "<span style=\"font-size:13px;font-weight:bold;\">)</span>";
						}
						else if(list[i].PM_ELO>0){
							gameDocCon += "<span style=\"font-size:19px;font-weight:bold;\">"+list[i].BEF_ELO+"</span>";
							gameDocCon += "<span style=\"font-size:13px;font-weight:bold;\">(</span>";
							gameDocCon += "<span style=\"font-size:13px;font-weight:bold;color:#2C55CD\">+"+list[i].PM_ELO+"</span>";
							gameDocCon += "<span style=\"font-size:13px;font-weight:bold;\">)</span>";
						}
						else{
							gameDocCon += "<span style=\"font-size:19px;font-weight:bold;\">"+list[i].BEF_ELO+"</span>";
							gameDocCon += "<span style=\"font-size:13px;font-weight:bold;\">(</span>";
							gameDocCon += "<span style=\"font-size:13px;font-weight:bold;\">"+list[i].PM_ELO+"</span>";
							gameDocCon += "<span style=\"font-size:13px;font-weight:bold;\">)</span>";
						}
					}
				}
				else{
					gameDocCon += "<span style=\"font-size:16px;font-weight:bold;\">사용자 설정</span>";
				}
			}
			gameDocCon += "</div></div></div>";
			gameDocCon += "<div class=\"gameDoc_img\">";
			if(list[i]!=null){
				gameDocCon += "<img src=\"source/img/champ/"+list[i].CHAMP+".png\"/>";
			}
			gameDocCon += "</div></div></div>";
		}
		gameDocCon += "</div></div></div>";
	}
	else{
		gameDocCon += "<div class=\"emptyGameDocDiv\"></div>";
	}
	$(".gameDocDiv").html(gameDocCon);
}