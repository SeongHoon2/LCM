<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>LCM</title>
<link rel="stylesheet" href="/resources/css/data/dataGamePopup.css">
<link rel="stylesheet" href="/resources/css/layout/header.css">
<script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/js/data/dataGamePopup.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	getDataGamePopup();
});
</script>
</head>
<body>
	<div class="gameDocDiv">
	</div>
	<form action="" method="post" id="dataGamePopupForm">
		<input type="hidden" id="no" name="no" value="${param.no}"/>
	</form>
</body>
</html>