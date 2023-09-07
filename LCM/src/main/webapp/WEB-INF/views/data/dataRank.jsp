<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>LCM</title>
<link rel="stylesheet" href="/resources/css/data/data.css">
<link rel="stylesheet" href="/resources/css/data/dataRank.css">
<script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/js/data/data.js"></script>
<script type="text/javascript" src="/resources/js/data/dataRank.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	drawDataMenu();
	drawDataCon();
});
</script>
</head>
<jsp:include page="/WEB-INF/views/layout/header.jsp" flush="false"></jsp:include>
<body>
	<div class="contentWrapDiv">
		<div class="dataMenuBtnDiv"></div>
		<div class="dataConDiv">
			<div class="dataConDiv_frame">
				<div class="dataRankDiv">
					<div class="dataRankDiv_list"></div>
					<div class="dataRankDiv_pg"></div>
				</div>
				<div class="dataEloDiv">
				    <div class="dataEloHistDiv_title">Elo 반영 기록
				    </div>
					<div class="dataEloHistDiv">
						<div class="dataEloHistDiv_empty"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<form action="" method="post" id="dataRankForm">
		<input type="hidden" id="rnkPg" name="rnkPg" value="${param.rnkPg}"/>
		<input type="hidden" id="rnkEmail" name="rnkEmail" value="${param.rnkEmail}"/>
		<input type="hidden" id="histPg" name="histPg" value="${param.histPg}"/>
	</form>
</body>
<jsp:include page="/WEB-INF/views/layout/footer.jsp" flush="false"></jsp:include>
</html>