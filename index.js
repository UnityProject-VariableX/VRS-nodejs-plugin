var express = require('express');
var app =express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var data = {
	"data":"0"
	};
var data2={
	"name":"Sasuke",
	"data":"1,1,1"
	};;
io.on("connection",function(socket){
	socket.on("disconnect",function(){
		//flag=false;
		data.data=0;
		console.log("user disconneted");
	});
	for(var i=0; i<50;i++){
		data.data=Number(data.data)+3+"";
		if(Number(data.data)<10)
			data.data="00"+data.data;
		else if(Number(data.data)<100)
			data.data="0"+data.data;
		socket.emit("datarec",data);
		//socket.emit("datarec",data2);
	}
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