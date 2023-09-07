function updNotice(){
	var params = $("#adminNoticeForm").serialize();
	$.ajax({
		type : "post",
		url : "/updNoticeAjax",
		data : params,
		success : function(rcvData){
			alert("공지 수정을 완료하였습니다.");
			location.replace("/home/home");
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}