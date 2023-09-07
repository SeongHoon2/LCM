<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>LCM</title>
<link rel="stylesheet" href="/resources/css/data/data.css">
<link rel="stylesheet" href="/resources/css/data/dataRecord.css">
<script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/js/data/data.js"></script>
<script type="text/javascript" src="/resources/js/data/dataRecord.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	drawDataMenu();
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
	
	getDataList();
	getDataDoc();
});
</script>
</head>
<jsp:include page="/WEB-INF/views/layout/header.jsp" flush="false"></jsp:include>
<body>
	<div class="contentWrapDiv">
		<div class="dataMenuBtnDiv">
		</div>
		<div class="dataConDiv">
			<div class="dataGameDiv">
				<div class="dataGameDiv_list">
				</div>
				<div class="dataGameDiv_pg">
				</div>
			</div>
			<div class="gameDocDiv">
			</div>
		</div>
	</div>
	<form action="" method="post" id="dataRecordForm">
		<input type="hidden" id="pg" name="pg" value="${param.pg}"/>
		<input type="hidden" id="no" name="no" value="${param.no}"/>
		<input type="hidden" id="ym" name="ym" value="${param.ym}"/>
	</form>
</body>
<jsp:include page="/WEB-INF/views/layout/footer.jsp" flush="false"></jsp:include>
</html>