var flagKOR = ["대한민국", "미국", "일본", "유럽연합", "중국", "호주", "캐나다", "뉴질랜드"];
var flagENG = ["krw", "usd", "jpy", "eur", "cny", "aud", "cad", "nzd"];
var flagPaddingRightPx = [5, 32, 32, 5, 32, 32, 18, 5]; 

$(document).ready(function() {
	changeFlag(1, 1);
	changeFlag(2, 0);
	//http://community.fxkeb.com/fxportal/jsp/RS/DEPLOY_EXRATE/fxrate_all.html
	//http://fx.keb.co.kr/FER1101C.web?schID=fex&mID=FER1101C
});	

$('inputText1').on('keydown', function(event) {
    console.log(event.keyCode);
});

function changeFlag(input, flag) {
	var text = "";
	var text = text + "<table>";
	var text = text + "<tr><td>";
	var text = text + "<img src='./images/" + flagENG[flag] + ".png'>";
	var text = text + "<strong style='padding-left:5px; padding-right:" + flagPaddingRightPx[flag] + "px;'>" + flagKOR[flag] + "</strong>";
	var text = text + "<span class='caret'>";
	var text = text + "</td></tr>";
	var text = text + "<tr><td>" + flagENG[flag].toUpperCase() + "</td></tr>";
	var text = text + "</table>";
	$(".selectInfo" + input).html(text);
}












