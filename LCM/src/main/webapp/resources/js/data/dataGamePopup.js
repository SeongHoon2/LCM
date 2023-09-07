function getDataGamePopup(){
	var params = $("#dataGamePopupForm").serialize();
	$.ajax({
		type : "post",
		url : "/getDataGamePopupAjax",
		data : params,
		success : function(rcvData){
			drawDataGamePopup(rcvData.data, rcvData.list);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function drawDataGamePopup(data, list){
	var gameDocCon = "";
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
	$(".gameDocDiv").html(gameDocCon);
}