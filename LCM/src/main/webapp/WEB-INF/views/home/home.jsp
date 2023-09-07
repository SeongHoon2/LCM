<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>LCM</title>
<link rel="stylesheet" href="/resources/css/home/home.css">
<script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/js/home/home.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	drawInitHome();
});
</script>
</head>
<jsp:include page="/WEB-INF/views/layout/header.jsp" flush="false"></jsp:include>
<body>
	<div class="contentWrapDiv">
	</div>
	<form action="#" method="post" id="joinClanForm">
		<input type="hidden" value="#" id="clanNm" name="clan">
		<input type="hidden" value="#" id="clanNick" name="nick">
	</form>
	<form action="#" method="post" id="makeClanForm">
		<input type="hidden" value="#" id="makeClanNm" name="clan">
		<input type="hidden" value="#" id="makeClanNick" name="nick">
	</form>
	<form action="#" method="post" id="homeForm">
		<input type="hidden" value="#" id="eloPg" name="eloPg">
		<input type="hidden" value="#" id="gamePg" name="gamePg">
		<input type="hidden" value="#" id="searchFlg" name="flg">
		<input type="hidden" value="#" id="searchNick" name="nick">
		<input type="hidden" value="#" id="boardNo" name="boardNo">
		<input type="hidden" value="#" id="boardCtg" name="boardCtg">
	</form>
</body>
<jsp:include page="/WEB-INF/views/layout/footer.jsp" flush="false"></jsp:include>
</html>