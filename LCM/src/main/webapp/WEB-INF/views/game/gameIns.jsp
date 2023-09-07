<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>LCM</title>
<link rel="stylesheet" href="/resources/css/game/game.css">
<link rel="stylesheet" href="/resources/css/game/gameIns.css">
<script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/js/game/game.js"></script>
<script type="text/javascript" src="/resources/js/game/gameIns.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	if($("#pg").val()==""){
		$("#pg").val("1");
	}
	
	if($("#ym").val()==""){
		var date = new Date();
		var ye = date.getFullYear();
		var dt = date.getMonth();
		dt = parseInt(dt)+1;
		if(parseInt(dt)<10){
			$("#ym").val(ye+"-0"+dt);
		}
		else{
			$("#ym").val(ye+"-"+dt);
		}
	}
	
	drawGameMenu();
	getGameInsList();
	getGameInsDoc();
});
</script>
</head>
<jsp:include page="/WEB-INF/views/layout/header.jsp" flush="false"></jsp:include>
<body>
	<div class="contentWrapDiv">
		<div class="gameMenuBtnDiv">
		</div>
		<div class="gameConDiv">
			<div class="gameMenuDiv">
				<div class="gameMenuDiv_list">
				</div>
				<div class="gameMenuDiv_pg">
				</div>
			</div>
			<div class="gameDocDiv">
			</div>
		</div>
	</div>
	<form action="#" method="post" id="gameInsForm">
		<input type="hidden" id="pg" name="pg" value="${param.pg}"/>
		<input type="hidden" id="no" name="no" value="${param.no}"/>
		<input type="hidden" id="ym" name="ym" value="${param.ym}"/>
		<input type="hidden" id="win" name="win"/>
	</form>
</body>
<jsp:include page="/WEB-INF/views/layout/footer.jsp" flush="false"></jsp:include>
</html>