var express = require('express');
var app =express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var i2c = require('i2c-bus');
var MPU6050 = require('i2c-mpu6050');

var address = 0x68;
var i2c1 = i2c.openSync(1);
var sensor = new MPU6050(i2c1, address);

io.on("connection",function(socket){
	socket.on("disconnect",function(){
		console.log("user disconneted");
		clearInterval(inte);
	});
	
	console.log('a user connected');
	var inte = setInterval(function(){
	var data = sensor.readSync();
	socket.emit("datarec",data);
	console.log(data);
	},100);

});
server.listen(3000,function(){
	console.log("server is running");
});





//kachro
//var keypress = require('keypress');
//keypress(process.stdin);
//var data = {
//	"data":"0"
//	};
/*for(var i=0; i<50;i++){
		setTimeout(function(){
			data.data=Number(data.data)+3+"";
		if(Number(data.data)<10)
			data.data="00"+data.data;
		else if(Number(data.data)<100)
			data.data="0"+data.data;
			socket.emit("datarec",data);
		},0);
		
	//process.stdin.on('keypress', function (ch, key) {
	//console.log('got "keypress"', key.name);
		//if (key && key.ctrl && key.name == 'c') {
		//	process.stdin.pause();
	//	}
	//socket.emit("datarec",key);
	//});
	//process.stdin.setRawMode(true);
	//process.stdin.resume();
	*/