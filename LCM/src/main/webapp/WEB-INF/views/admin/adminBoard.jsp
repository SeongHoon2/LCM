<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>LCM</title>
<link rel="stylesheet" href="/resources/css/admin/admin.css">
<link rel="stylesheet" href="/resources/css/admin/adminBoard.css">
<script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/js/admin/admin.js"></script>
<script type="text/javascript" src="/resources/js/admin/adminBoard.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	drawAdminMenu();
	getAdminBoard();
});
</script>
</head>
<jsp:include page="/WEB-INF/views/layout/header.jsp" flush="false"></jsp:include>
<body>
	<div class="contentWrapDiv">
		<div class="adminMenuBtnDiv">
		</div>
		<div class="adminConDiv">
		</div>
	</div>
	<form action="" method="post" id="adminBoardForm">
		<input type="hidden" id="addAdminBoardTxt" name="addAdminBoardTxt"/>
		<input type="hidden" id="ctgDelNo"         name="ctgDelNo"/>	
		<input type="hidden" id="ctgUpdNm"         name="ctgUpdNm"/>	
		<input type="hidden" id="ctgUpd"           name="ctgUpd"/>	
	</form>
</body>
<jsp:include page="/WEB-INF/views/layout/footer.jsp" flush="false"></jsp:include>
</html>