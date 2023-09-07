function getGameMakeMenu(){
	$.ajax({
		type : "post",
		url : "/getGameMakeMenuAjax",
		success : function(rcvData){
			drawGameMakeMenu(rcvData.list);
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

function drawGameMakeMenu(list){
	var gameMakeVar = "";
	gameMakeVar += "<div class=\"gameMakeDiv\">";
	gameMakeVar += "<div class=\"gameMake_conDiv\">";
	gameMakeVar += "<div class=\"gameMake_midDiv\">";
	gameMakeVar += "<div class=\"gameMake_midDiv_secDiv\">";
	gameMakeVar += "<div class=\"gameMake_midDiv_secDiv_l\">경기 명 : </div>";
	gameMakeVar += "<div class=\"gameMake_midDiv_secDiv_r\">&nbsp;&nbsp;";
	gameMakeVar += "<input type=\"text\" class=\"gameMake_addTxt\" id=\"gameMake_addTxt\" maxLength=\"30\" />";
	gameMakeVar += "</div></div>";
	gameMakeVar += "<div class=\"gameMake_midDiv_secDiv\">";
	gameMakeVar += "<div class=\"gameMake_midDiv_secDiv_l\">경기 일시 : </div>";
	gameMakeVar += "<div class=\"gameMake_midDiv_secDiv_r\">&nbsp;&nbsp;";
	gameMakeVar += "<div class=\"gameMake_midDiv_secDiv_r_div\">";
	gameMakeVar += "<input type=\"text\" class=\"gameMake_wdateTxt\" id=\"gameMake_yyTxt\" maxLength=\"2\" placeHolder=\"연\" />&nbsp;/&nbsp;";
	gameMakeVar += "</div>";
	gameMakeVar += "<div class=\"gameMake_midDiv_secDiv_r_div\">";
	gameMakeVar += "<input type=\"text\" class=\"gameMake_wdateTxt\" id=\"gameMake_mmTxt\" maxLength=\"2\" placeHolder=\"월\" />&nbsp;/&nbsp;";
	gameMakeVar += "</div>";
	gameMakeVar += "<div class=\"gameMake_midDiv_secDiv_r_div\">";
	gameMakeVar += "<input type=\"text\" class=\"gameMake_wdateTxt\" id=\"gameMake_ddTxt\" maxLength=\"2\" placeHolder=\"일\" />&nbsp;&nbsp;&nbsp;";
	gameMakeVar += "</div>";
	gameMakeVar += "<div class=\"gameMake_midDiv_secDiv_r_div\">";
	gameMakeVar += "<input type=\"text\" class=\"gameMake_wdateTxt\" id=\"gameMake_hhTxt\" maxLength=\"2\" placeHolder=\"시간\" />&nbsp;:&nbsp;";
	gameMakeVar += "</div>";
	gameMakeVar += "<div class=\"gameMake_midDiv_secDiv_r_div\">";
	gameMakeVar += "<input type=\"text\" class=\"gameMake_wdateTxt\" id=\"gameMake_mTxt\" maxLength=\"2\" placeHolder=\"분\" />";
	gameMakeVar += "</div></div></div>";
	gameMakeVar += "<div class=\"gameMake_midDiv_firDiv\">";
	gameMakeVar += "<div class=\"gameMake_midDiv_firDiv_l\"></div>";
	gameMakeVar += "<div class=\"gameMake_midDiv_firDiv_r\">&nbsp;&nbsp;&nbsp;Ex) 23/06/10 21:42</div></div>";
	gameMakeVar += "<div class=\"gameMake_midDiv_secDiv_gubun\">";
	gameMakeVar += "<div class=\"gameMake_midDiv_secDiv_l\">경기 구분 : </div>";
	gameMakeVar += "<div class=\"gameMake_midDiv_secDiv_r\">&nbsp;";
	gameMakeVar += "<input type=\"checkBox\" class=\"gameMake_chkBox\" id=\"gameMake_chkBox_g\"/><span style=\"font-size : 12px\">공식</span>&nbsp;&nbsp;";
	gameMakeVar += "<input type=\"checkBox\" class=\"gameMake_chkBox\" id=\"gameMake_chkBox_s\"/><span style=\"font-size : 12px\">사설<span>";
	gameMakeVar += "</div></div>";
	gameMakeVar += "<div class=\"gameMake_midDiv_firDiv\" style=\"margin-top : 0px;\">";
	gameMakeVar += "<div class=\"gameMake_midDiv_firDiv_l\"></div>";
	gameMakeVar += "<div class=\"gameMake_midDiv_firDiv_r\">&nbsp;&nbsp;&nbsp;Elo 반영은 공식 경기에만 적용됩니다.</div></div></div>";
	gameMakeVar += "<div class=\"gameMake_botDiv\">";
	gameMakeVar += "<input type=\"button\" value=\"생성\" class=\"gameMake_addBtn\" id=\"gameMake_addBtn\"/>";
	gameMakeVar += "</div></div></div>";
	gameMakeVar += "<div class=\"gameMake_conDiv_Hist\">";
	gameMakeVar += "<div class=\"gameHistDiv_t\">최근 생성 이력</div>";  
	gameMakeVar += "<div class=\"gameHistConDiv\">";
	gameMakeVar += "<div class=\"gameHistConDiv_title\">";
	gameMakeVar += "<div class=\"gameHistConDiv_title_div\" style=\"width:46%\";\">경기 명</div>";
	gameMakeVar += "<div class=\"gameHistConDiv_title_div\" style=\"width:6%\";\">구분</div>";
	gameMakeVar += "<div class=\"gameHistConDiv_title_div\" style=\"width:25%\";\">생성자</div>";
	gameMakeVar += "<div class=\"gameHistConDiv_title_div\" style=\"width:14%\";\">경기 일시</div>";
	gameMakeVar += "<div class=\"gameHistConDiv_title_div\" style=\"width:9%\";\">반영 여부</div>";
	gameMakeVar += "</div>";
	if(list.length==0){
		gameMakeVar += "<div class=\"gameHistConDiv_con_div\" style=\"width:100%\";\">이력이 존재하지 않습니다.</div>";
		for(var i=0; i<4; i++){
			gameMakeVar += "<div class=\"gameHistConDiv_con_div\" style=\"width:100%\";\"></div>";
		}
	}
	else{
		for(var i=0; i<list.length; i++){
			gameMakeVar += "<div class=\"gameHistConDiv_divHover\">";
			gameMakeVar += "<div class=\"gameHistConDiv_con_div\" style=\"width:46%\";\">"+list[i].NAME+"</div>";
			gameMakeVar += "<div class=\"gameHistConDiv_con_div\" style=\"width:6%\";\">"+list[i].REG_FLG+"</div>";
			gameMakeVar += "<div class=\"gameHistConDiv_con_div\" style=\"width:25%\";\">"+list[i].NICK+"</div>";
			gameMakeVar += "<div class=\"gameHistConDiv_con_div\" style=\"width:14%\";\">"+list[i].WDATE+"</div>";
			if(list[i].REF_FLG=="미반영"){
				gameMakeVar += "<div class=\"gameHistConDiv_con_div\" style=\"width:9%\";>";
				gameMakeVar += "<span style=\"color:red; font-weight:bold;\">"+list[i].REF_FLG+"</span>";
				gameMakeVar += "</div>";
			}
			else{
				gameMakeVar += "<div class=\"gameHistConDiv_con_div\" style=\"width:9%\";>";
				gameMakeVar += "<span style=\"color:blue; font-weight:bold;\">"+list[i].REF_FLG+"</span>";
				gameMakeVar += "</div>";
			}
			gameMakeVar += "</div>"; 
		}
		for(var i=0; i<5-list.length; i++){
			gameMakeVar += "<div class=\"gameHistConDiv_con_div\" style=\"width : 100%\";\"></div>";
		}
	}
	gameMakeVar += "</div>";
	$(".gameConDiv").html(gameMakeVar);
	
	$("#gameMake_chkBox_g").prop('checked',true);
	
	$("#gameMake_chkBox_s").on("click", function(){
		$("#gameMake_chkBox_s").prop('checked',true);
		$("#gameMake_chkBox_g").prop('checked',false);
	});
	
	$("#gameMake_chkBox_g").on("click", function(){
		$("#gameMake_chkBox_g").prop('checked',true);
		$("#gameMake_chkBox_s").prop('checked',false);
	});
	
	var Y_pattern = /^[1-4]\d{1}$/; 
	var M_pattern = /^(0[1-9]|1[012])$/; 
	var D_pattern = /^(0[1-9]|[12][0-9]|3[0-1])$/; 
	var H_pattern = /^(0[0-9]|1[0-9]|2[0-3])$/; 
	var m_pattern = /^([0-5][0-9])$/;
	
	$("#gameMake_addBtn").on("click", function(){
		var yyTxt = $("#gameMake_yyTxt").val();
		var mmTxt = $("#gameMake_mmTxt").val();
		var ddTxt = $("#gameMake_ddTxt").val();
		var hhTxt = $("#gameMake_hhTxt").val();
		var mTxt  = $("#gameMake_mTxt").val();
		var nmTxt = $("#gameMake_addTxt").val().trim();
		var gb = "";
		if($("#gameMake_chkBox_g").is(":checked")){
			gb = "0";
		}
		else{
			gb = "1";
		}
		
		if(nmTxt==""){
			alert("경기 명을 입력해주세요.");
		}
		else if(!Y_pattern.test(yyTxt)){
			alert("연도 형식을 확인해주세요\nEx) 23");
		}
		else if(!M_pattern.test(mmTxt)){
			alert("월 형식을 확인해주세요\nEx) 03");
		}
		else if(!D_pattern.test(ddTxt)){
			alert("일 형식을 확인해주세요\nEx) 06");
		}
		else if(!H_pattern.test(hhTxt)){
			alert("시간 형식을 확인해주세요\nEx) 오전7시 : 07\n     오후7시 : 21");
		}
		else if(!m_pattern.test(mTxt)){
			alert("분 형식을 확인해주세요\nEx) 03");
		}
		else{
			var confirmFlg = confirm("경기를 생성하시겠습니까?");
			if(confirmFlg){
				$("#gm_NM").val(nmTxt);
				$("#gm_DATE").val("20"+yyTxt+"-"+mmTxt+"-"+ddTxt+" "+hhTxt+":"+mTxt);
				$("#gm_GUBUN").val(gb);
				makeGame()
			}
		}
	});
}

function makeGame(){
	var params = $("#gameMakeForm").serialize();
	$.ajax({
		type : "post",
		url : "/makeGameAjax",
		data : params,
		success : function(rcvData){
			alert("경기 생성을 완료하였습니다.");
			location.replace("/game/gameIns");
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}