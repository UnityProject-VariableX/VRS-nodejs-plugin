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

var datasend={
	"rot":""
};

io.on("connection",function(socket){
	socket.on("disconnect",function(){
		console.log("user disconneted");
		clearInterval(inte);
	});
	
	console.log('a user connected');
	var inte = setInterval(function(){
	var data = sensor.readSync();
	datasend.rot=data.rotation.z;
	socket.emit("datarec",datasend);
	console.log(datasend);
	},100);

});
server.listen(3000,function(){
	console.log("server is running");
});