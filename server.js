var jade = require('jade');
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var sanitizer = require('sanitizer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

var listen_port = 8080;

var users = [
	{ id: 1, username: 'roger', password: 'password' }
];

function findById(id, fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

function findByUsername(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}

// Set options for express
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", { layout: false });

app.use(express.static(__dirname + '/src'));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    process.nextTick(function () {
      	findByUsername(username, function(err, user) {
        	if (err) { return done(err); }
        	if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
        	if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
        		return done(null, user);
      		});
    	});
  	}
));

// Configure express to serve home.jade and listen to port
app.get('/', function(req, res){
	res.render('home.jade');
});

app.get('/account', ensureAuthenticated, function(req, res) {
	res.render('account', { user: req.user });
});

app.get('/login', function(req, res) {
	res.render('login', { user: req.user, message: req.flash('error') });
});

app.post('/login',
	passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
	function(req, res) {
		res.redirect('/');
	});

app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

server.listen(listen_port);
console.log("Server listening on port " + listen_port);

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/login');
}

io.on('connection', function (socket) {
	socket.on('setPseudo', function (data) {
		data = sanitizer.sanitize(data);
		socket.set('pseudo', data);
		// To display user join message
		socket.broadcast.emit('join', data);
		console.log("User joined: " + data);
	});

	socket.on('message', function (message) {
		message = sanitizer.sanitize(message);
		socket.get('pseudo', function (error, name) {
			var data = {'message' : message, 'pseudo' : name};
			socket.broadcast.emit('message', data);
			console.log("user " + name + " sent this : " + message);
		});
	});

	socket.on('disconnect', function () {
		socket.get('pseudo', function (error, name) {
			socket.broadcast.emit('leave', name);
			console.log(name + " has left the chat");
		});
	});
});