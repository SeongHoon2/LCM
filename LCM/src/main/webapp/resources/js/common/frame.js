function xxxx(){
	var params = $("#").serialize(); 
	$.ajax({
		type : "post",
		url : "/Ajax",
		dataType : "json",
		data : params,
		success : function(rcvData){
			
		},
		error : function(request, status, error){
			alert("Error");
			console.log("status : " + request.status);
			console.log("text : " + request.responseText);
			console.log("error : " + error);
		}
	});
}