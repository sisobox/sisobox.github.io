/*
	데이터 뽑아오는 기준
	6매매기준율
	0한국 3미국 4일본 5유럽연합 6중국 9캐나다 10호주 11뉴질랜드
*/
var flagKOR = ["대한민국", "미국", "일본", "유럽연합", "중국", "호주", "캐나다", "뉴질랜드"];
var flagENG = ["krw", "usd", "jpy", "eur", "cny", "aud", "cad", "nzd"];
var flagNum = [0, 3, 4, 5, 6, 10, 9, 11];
var flagBill = ["원", "", "", "달러", "엔", "유로", "위안", "", "", "달러", "달러", "달러"];
var basicRate = []; //매매기준율
var oneFlag = 3; //첫번째 선택된 나라
var twoFlag = 0; //두번째 선택된 나라
var resultSum = 2; //계산 결과 위치

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
	basicRate.push(1);
	$("#exchange_rate_table tr").each(function() {
		basicRate.push($(this).find("td").eq(6).text());
	});
	var i = 0;
	$("#exchange_rate_list tbody tr").each(function() {
		if(i==0) {
			$(this).find("td").eq(1).text(comma(basicRate[3]));
		} else if(i==1) {
			$(this).find("td").eq(1).text(comma(basicRate[4]));
		} else if(i==2) {
			$(this).find("td").eq(1).text(comma(basicRate[5]));
		} else if(i==3) {
			$(this).find("td").eq(1).text(comma(basicRate[6]));
		} else if(i==4) {
			$(this).find("td").eq(1).text(comma(basicRate[10]));
		} else if(i==5) {
			$(this).find("td").eq(1).text(comma(basicRate[9]));
		} else if(i==6) {
			$(this).find("td").eq(1).text(comma(basicRate[11]));
		}
		i = i + 1;
	});	
}

function changeFlag(input, flag) {
	$("#selectFlag" + input).attr("src", "./images/" + flagENG[flag] + ".png");
	$("#selectBtnText" + input).text(flagKOR[flag]);
	$("#selectEng" + input).text(flagENG[flag].toUpperCase());
	if(input == 1) {
		oneFlag = flagNum[flag];
		sum(resultSum);
	} else if(input == 2) {
		twoFlag = flagNum[flag];
		sum(resultSum);	
	}
}

function sum(num) {
	resultSum = num;
	document.getElementById("titleMoney1").value = uncomma(document.getElementById("titleMoney1").value);
	document.getElementById("titleMoney2").value = uncomma(document.getElementById("titleMoney2").value);
	if(document.getElementById("titleMoney1").value == "") {
		document.getElementById("titleMoney1").value = 0;
	}
	if(document.getElementById("titleMoney2").value == "") {
		document.getElementById("titleMoney2").value = 0;
	}
	
	if(resultSum == 1) {
		var money = parseInt(document.getElementById("titleMoney2").value);
		var result = basicRate[twoFlag] * money / basicRate[oneFlag];
		//일본이 포함될경우 계산식
		if(oneFlag == 4 && twoFlag != 4) {
			result = result * 100;
		} else if(twoFlag == 4 && oneFlag != 4) {
			result = result / 100;
		}
		document.getElementById("titleMoney2").value = comma(money);
		document.getElementById("titleMoney1").value = comma(result.toFixed(2));
		subMoneyText(parseInt(result), money);		
	} else if(resultSum == 2) {
		var money = parseInt(document.getElementById("titleMoney1").value);
		var result = basicRate[oneFlag] * money / basicRate[twoFlag];
		//일본이 포함될경우 계산식
		if(oneFlag == 4 && twoFlag != 4) {
			result = result / 100;
		} else if(twoFlag == 4 && oneFlag != 4) {
			result = result * 100;
		}
		document.getElementById("titleMoney1").value = comma(money);
		document.getElementById("titleMoney2").value = comma(result.toFixed(2));
		subMoneyText(money, parseInt(result));
	}
}

function subMoneyText(oneMoney, twoMoney) {
	if(oneMoney != 0) {
		oneMoney = number2Kor(oneMoney.toString(), "LOW");
	}
	if(twoMoney != 0) {
		twoMoney = number2Kor(twoMoney.toString(), "LOW");
	}	
	$("#subMoney1").text(comma(oneMoney) + " " + flagBill[oneFlag]);
	$("#subMoney2").text(comma(twoMoney) + " " + flagBill[twoFlag]);
}

function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

function onDetail(num) {
	$("#selectFlag1").attr("src", "./images/" + flagENG[num] + ".png");
	$("#selectBtnText1").text(flagKOR[num]);
	$("#selectEng1").text(flagENG[num].toUpperCase());
	$("#selectFlag2").attr("src", "./images/" + flagENG[0] + ".png");
	$("#selectBtnText2").text(flagKOR[0]);
	$("#selectEng2").text(flagENG[0].toUpperCase());
	$("#selectBtnText3").text(flagKOR[num] + " " + flagENG[num].toUpperCase());
	
	oneFlag = flagNum[num];
	twoFlag = flagNum[0];
	if(num == 2) {
		document.getElementById("titleMoney1").value = 100;
	} else {
		document.getElementById("titleMoney1").value = 1;
	}
	sum(2);
	
	$("#exchange_rate_list").hide();
	$("#exchange_rate_graph").show();
}












