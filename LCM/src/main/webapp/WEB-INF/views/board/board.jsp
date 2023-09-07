<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>LCM</title>
<link rel="stylesheet" href="/resources/css/board/board.css">
<script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/js/board/board.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	getDrawBoard();
});
</script>
</head>
<jsp:include page="/WEB-INF/views/layout/header.jsp" flush="false"></jsp:include>
<body>
	<div class="contentWrapDiv">
		<div class="boardDiv">
			<div class="boardMenuDiv">
			</div>
			<div class="boardConDiv">
				<div class="boardConDiv_doc">
				</div>
				<div class="boardConDiv_pg">
				</div>
			</div>
		</div>
	</div>
	<form action="" method="post" id="boardForm">
		<input type="hidden" id="boardNo"   name="boardNo"                              />
		<input type="hidden" id="boardCtg"  name="boardCtg"  value="${param.boardCtg}"  />
		<input type="hidden" id="boardPage" name="boardPage" value="${param.boardPage}" />
		<input type="hidden" id="sarchFlg"  name="sarchFlg"  value="${param.sarchFlg}"  />
		<input type="hidden" id="sarchTxt"  name="sarchTxt"  value="${param.sarchTxt}"  />
	</form>
</body>
<jsp:include page="/WEB-INF/views/layout/footer.jsp" flush="false"></jsp:include>
</html>