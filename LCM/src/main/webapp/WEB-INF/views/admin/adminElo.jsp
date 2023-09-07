<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>LCM</title>
<link rel="stylesheet" href="/resources/css/admin/admin.css">
<link rel="stylesheet" href="/resources/css/admin/adminElo.css">
<script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/js/admin/admin.js"></script>
<script type="text/javascript" src="/resources/js/admin/adminElo.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	$("#searchNickTxt").focus();
	drawAdminMenu();
	getAdminEloUsr();
	$("#searchNickBtn").on("click", function(){
		$("#usrNick").val($("#searchNickTxt").val());
		$("#usrPg").val("1");
		$("#adminEloForm").attr("action","/admin/adminElo");
		$("#adminEloForm").submit();
	});
	
	$("#searchNickTxt").on("keyup",function(key){
        if(key.keyCode==13) {
    		$("#usrNick").val($("#searchNickTxt").val());
    		$("#usrPg").val("1");
    		$("#adminEloForm").attr("action","/admin/adminElo");
    		$("#adminEloForm").submit();
        }
    });
	
	if($("#usrNick").val()!=""){
		$("#searchNickTxt").val($("#usrNick").val());
	}
	
	if($("#usrEmail").val()!=""){
		getAdminEloList();
	}
	
	$('#scoreTxt').on('keyup', function () {
	    $(this).val($(this).val().replace(/[^0-9]/g, ""));
	});
	
	$("#plusBtn").on("click", function(){
		$("#minusBtn").prop('checked',false);
		$("#eloPm").val("p");
	});
	
	$("#minusBtn").on("click", function(){
		$("#plusBtn").prop('checked',false);
		$("#eloPm").val("m");
	});
	
	$("#refBtn").on("click", function(){
		if($("#usrEmail").val()==""){
			alert("사용자를 선택해주세요.");
		}
		else if($("#eloPm").val()==""){
			alert("+, - 중 하나를 선택해주세요.");
		}
		else if($("#scoreTxt").val().trim()==""){
			alert("점수를 입력해주세요.");
		}
		else{
			$("#eloSc").val($("#scoreTxt").val());
			$("#eloNote").val($("#noteTxt").val());
			var confirmChk = confirm('Elo를 수정하시겠습니까?\n반영된 Elo는 수정이 불가능합니다.');
		    if(confirmChk) {
				updEloHist();
		    }
		}
	});
	
	$("#refClanBtn").on("click", function(){
		var confirmChk = confirm('클랜원 전체의 Elo를 초기화하시겠습니까?\n반영된 Elo는 수정이 불가능합니다.');
	    if(confirmChk) {
			initElo();
	    }
	});
});
</script>
</head>
<jsp:include page="/WEB-INF/views/layout/header.jsp" flush="false"></jsp:include>
<body>
	<div class="contentWrapDiv">
		<div class="adminMenuBtnDiv">
		</div>
		<div class="adminConDiv">
			<div class="adminEloConDiv">
				<div class="adminEloUsrDiv">
					<div class="adminEloUsrDiv_top">
						<input type="text" placeHolder="닉네임 검색" maxLength="16" class="searchNickTxt" id="searchNickTxt" />&nbsp;
						<img alt="search" class="searchNickBtn" id="searchNickBtn" src="source/img/util/search.png">
					</div>
					<div class="adminEloUsrDiv_list_title">닉네임</div>
					<div class="adminEloUsrDiv_list"></div>
					<div class="adminEloUsrDiv_pg"></div>
				</div>
				<div class="adminEloDocDiv">
					<div class="eloHistDiv">
						<div class="eloHistDiv_empty"></div>
					</div>
					<div class="eloWriteDiv">
						<div class="eloWriteDiv_txtDiv">
						<div class="eloWriteDiv_txtDiv_l">
							<div class="eloWriteDiv_txtDiv_l_t">
								<span style="color:#2C55CD;font-weight:bold;font-size:18px;">+</span>
								<input type="radio" id="plusBtn" class="plusBtn"/>
							</div>
							<div class="eloWriteDiv_txtDiv_l_b">
								<span style="color:#CD2C2C;font-weight:bold;font-size:18px;">-</span>&nbsp;
								<input type="radio" id="minusBtn" class="minusBtn"/>
							</div>
						</div>
						<div class="eloWriteDiv_txtDiv_m">
							<input type="text" maxLength="3" placeHolder="점수" class="scoreTxt" id="scoreTxt" />
						</div>
						<div class="eloWriteDiv_txtDiv_r">
							<input type="text" maxLength="25" placeHolder="비고" class="noteTxt" id="noteTxt" />
						</div>
						</div>
						<div class="eloWriteDiv_btnDiv">
							<input type="button" value="반영하기" class="refBtn" id="refBtn"/>
						</div>
					</div>
					<div class="eloWriteDiv_refDiv">
						<input type="button" style="color:#CD2C2C" value="클랜원 전체 초기화" class="refBtn" id="refClanBtn"/>
					</div>
				</div>
			</div>
		</div>
	</div>
	<form action="" method="post" id="adminEloForm">
		<input type="hidden" id="usrPg" name="usrPg" value="${param.usrPg}"/>
		<input type="hidden" id="usrNick" name="usrNick" value="${param.usrNick}"/>
		<input type="hidden" id="eloPg" name="eloPg" value="${param.eloPg}"/>
		<input type="hidden" id="usrEmail" name="usrEmail" value="${param.usrEmail}"/>
		<input type="hidden" id="eloPm" name="eloPm"/>
		<input type="hidden" id="eloSc" name="eloSc"/>
		<input type="hidden" id="eloNote" name="eloNote"/>
	</form>
</body>
<jsp:include page="/WEB-INF/views/layout/footer.jsp" flush="false"></jsp:include>
</html>