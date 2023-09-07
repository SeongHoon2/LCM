<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>LCM</title>
<link rel="stylesheet" href="/resources/css/user/login.css">
<script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/js/user/login.js"></script>
<script type="text/javascript" src="/resources/js/common/terms.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	drawInitLogin();
});

</script>
</head>
<jsp:include page="/WEB-INF/views/layout/header.jsp" flush="false"></jsp:include>
<body>
	<div class="contentWrapDiv">
	</div>
	<form action="#" method="post" id="loginForm">
		<input type="hidden" value="#" id="email" name="email">
		<input type="hidden" value="#" id="pw" name="pw">
	</form>
	<form action="#" method="post" id="joinForm">
		<input type="hidden" value="#" id="joinForm_email" name="email">
		<input type="hidden" value="#" id="joinForm_pw"    name="pw">
	</form>
	<form action="#" method="post" id="findForm">
		<input type="hidden" value="#" id="findForm_email" name="email">
	</form>
	<form action="#" method="post" id="authForm">
		<input type="hidden" value="#" id="authForm_email" name="email">
		<input type="hidden" value="#" id="authForm_auth"  name="email_auth">
	</form>
</body>
<jsp:include page="/WEB-INF/views/layout/footer.jsp" flush="false"></jsp:include>
</html>