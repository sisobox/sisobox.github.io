var flagKOR = ["대한민국", "미국", "일본", "유럽연합", "중국", "호주", "캐나다", "뉴질랜드"];
var flagENG = ["krw", "usd", "jpy", "eur", "cny", "aud", "cad", "nzd"];
var basicRate = [];

$(document).ready(function() {
	//환율 데이터 받아오기
	var data = {url:"http://community.fxkeb.com/fxportal/jsp/RS/DEPLOY_EXRATE/fxrate_all.html"};
	deferred = $.post("/getData", data);
	deferred.success(function(success) {
		//환율 데이터 기준 날짜 시간 뽑아서 보여주기
		var todayArray = success.split('<td width="420" height="28"><b><font color="#48668F">[');
		todayArray = todayArray[1].split(']</font></b></td>');
		todayArray = todayArray[0].split('&nbsp;');
		var day = todayArray[0];
		var time = todayArray[1].substring(0,5);
		$("#criteriaText").text("기준 : " + day + " " + time);
		//환율 데이터 테이블 뿌리기
		var tableArray = success.split('<table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">');
		tableArray = tableArray[1].split('</table></td>');
		$("#exchange_rate_table").html(tableArray[0]);
		init();
	});	
});	

function init() {
	//데이터 뽑아오는 기준
	//6매매기준율
	//2미국 3일본 4유럽연합 5중국 8캐나다 9호주 10뉴질랜드
	$("#exchange_rate_table tr").each(function() {
		basicRate.push($(this).find("td").eq(6).text());
	});
	var i = 0;
	$("#exchange_rate_list tbody tr").each(function() {
		if(i==0) {
			$(this).find("td").eq(1).text(basicRate[2]);
		} else if(i==1) {
			$(this).find("td").eq(1).text(basicRate[3]);
		} else if(i==2) {
			$(this).find("td").eq(1).text(basicRate[4]);
		} else if(i==3) {
			$(this).find("td").eq(1).text(basicRate[5]);
		} else if(i==4) {
			$(this).find("td").eq(1).text(basicRate[9]);
		} else if(i==5) {
			$(this).find("td").eq(1).text(basicRate[8]);
		} else if(i==6) {
			$(this).find("td").eq(1).text(basicRate[10]);
		}
		i = i + 1;
	});	
}

function changeFlag(input, flag) {
	$("#selectFlag" + input).attr("src", "./images/" + flagENG[flag] + ".png");
	$("#selectBtnText" + input).text(flagKOR[flag]);
	$("#selectEng" + input).text(flagENG[flag].toUpperCase());
}

function sum() {
	console.log("sum");
}











