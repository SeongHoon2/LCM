function drawFooter(){
	var con = "";
	con += "<div class=\"footerDiv\">";
	con += "<button name=\"siteTerms\"    class=\"footerBtn\">이용 약관</button>&nbsp;|&nbsp;";
	con += "<button name=\"userTerms\"    class=\"footerBtn\">개인정보 처리방침</button>&nbsp;|&nbsp;";
	con += "<button name=\"licenseTerms\" class=\"footerBtn\">License</button>&nbsp;|&nbsp;&nbsp;";
	con += "<span>CopyRight 2023. Jeong Seong Hoon. All rights reserved.</span><br>";
	con += "<span>© 2023 LCM / LCM isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of"; 
	con += "Riot Games or anyone officially involved in producing or managing League of Legends.</span><br>";
	con += "<span>League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.</span>";
	con += "</div>";
	$(".footerWrapDiv").html(con);
	
	$(".footerBtn").on("click", function(){
		var popupName = $(this).attr("name");
		var width = "500";
		var height = "640";
		var left = Math.ceil((window.screen.width - width)/2);
	    var top = Math.ceil((window.screen.height - height)/2);
		window.open("/common/terms?" + popupName, "_blank", "width=" + width + ", height=" + height + ", left= " + left + ", top=" + top);
	});
}