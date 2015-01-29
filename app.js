/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var CronJob = require('cron').CronJob;
var fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 4000);
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/public/views/index.html');
});
//최신 환율 정보를 보내는 함수.
app.post('/getData', function (req, res) {
	var child_process = require('child_process');
	var exec = child_process.exec;
	var p = exec('curl ' + req.body.url, function(error, stdout, stderr) {
		if(error) {
			res.send(400, 'error');
		} else {
			res.send(200, stdout);  
		}
	});
});
//전날 환율 매매기준율 정보를 보내는 함수.
app.post('/yesterdayData', function (req, res) {
	var data = fs.readFileSync('./DB.txt', 'utf8');
	res.send(200, data);
});
//매일 0시에 전날 환율 매매기준율을 저장하는 함수.
new CronJob('0 0 0 * * *', function() {
	console.log('cron message every day 00:00');
	var child_process = require('child_process');
	var exec = child_process.exec;
	var p = exec('curl http://community.fxkeb.com/fxportal/jsp/RS/DEPLOY_EXRATE/fxrate_all.html', function(error, stdout, stderr) {
		if(error) {
			res.send(400, 'error');
		} else {
			var tableArray = stdout.split('<table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">');
			tableArray = tableArray[1].split('</table></td>');
			tableArray = tableArray[0].split('<td align="right" class="table_04">');
			var usd = tableArray[6].substring(0, tableArray[6].length-14);
			var jpy = tableArray[13].substring(0, tableArray[13].length-14);
			var eur = tableArray[20].substring(0, tableArray[20].length-14);
			var cny = tableArray[27].substring(0, tableArray[27].length-14);
			var aud = tableArray[55].substring(0, tableArray[55].length-14);
			var cad = tableArray[48].substring(0, tableArray[48].length-14);
			var nzd = tableArray[62].substring(0, tableArray[62].length-14);
			fs.writeFile('./DB.txt', usd+","+jpy+","+eur+","+cny+","+aud+","+cad+","+nzd, function(err) {
				if(err) throw err;
				console.log('File write completed');
			});
		}
	});
}, null, true, 'Asia/Seoul');

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});














