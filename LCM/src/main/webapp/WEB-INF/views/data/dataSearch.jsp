<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>LCM</title>
<link rel="stylesheet" href="/resources/css/data/data.css">
<link rel="stylesheet" href="/resources/css/data/dataSearch.css">
<script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/js/data/data.js"></script>
<script type="text/javascript" src="/resources/js/data/dataSearch.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	$("#idTxt").focus();
	drawDataMenu();
	
	if($("#gamePg").val()==""){
		$("#gamePg").val("1");
	}
	if($("#dataPg1").val()==""){
		$("#dataPg1").val("1");
	}
	if($("#dataPg2").val()==""){
		$("#dataPg2").val("1");
	}
	if($("#dataPg3").val()==""){
		$("#dataPg3").val("1");
	}
	
	$("#searchBtn").on("click", function(){
		if($("#idTxt").val().trim()==""){
			alert("검색어를 입력해주세요.");
		}
		else{
			$("#nick").val($("#idTxt").val());
			$("#idTxt").val("");
			chkSearch();
		}
	});
	
	$("#idTxt").on("keyup",function(key){
        if(key.keyCode==13) {
        	if($("#idTxt").val().trim()==""){
    			alert("검색어를 입력해주세요.");
    		}
    		else{
    			$("#nick").val($("#idTxt").val());
    			$("#idTxt").val("");
    			chkSearch();
    		}
        }
    });
	
	$("#totalBtn").on("click", function(){
		chkSearch();
	});
	
	$("#dataBtn").on("click", function(){
		$("#dataPg1").val("1");
		$("#dataPg2").val("1");
		$("#dataPg3").val("1");
		initSearchData();
	});
	
	if($("#flg").val()=="1"){
		chkSearch();
	}
});
</script>
</head>
<jsp:include page="/WEB-INF/views/layout/header.jsp" flush="false"></jsp:include>
<body>
	<div class="contentWrapDiv">
		<div class="dataMenuBtnDiv">
		</div>
		<div class="dataConDiv">
			<div class="dataSearch_title">
				<input type="text" class="idTxt" id="idTxt" />&nbsp;&nbsp;
				<img alt="search" src="source/img/util/search.png" id="searchBtn">
			</div>
			<div class="dataSearch_menu">
				<input type="button" value="종합" class="dataSubMenuBtn" id="totalBtn" />&nbsp;&nbsp;
				<input type="button" value="통계" class="dataSubMenuBtn" id="dataBtn" />
			</div>
			<div class="dataSearch_con_blank">
			</div>
			<div class="dataSearch_con_total">
				<div class="totalDiv_left">
					<div class="totalDiv_left_top">
					</div>
					<div class="totalDiv_left_bot">
					</div>
				</div>
				<div class="totalDiv_right">
				<div class="totalDiv_right_list">
				</div>
				<div class="totalDiv_right_pb">
				</div>
				</div>
			</div>
			<div class="dataSearch_con_data">
				<div class="dataDiv_left">
					<div class="dataDiv_left_top">Most Pick
					</div>
					<div class="dataDiv_left_list">
					</div>
					<div class="dataDiv_left_pb">
					</div>
				</div>
				<div class="dataDiv_mid">
					<div class="dataDiv_mid_top">Highest Win Rate
					</div>
					<div class="dataDiv_mid_list">
					</div>
					<div class="dataDiv_mid_pb">
					</div>
				</div>
				<div class="dataDiv_right">
					<div class="dataDiv_right_top">Highest KDA
					</div>
					<div class="dataDiv_right_list">
					</div>
					<div class="dataDiv_right_pb">
					</div>
				</div>
			</div>
		</div>
	</div>
	<form action="" method="post" id="dataSearchForm">
		<input type="hidden" id="flg" value="${param.flg}"/>
		<input type="hidden" id="nick" name="nick" value="${param.nick}"/>
		<input type="hidden" id="gamePg" name="gamePg" value="${param.gamePg}"/>
		<input type="hidden" id="dataPg1" name="dataPg1" value="${param.dataPg1}"/>
		<input type="hidden" id="dataPg2" name="dataPg2" value="${param.dataPg2}"/>
		<input type="hidden" id="dataPg3" name="dataPg3" value="${param.dataPg3}"/>
	</form>
</body>
<jsp:include page="/WEB-INF/views/layout/footer.jsp" flush="false"></jsp:include>
</html>