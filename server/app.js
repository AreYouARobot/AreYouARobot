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

// *************************** SOCKET.IO STUFF ***************************** //

var panelResponses = ['robot response'];
var players = {};

io.on('connection', function(socket) {
	// console when a user connects to the game and nest all events within
	console.log('user connected');

	// listen for user disconnecting and console log
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
	
	// listen for creation/joining of new game using roomID
	socket.on('joinGame', function(gameInfo) {
		console.log('got a player', gameInfo);

		if (!players[gameInfo.gameID]) {
			players[gameInfo.gameID] = [];
		}

		players[gameInfo.gameID].push(gameInfo.playerName);
		
		var room = gameInfo.gameID;

		socket.join(room);

		if (players[gameInfo.gameID].length === 3) {
			console.log('emitting gameStart with', players[gameInfo.gameID]);
			io.in(room).emit('gameStart', players[gameInfo.gameID]);
		}
	});

	// listen for guesser sending initial question
	socket.on('guesserAskedQuestion', function(question) {
		console.log('question received:', question);
		// send question to panel.waitingForQuestion
		io.emit('sendingGuesserQuestion', question);
	});

	// listen for panel responses
	socket.on('panelSentAnswer', function(answer) {
		console.log('response received:', answer);
		
		// push to list of responses
		panelResponses.push(answer);

		// check responses
		console.log('panelResponses:', panelResponses);

		// check if list of responses is equal to number of players (including robot)
		if (panelResponses.length === 3) {
			// if so, emit responses to all
			io.emit('sendingAllResponses', panelResponses);
		}
	});
	
	// listen for guesser to choose answer
	// NEED TO RESTRICT THIS TO ONLY RESPONSES FROM THE GUESSER AND NOT PANEL
	socket.on('guesserChoseAnswer', function(answer) {
		console.log('guess received', answer);

		// temp winning/losing logic
		if (answer === panelResponses[0]) {
			var result = 'Guesser chose correctly!';
		} else {
			var result = 'Guesser chose wrong! Bot response was: ' + panelResponses[0];
		}

		console.log('result sending:', result);

		io.emit('displayResults', result);
	});

});

exports = module.exports = app;
