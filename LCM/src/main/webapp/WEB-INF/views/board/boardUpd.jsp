<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>LCM</title>
<link rel="stylesheet" href="/resources/css/board/board.css">
<link rel="stylesheet" href="/resources/css/board/boardWri.css">
<script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/js/board/board.js"></script>
<script src="//cdn.ckeditor.com/4.19.0/full/ckeditor.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	drawBoardMenu();
	
	CKEDITOR.replace('boardWriTextarea', {
		toolbar : [
			['Redo', 'Undo','-'],
			['Font', 'FontSize'],
			['Bold','Italic','Underline'],
			['TextColor', 'BGColor'],
			['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock']
		],
		height : 545,
		resize_enabled : false
	});
	
	CKEDITOR.instances.boardWriTextarea.on('instanceReady', function(event) {
		CKEDITOR.instances.boardWriTextarea.focus();
	});
	
	$("#boardConDiv_botWriBtn").on("click", function(){
		var titleTxt = $("#boardConDiv_Title").val().trim();
		if(titleTxt==""){
			alert("제목을 작성해주세요.");
			$("#boardTitle").focus();
		}
		else{
			var conTxt = CKEDITOR.instances.boardWriTextarea.getData();
			conTxt = conTxt.trim();
			if(conTxt==""){
				alert("내용을 작성해주세요.");
				CKEDITOR.instances.boardWriTextarea.focus();
			}
			else{
				$("#boardTitle").val(titleTxt);
				$("#boardCon").val(conTxt);
				var confirmBoard = confirm("글을 수정하시겠습니까?");
			    if(confirmBoard) {
			    	boardUpdate();
			    }
			}
		}
	});
	
	$("#boardConDiv_botBakBtn").on("click", function(){
		var confirmBoard = confirm("수정중인 글을 취소하시겠습니까?");
	    if(confirmBoard) {
			history.back();
	    }
	});
	
	setCKEditorDoc();
});

function boardUpdate(){
	var params = $("#boardCRUDForm").serialize();
	$.ajax({
		type : "post",
		url : "/boardUpdateAjax",
		data : params,
		success : function(rcvData){
			$("#boardCRUDForm").attr("action","/board/boardDoc");
			$("#boardCRUDForm").submit();
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}

</script>
</head>
<jsp:include page="/WEB-INF/views/layout/header.jsp" flush="false"></jsp:include>
<body>
	<div class="contentWrapDiv">
		<div class="boardDiv">
			<div class="boardMenuDiv">
			</div>
			<div class="boardConDiv">
			<div class="boardConDiv_top">
				<input type="text" placeHolder="제목" id="boardConDiv_Title" maxLength="50" class="boardConDiv_Title"/>
				<textarea id="boardWriTextarea"></textarea>
			</div>
			<div class="boardConDiv_bot">
				<input type="button" value="수정" id="boardConDiv_botWriBtn" class="boardConDiv_botBtn"/>
				<input type="button" value="취소" id="boardConDiv_botBakBtn" class="boardConDiv_botBtn"/>
			</div>
			</div>
		</div>
	</div>
	<form action="" method="post" id="boardCRUDForm">
		<input type="hidden" id="boardNo"    name="boardNo"  value="${param.boardNo}" />
		<input type="hidden" id="boardCtg"   name="boardCtg" value="${param.boardCtg}" />
		<input type="hidden" id="boardTitle" name="boardTitle" />
		<input type="hidden" id="boardCon"   name="boardCon" />
	</form>
</body>
<jsp:include page="/WEB-INF/views/layout/footer.jsp" flush="false"></jsp:include>
</html>