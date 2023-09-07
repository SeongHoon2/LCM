<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>LCM</title>
<link rel="stylesheet" href="/resources/css/game/game.css">
<link rel="stylesheet" href="/resources/css/game/gameMake.css">
<script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/js/game/game.js"></script>
<script type="text/javascript" src="/resources/js/game/gameMake.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	drawGameMenu();
	getGameMakeMenu();
});
</script>
</head>
<jsp:include page="/WEB-INF/views/layout/header.jsp" flush="false"></jsp:include>
<body>
	<div class="contentWrapDiv">
		<div class="gameMenuBtnDiv">
		</div>
		<div class="gameConDiv">
		</div>
	</div>
	<form action="" method="post" id="gameMakeForm">
		<input type="hidden" id="gm_NM" name="gm_NM"/>
		<input type="hidden" id="gm_DATE" name="gm_DATE"/>
		<input type="hidden" id="gm_GUBUN" name="gm_GUBUN"/>
	</form>
</body>
<jsp:include page="/WEB-INF/views/layout/footer.jsp" flush="false"></jsp:include>
</html>