var flagKOR = ["대한민국", "미국", "일본", "유럽연합", "중국", "호주", "캐나다", "뉴질랜드"];
var flagENG = ["krw", "usd", "jpy", "eur", "cny", "aud", "cad", "nzd"];

$(document).ready(function() {
	//환율 데이터 받아오기
	var data = {url:"http://community.fxkeb.com/fxportal/jsp/RS/DEPLOY_EXRATE/fxrate_all.html"};
	deferred = $.post("/getData", data);
	deferred.success(function(success) {
		$("#exchange_rate_table").html(success);
	});	
});	

function changeFlag(input, flag) {
	$("#selectFlag" + input).attr("src", "./images/" + flagENG[flag] + ".png");
	$("#selectBtnText" + input).text(flagKOR[flag]);
	$("#selectEng" + input).text(flagENG[flag].toUpperCase());
}












