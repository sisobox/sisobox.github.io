/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

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

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});














