<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>header</title>
<link href="source/img/logo/favicon.png" sizes="16x16" rel="shortcut icon" type="image/x-icon">
<link rel="stylesheet" href="/resources/css/layout/header.css">
<script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/js/layout/header.js"></script>
<script type="text/javascript" src="/resources/js/common/common.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	checkLogin();

	var urlTxt = $(location).attr('pathname').trim().split("/")[1];
	if(urlTxt!="user"){
		urlTxt = "btn"+urlTxt;
	    $("#"+urlTxt).removeClass("menuBtn");
	    $("#"+urlTxt).addClass("menuBtnSelect");
	}

	$(".menuBtn, .menuBtnSelect").on("click", function(){
		var url = "/"+$(this).attr("name");
		location.replace(url);
	});
	
});

</script>
</head>
<body>
	<div class="headerWrapDiv">
		<div class="bannerDiv">
		    <div class="logoDIv">
		    	<img alt="logo" src="source/img/logo/logo.png" class="logoDiv_logoImg">
		    </div>
		    <div class="loginDiv">
		    </div>
	    </div>
	    <div class="menuDiv">
		    <button type="button" id="btnhome"  class="menuBtn" name="home/home"      >홈</button>
		    <button type="button" id="btnboard" class="menuBtn" name="board/board"    >게시판</button>
		    <button type="button" id="btngame"  class="menuBtn" name="game/gameIns"   >경기</button>
		    <button type="button" id="btndata"  class="menuBtn" name="data/dataRecord">데이터</button>
		    <button type="button" id="btnadmin" class="menuBtn" name="admin/adminUsr" >관리</button>
	    </div>
	</div>
</body>
</html>