'use strict';

// Primary server file
var express = require('express');
var app = express();

var mongoose = require('mongoose');
var database = require('./config/developmentdb.js');

var http = require('http');
http = http.Server(app);

var io = require('socket.io');
io = io(http);

// Require bluebird so that as soon as req comes in, promisify it.
var port = process.env.PORT || 8085;

// Require middleware (also handles initial API routing)
require('./config/middleware.js')(app, express);

// // Require database connections
// // mongoose.connect(database); // connect to mongo database named 'areyouarobot-dev'
mongoose.connect('mongodb://localhost/areyouarobot-dev');
// // Seed the MongoDB with sample user data

if(database.seedDB) { require('./config/seed'); };

http.listen(port);
console.log('Server running on port %d', port);

var messages = [];

io.on('connection', function(socket) {
	// console when a user connects to the game and nest all events within
	console.log('user connected');

	// listen for user disconnecting and console log
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
	
	// listen for user sending initial question
	socket.on('guesserAskedQuestion', function(question) {
		console.log('question received:', question);
		// send question to panel.waitingForQuestion
		io.emit('sendingGuesserQuestion', question);
	});
});

exports = module.exports = app;
