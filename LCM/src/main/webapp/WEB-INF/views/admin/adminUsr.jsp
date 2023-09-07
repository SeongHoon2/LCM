<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>LCM</title>
<link rel="stylesheet" href="/resources/css/admin/admin.css">
<link rel="stylesheet" href="/resources/css/admin/adminUsr.css">
<script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/js/admin/admin.js"></script>
<script type="text/javascript" src="/resources/js/admin/adminUsr.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	drawAdminMenu();
	getAdminUsr();
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
	<form action="" method="post" id="adminUsrForm">
		<input type="hidden" id="usrPg" name="usrPg" value="${param.usrPg}"/>
		<input type="hidden" id="usrNick" name="usrNick" value="${param.usrNick}"/>
		<input type="hidden" id="usrEmail" name="usrEmail"/>
	</form>
</body>
<jsp:include page="/WEB-INF/views/layout/footer.jsp" flush="false"></jsp:include>
</html>