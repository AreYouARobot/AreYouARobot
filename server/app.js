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
	console.log('a user connected');
	socket.on('disconnet', function() {
		console.log('user disconnected');
	});
	
	socket.on('test', function(msg) {
		console.log('this is a test message: ' + msg);
		messages.push(msg);
		console.log('messsages:', messages);
		if (messages.length === 2) {
			io.emit('sendBack', msg);
		}
	});
});

exports = module.exports = app;
