/*
	데이터 뽑아오는 기준
	1현찰살때 2현찰팔때 3송금보낼때 4송금받을때 5수표팔때 6매매기준율
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
	deferred = $.post("/yesterdayData", "");
	deferred.success(function(success) {
		//usd, jpy, eur, cny, aud, cad, nzd
		var yesterArray = success.split(",");
		basicRate.push(1);
		$("#exchange_rate_table tr").each(function() {
			basicRate.push($(this).find("td").eq(6).text());
		});
		var i = 0;
		//환율 리스트를 순차적으로 돌면서 값을 넣어주는 코드
		$("#exchange_rate_list tbody tr").each(function() {
			if(i==0) {
				$(this).find("td").eq(1).text(comma(basicRate[3]));
				$(this).find("td").eq(3).text(((basicRate[3]-yesterArray[0])/basicRate[3]*100).toFixed(2)+"%");
				if(basicRate[3]-yesterArray[0] > 0) {
					document.getElementById("td"+i).innerHTML = "<i class='glyphicon glyphicon-triangle-top'></i> " + (basicRate[3]-yesterArray[0]).toFixed(2);
					$(this).find("td").eq(2).css("color", "#d9534f");
					$(this).find("td").eq(3).css("color", "#d9534f");
				} else {
					document.getElementById("td"+i).innerHTML = "<i class='glyphicon glyphicon-triangle-bottom'></i> " + (Math.abs(basicRate[3]-yesterArray[0])).toFixed(2);
					$(this).find("td").eq(2).css("color", "#428bca");
					$(this).find("td").eq(3).css("color", "#428bca");
				}
			} else if(i==1) {
				$(this).find("td").eq(1).text(comma(basicRate[4]));
				$(this).find("td").eq(3).text(((basicRate[4]-yesterArray[1])/basicRate[4]*100).toFixed(2)+"%");
				if(basicRate[4]-yesterArray[1] > 0) {
					document.getElementById("td"+i).innerHTML = "<i class='glyphicon glyphicon-triangle-top'></i> " + (basicRate[4]-yesterArray[1]).toFixed(2);
					$(this).find("td").eq(2).css("color", "#d9534f");
					$(this).find("td").eq(3).css("color", "#d9534f");
				} else {
					document.getElementById("td"+i).innerHTML = "<i class='glyphicon glyphicon-triangle-bottom'></i> " + (Math.abs(basicRate[4]-yesterArray[1])).toFixed(2);
					$(this).find("td").eq(2).css("color", "#428bca");
					$(this).find("td").eq(3).css("color", "#428bca");
				}				
			} else if(i==2) {
				$(this).find("td").eq(1).text(comma(basicRate[5]));
				$(this).find("td").eq(3).text(((basicRate[5]-yesterArray[2])/basicRate[5]*100).toFixed(2)+"%");
				if(basicRate[5]-yesterArray[2] > 0) {
					document.getElementById("td"+i).innerHTML = "<i class='glyphicon glyphicon-triangle-top'></i> " + (basicRate[5]-yesterArray[2]).toFixed(2);
					$(this).find("td").eq(2).css("color", "#d9534f");
					$(this).find("td").eq(3).css("color", "#d9534f");				
				} else {
					document.getElementById("td"+i).innerHTML = "<i class='glyphicon glyphicon-triangle-bottom'></i> " + (Math.abs(basicRate[5]-yesterArray[2])).toFixed(2);
					$(this).find("td").eq(2).css("color", "#428bca");
					$(this).find("td").eq(3).css("color", "#428bca");				
				}
			} else if(i==3) {
				$(this).find("td").eq(1).text(comma(basicRate[6]));
				$(this).find("td").eq(3).text(((basicRate[6]-yesterArray[3])/basicRate[6]*100).toFixed(2)+"%");
				if(basicRate[6]-yesterArray[3] > 0) {
					document.getElementById("td"+i).innerHTML = "<i class='glyphicon glyphicon-triangle-top'></i> " + (basicRate[6]-yesterArray[3]).toFixed(2);
					$(this).find("td").eq(2).css("color", "#d9534f");
					$(this).find("td").eq(3).css("color", "#d9534f");					
				} else {
					document.getElementById("td"+i).innerHTML = "<i class='glyphicon glyphicon-triangle-bottom'></i> " + (Math.abs(basicRate[6]-yesterArray[3])).toFixed(2);
					$(this).find("td").eq(2).css("color", "#428bca");
					$(this).find("td").eq(3).css("color", "#428bca");					
				}
			} else if(i==4) {
				$(this).find("td").eq(1).text(comma(basicRate[10]));
				$(this).find("td").eq(3).text(((basicRate[10]-yesterArray[4])/basicRate[10]*100).toFixed(2)+"%");
				if(basicRate[10]-yesterArray[4] > 0) {
					document.getElementById("td"+i).innerHTML = "<i class='glyphicon glyphicon-triangle-top'></i> " + (basicRate[10]-yesterArray[4]).toFixed(2);
					$(this).find("td").eq(2).css("color", "#d9534f");
					$(this).find("td").eq(3).css("color", "#d9534f");				
				} else {
					document.getElementById("td"+i).innerHTML = "<i class='glyphicon glyphicon-triangle-bottom'></i> " + (Math.abs(basicRate[10]-yesterArray[4])).toFixed(2);
					$(this).find("td").eq(2).css("color", "#428bca");
					$(this).find("td").eq(3).css("color", "#428bca");				
				}				
			} else if(i==5) {
				$(this).find("td").eq(1).text(comma(basicRate[9]));
				$(this).find("td").eq(3).text(((basicRate[9]-yesterArray[5])/basicRate[9]*100).toFixed(2)+"%");
				if(basicRate[9]-yesterArray[5] > 0) {
					document.getElementById("td"+i).innerHTML = "<i class='glyphicon glyphicon-triangle-top'></i> " + (basicRate[9]-yesterArray[5]).toFixed(2);
					$(this).find("td").eq(2).css("color", "#d9534f");
					$(this).find("td").eq(3).css("color", "#d9534f");				
				} else {
					document.getElementById("td"+i).innerHTML = "<i class='glyphicon glyphicon-triangle-bottom'></i> " + (Math.abs(basicRate[9]-yesterArray[5])).toFixed(2);
					$(this).find("td").eq(2).css("color", "#428bca");
					$(this).find("td").eq(3).css("color", "#428bca");				
				}				
			} else if(i==6) {
				$(this).find("td").eq(1).text(comma(basicRate[11]));
				$(this).find("td").eq(3).text(((basicRate[11]-yesterArray[6])/basicRate[11]*100).toFixed(2)+"%");
				if(basicRate[11]-yesterArray[6] > 0) {
					document.getElementById("td"+i).innerHTML = "<i class='glyphicon glyphicon-triangle-top'></i> " + (basicRate[11]-yesterArray[6]).toFixed(2);
					$(this).find("td").eq(2).css("color", "#d9534f");
					$(this).find("td").eq(3).css("color", "#d9534f");				
				} else {
					document.getElementById("td"+i).innerHTML = "<i class='glyphicon glyphicon-triangle-bottom'></i> " + (Math.abs(basicRate[11]-yesterArray[6])).toFixed(2);
					$(this).find("td").eq(2).css("color", "#428bca");
					$(this).find("td").eq(3).css("color", "#428bca");				
				}				
			}
			i = i + 1;
		});			
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
// comma 콤마 추가 함수
function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}
// uncomma 콤마 삭제 함수
function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}
// 환율 상세정보 보여주는 함수
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
	
	$("#detailFlag").attr("src", "./images/" + flagENG[num] + ".png");
	$("#detailFlagKorText").text(flagKOR[num]);
	$("#detailFlagEngText").text(flagENG[num].toUpperCase());
	$("#detailFlagRateText").text(basicRate[oneFlag]);
	$("#buyMoneyText").text(comma($("#exchange_rate_table").find("tr").eq(oneFlag-1).find("td").eq(1).text()));
	$("#sellMoneyText").text(comma($("#exchange_rate_table").find("tr").eq(oneFlag-1).find("td").eq(2).text()));
	$("#sendMoneyText").text(comma($("#exchange_rate_table").find("tr").eq(oneFlag-1).find("td").eq(3).text()));
	$("#receiveMoneyText").text(comma($("#exchange_rate_table").find("tr").eq(oneFlag-1).find("td").eq(4).text()));
	$("#checkMoneyText").text(comma($("#exchange_rate_table").find("tr").eq(oneFlag-1).find("td").eq(5).text()));

	$("#exchange_rate_list").hide();
	$("#exchange_rate_graph").show();
}
// 3개월, 1년, 3년 버튼 활성화 함수
function activeBtn(num) {
	$("#activeBtn1").removeClass("active");
	$("#activeBtn2").removeClass("active");
	$("#activeBtn3").removeClass("active");
	$("#activeBtn" + num).addClass("active");
}












