(function() {
	var fnEach = String.prototype.each ;
	String.prototype.each = fnEach || function(callback) {
		var str = this;
		for( var i = 0 ; i < str.length ; i++) {
			callback(i, str.charAt(i));
		}
	};
})();
/**
 * 
 * @param num string(required) - 숫자 형태의 문자열
 * @param type (optional, default "HIGH" ) - 출력의 수위
 * @param delimChar(optional, default " ") - 4자리마다 삽입될 구분 문자열
 * @returns
 */
function number2Kor(num, type, delimChar) {
	var baseNames =  ["천", "백", "십", ""];
	var levelNames = ["", "만", "억", "조", 
	                  "경", "해", "자", "양", 
	                  "구", "간", "정", "재", 
	                  "극", "항하사", "아승기", "나유타", 
	                  "불가사의", "무량대수"];
	type = type || "HALF";
	delimChar = delimChar || " ";
	
	var decimal = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
	
	var level = parseInt(num.length / baseNames.length);
	var start = 0;
	var end = num.length % baseNames.length; // 0, 1, 2, 3
	/* start validation */
	if ( num.length > 69 ) {
		throw "too long number : " + num ;
	}
	if ( isNaN(num) ) {
		throw "not a number form : " + num ;
	}
	if ( ! isFinite(num) ) {
		throw "not finite : " + num ;
	}
	/* end validation */
	
	if ( end == 0) { // in case the length of num is => 0, 4, 8, 12, ...
		end = Math.min(num.length, baseNames.length) ;
		level --;
	} else {
		for( var k = 0 ; k < baseNames.length-end; k++) {
			num = "0" + num;
		}
		end = baseNames.length;
	}
	
	var toKorString = "";
	var fns = {
			"LOW" : function (i, ch) {
				if ( ch !== "0"){
					unitStr += ch;
				} else if ( ch === "0" && unitStr.length > 0 ) {				
					unitStr += ch;
				}
			},
			"HALF" : function(i, ch) {
				if ( ch != "0" ) {
					unitStr += ch + baseNames[i];
				}
			}, 
			"HIGH" : function (i, ch) {
				if ( ch != "0") {
					unitStr += decimal [ parseInt(ch)] + baseNames[i];
				}
			}
		};
	
	while ( start < num.length ) {
		var partial = num.substring(start, end);
		var unitStr = "";		
		
		partial.each ( fns[type] );
		
		if ( unitStr.length > 0 ) {
			toKorString += unitStr + levelNames[level] + delimChar ;
		}
		level --;
		start = end;
		end += baseNames.length;
	}

	return toKorString;
}

number2Kor.HIGH = "HIGH";
number2Kor.HALF = "HALF";
number2Kor.LOW  = "LOW";
