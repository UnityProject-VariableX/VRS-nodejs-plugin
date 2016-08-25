var express = require('express');
var app =express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var data = {
	"name":"maunil",
	"data":"0,0,0"
	};

io.on("connection",function(socket){
	socket.on("disconnect",function(){
		//flag=false;
		console.log("user disconneted");
	});
	socket.emit("datarec",data);
	console.log('a user connected');
	/*var flag=1;
	function sendData(data){
		while(flag==1){
			var newdata = data;//add mpu6050 data here
			setTimeout(function(){cosole.log("datasent");},600);
		}
	}
	if(flag==1)
		sendData();
	*/
});
server.listen(3000,function(){
	console.log("server is running");
});