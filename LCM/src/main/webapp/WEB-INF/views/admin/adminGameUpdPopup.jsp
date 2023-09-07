<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>LCM</title>
<link rel="stylesheet" href="/resources/css/layout/header.css">
<link rel="stylesheet" href="/resources/css/admin/admin.css">
<link rel="stylesheet" href="/resources/css/admin/adminGameUpdPopup.css">
<link href="source/img/logo/favicon.png" sizes="16x16" rel="shortcut icon" type="image/x-icon">
<script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/js/admin/adminGameUpdPopup.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	$("#searchNickTxt").focus();
	getInitUsr();
	getUsrList();
	getChamp();
	
	$("#searchNickBtn").on("click", function(){
		$("#nickSearchTxt").val($("#searchNickTxt").val());
		getUsrList();
	});
	
	$("#searchNickTxt").on("keyup",function(key){
        if(key.keyCode==13) {
        	$("#nickSearchTxt").val($("#searchNickTxt").val());
    		getUsrList();
        }
    });
	
	$("#searchChampBtn").on("click", function(){
		$("#nickChampTxt").val($("#searchChampTxt").val());
		getChamp();
	});
	
	$("#searchChampTxt").on("keyup",function(key){
        if(key.keyCode==13) {
        	$("#nickChampTxt").val($("#searchChampTxt").val());
    		getChamp();
        }
    });
	
	$('#kTxt, #dTxt, #aTxt').on('keyup', function () {
	    $(this).val($(this).val().replace(/[^0-9]/g, ""));
	});
	
	$("#insGameBtn").on("click", function(){
		if($("#kTxt").val()==""){
			alert("킬을 입력하세요.");
			$("#kTxt").focus();
		}
		else if($("#dTxt").val()==""){
			alert("데스를 입력하세요.");
			$("#dTxt").focus();
		}
		else if($("#aTxt").val()==""){
			alert("어시스트를 입력하세요.");
			$("#aTxt").focus();
		}
		else if($("#champNo").val()==""){
			alert("챔피언을 선택하세요.");
			$("#searchChampTxt").focus();
		}
		else{
			$("#killTxt").val($("#kTxt").val());
			$("#deathTxt").val($("#dTxt").val());
			$("#assistTxt").val($("#aTxt").val());
			var confirmChk = confirm('경기 데이터를 수정하시겠습니까?\n기록만 수정되며, Elo에는 반영되지 않습니다.');
		    if(confirmChk) {
				updGameData();
		    }
		}
	});
});
</script>
</head>
<body>
	<div class="gameInsPopupDiv">
		<div class="titleDiv">경기 데이터 입력
		</div>
		<div class="conDiv">
			<div class="conDiv_img">
			</div>
			<div class="conDiv_con">
				<div class="conDiv_top">
				</div>
				<div class="conDiv_bot">
					<input type="text" class="kdaTxt" id="kTxt" maxLength="2" placeHolder="K"/>&nbsp;&nbsp;/&nbsp;
					<input type="text" class="kdaTxt" id="dTxt" maxLength="2" placeHolder="D"/>&nbsp;&nbsp;/&nbsp;
					<input type="text" class="kdaTxt" id="aTxt" maxLength="2" placeHolder="A"/>&nbsp;&nbsp;
					<input type="button" value="등록" class="insGameBtn" id="insGameBtn" />
				</div>
			</div>
		</div>
		<div class="titleDiv_2">선수 선택
		</div>
		<div class="nickDiv">
			<div class="nickDiv_top">
				<input type="text" maxLength="20" placeHolder="닉네임 검색" id="searchNickTxt" class="searchNickTxt"/>&nbsp;
				<img src="source/img/util/search.png" alt="search" id="searchNickBtn" class="searchNickBtn"/>
			</div>
			<div class="nickDiv_bot">
			</div>
		</div>
		<div class="champTitleDiv">챔피언 선택
		</div>
		<div class="champDiv">
			<div class="champDiv_top">
				<input type="text" maxLength="20" placeHolder="챔피언 검색" id="searchChampTxt" class="searchChampTxt"/>&nbsp;
				<img src="source/img/util/search.png" alt="search" id="searchChampBtn" class="searchChampBtn"/>
			</div>
			<div class="champDiv_bot">
			</div>
		</div>
	</div>
	<form action="#" method="post" id="gamePopupForm">
		<input type="hidden" id="flg" name="flg" value="${param.params}"/>
		<input type="hidden" id="no" name="no" value="${param.no}"/>
		<input type="hidden" id="nickSearchTxt" name="nickSearchTxt"/>
		<input type="hidden" id="nickChampTxt" name="nickChampTxt"/>
		<input type="hidden" id="email" name="email" />
		<input type="hidden" id="champNo" name="champNo"/>
		<input type="hidden" id="killTxt" name="killTxt"/>
		<input type="hidden" id="deathTxt" name="deathTxt"/>
		<input type="hidden" id="assistTxt" name="assistTxt"/>
	</form>
</body>
</html>