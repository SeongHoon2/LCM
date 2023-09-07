<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>LCM</title>
<link rel="stylesheet" href="/resources/css/admin/admin.css">
<link rel="stylesheet" href="/resources/css/admin/adminNotice.css">
<script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/js/admin/admin.js"></script>
<script type="text/javascript" src="/resources/js/admin/adminNotice.js"></script>
<script src="//cdn.ckeditor.com/4.19.0/full/ckeditor.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	drawAdminMenu();
	
	CKEDITOR.replace('noticeTxt', {
		toolbar : [
			['Redo', 'Undo','-'],
			['Font', 'FontSize'],
			['Bold','Italic','Underline'],
			['TextColor', 'BGColor'],
			['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock']
		],
		height : 100,
		width : 254,
		resize_enabled : false
	});
	
	CKEDITOR.instances.noticeTxt.on('instanceReady', function(event) {
		CKEDITOR.instances.noticeTxt.focus();
	});
	
	$("#noticePreBtn").on("click", function(){
		var conTxt = CKEDITOR.instances.noticeTxt.getData();
		$(".adminNotice_pre").html(conTxt);
	});
	
	$("#noticeSavBtn").on("click", function(){
		var conTxt = CKEDITOR.instances.noticeTxt.getData();
		$("#noticeText").val(conTxt);
		var confirmChk = confirm('공지를 수정하시겠습니까?');
	    if(confirmChk) {
			updNotice();
	    }
	});
});
</script>
</head>
<jsp:include page="/WEB-INF/views/layout/header.jsp" flush="false"></jsp:include>
<body>
	<div class="contentWrapDiv">
		<div class="adminMenuBtnDiv">
		</div>
		<div class="adminConDiv">
			<div class="adminNoticeConDiv">
				<div class="adminNoticeConDiv_top">
					<div class="adminNoticeConDiv_top_left">
						<div class="adminNotice_wri">
							<textarea maxLength="500" placeHolder="공지를 입력해주세요" id="noticeTxt" class="noticeTxt"></textarea>
						</div>
					</div>
					<div class="adminNoticeConDiv_top_right">
						<div class="adminNotice_title">공지 미리보기(변환)
						</div>
						<div class="adminNotice_pre">
						</div>
					</div>
				</div>
				<div class="adminNoticeConDiv_bot">
					<input type="button" value="미리보기" class="noticeBtn" id="noticePreBtn"/>&nbsp;&nbsp;
					<input type="button" value="저장하기" class="noticeBtn" id="noticeSavBtn"/>
				</div>
			</div>
		</div>
	</div>
	<form action="" method="post" id="adminNoticeForm">
		<input type="hidden" id="noticeText" name="noticeText"/>
	</form>
</body>
<jsp:include page="/WEB-INF/views/layout/footer.jsp" flush="false"></jsp:include>
</html>