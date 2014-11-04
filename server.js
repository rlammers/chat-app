var jade = require('jade');
var express = require('express');
var app = express();
var http= require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var listen_port = 8080;

// Set options for express
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", { layout: false});


app.use(express.static(__dirname + '/public'));

// Configure express to serve home.jade and listen on port 8080
app.get('/', function(req, res){
	res.render('home.jade');
});
server.listen(listen_port);
console.log("Server listening on port " + listen_port);

// Connect to socket, set pseudo
io.sockets.on('connection', function (socket) {
	socket.on('setPseudo', function (data) {
		socket.set('pseudo', data);
	});
	// Add the message event
	socket.on('message', function (message) {
		socket.get('pseudo', function (error, name) {
			var data = {'message' : message, pseudo : name};
			socket.broadcast.emit('message', data);
			console.log("user " + name + " sent this : " + message);
		});
	});
});

