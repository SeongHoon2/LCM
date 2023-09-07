<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>LCM</title>
<link rel="stylesheet" href="/resources/css/board/board.css">
<link rel="stylesheet" href="/resources/css/board/boardDoc.css">
<script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/js/board/board.js"></script>
<script type="text/javascript" src="/resources/js/board/boardDoc.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	drawBoardMenu();
	getDrawBoardDoc();
	getDrawBoardReple();
	
	$("#repltWriBtn").on("click", function(){
		var repleTxt = $("#repleTxt").val().trim();
		if(repleTxt == ""){
			alert("댓글을 입력해주세요.");
		}
		else{
			repleTxt = repleTxt.replaceAll("\n","<br>");
			$("#boardReple").val(repleTxt);
			var confirmReple = confirm("댓글을 작성하시겠습니까?\n작성한 댓글은 수정이 불가능하며, 삭제만 가능합니다.");
			if(confirmReple){
				$("#boardReplePg").val("1");
				writeReple();
			}
		}
	});
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
				<div class="boardConDiv_docTitle">
					<div class="boardConDiv_docTitle_l">
					</div>
					<div class="boardConDiv_docTitle_r">
					</div>
				</div>
				<div class="boardConDiv_docDoc">
				</div>
				<div class="boardDocRepleDiv">
				</div>
				<div class="boardDocWriReple">
				<textarea maxLength="500" placeHolder="댓글을 입력해주세요. 작성한 댓글은 수정이 불가능하며, 삭제만 가능합니다." id="repleTxt" class="repleTxt"></textarea>
				<input type="button" value="작성" id="repltWriBtn" class="repltWriBtn"/>
				</div>
			</div>
		</div>
	</div>
	<form action="" method="post" id="boardCRUDForm">
		<input type="hidden" id="boardNo"         name="boardNo"      value="${param.boardNo}" />
		<input type="hidden" id="boardCtg"        name="boardCtg"     value="${param.boardCtg}"/>
		<input type="hidden" id="boardReple"      name="boardReple"/>
		<input type="hidden" id="boardReplePg"    name="boardReplePg" value="1"/>
		<input type="hidden" id="delRepNo"        name="delRepNo"/>
	</form>
</body>
<jsp:include page="/WEB-INF/views/layout/footer.jsp" flush="false"></jsp:include>
</html>