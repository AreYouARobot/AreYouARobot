'use strict';

// Primary server file
var express = require('express');
var app = express();

var database = require('./config/dbConnectionConfig.js');
var game = require('./game/mechanics.js');

var $storage = require('./storage.js');

var http = require('http');
http = http.Server(app);

var io = require('socket.io');
io = io(http);

var shuffle = require('knuth-shuffle');

// Require bluebird so that as soon as req comes in, promisify it.
var port = process.env.PORT || 8085;

// Require middleware (also handles initial API routing)
require('./config/middleware.js')(app, express);

// // Require database connections
// // mongoose.connect(database); // connect to mongo database named 'areyouarobot-dev'

// // Seed the MongoDB with sample user data
if(database.seedDB) { require('./config/seed'); };

http.listen(port);
console.log('Server running on port %d', port);

// *************************** SOCKET.IO STUFF ***************************** //

var activeGames = {};

io.on('connection', function(socket) {
	// console when a user connects to the game and nest all events within
	console.log('user connected');

	// listen for user disconnecting and console log
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
	
	// listen for creation of new game using roomID
	socket.on('createGame', function(gameInfo) {
		
		// player joined, passing in gameID and playerName through gameInfo
		console.log('got a player in createGame on server', gameInfo);

		// create temp room variable to store the room
		var room = gameInfo.gameID;
		console.log(room);

		// store "nickname" used for playerName (as opposed to socket.id)
		socket.nickname = gameInfo.playerName;

		// join room
		socket.join(room);

		// THIS IS WHERE DECODE WILL GO
		game.decodeJWT(gameInfo.playerToken, function(playerObjID) {

			// create a new game to be stored in gameStorage
			var newGame = {
				room: room,
				players: [{
					playerName: socket.nickname,
					playerID: socket.id,
					playerObjID: playerObjID,
					playerCurrentScore: 0
				}],
				currentGuesserIndex: 0,
				question: '',
				answers: [],
				guesserChoice: '',
				gameResult: ''
			};

			activeGames[room] = newGame;
			
			setTimeout(function() {
				io.in(room).emit('addPlayer', socket.nickname);
			}, 1000);
		});
	});

	// listen for creation/joining of new game using roomID
	socket.on('joinGame', function(gameInfo) {
		// player joined, passing in gameID and playerName through gameInfo
		console.log('got a player', gameInfo);

		// create temp room variable to store the room
		var room = gameInfo.gameID;
		console.log(room);

		// store "nickname" used for playerName (as opposed to socket.id)
		socket.nickname = gameInfo.playerName;

		// join room
		socket.join(room);

		// THIS IS WHERE DECODE WILL GO

		game.decodeJWT(gameInfo.playerToken, function(playerObjID) {

			activeGames[room].players.push({
				playerName: socket.nickname,
				playerID: socket.id,
				playerObjID: playerObjID,
				playerCurrentScore: 0
			});

			setTimeout(function() {
				io.in(room).emit('addPlayer', socket.nickname);
			}, 1000);

			if (activeGames[room].players.length === 3) {
				console.log('starting new game in five seconds!');
				setTimeout(function() {
					console.log('starting game in gameInstance', activeGames[room]);
					
					// send different messages to guesser and panel to start game
					for (var i = 0; i < activeGames[room].players.length; i++) {
						if (i === activeGames[room].currentGuesserIndex) {
							io.sockets.connected[activeGames[room].players[i].playerID].emit('startGuesser', activeGames[room]);		
						} else {
							io.sockets.connected[activeGames[room].players[i].playerID].emit('startPanel', activeGames[room]);		
						}
					}
				}, 5000);
			}
		});
	});

	// listen for guesser sending initial question
	socket.on('guesserSentQuestion', function(question, botResponse, room) {
		console.log('question received in guesserSentQuestion', question);
		console.log('botResponse received in guesserSentQuestion', botResponse);
		console.log('room received in guesserSentQuestion', room);

		// store question
		activeGames[room].question = question;
		activeGames[room].answers.push({
			answer: botResponse,
			isBot: true,
			playerID: 'none'
		});

		// see what activeGames looks like at this point
		console.log('activeGames[room] is', activeGames[room]);

		// send different messages to guesser and panel to start game
		for (var i = 0; i < activeGames[room].players.length; i++) {
			if (i === activeGames[room].currentGuesserIndex) {
				io.sockets.connected[activeGames[room].players[i].playerID].emit('guesserWait', activeGames[room]);		
			} else {
				io.sockets.connected[activeGames[room].players[i].playerID].emit('sendPanelQuestion', activeGames[room]);		
			}
		}
	});

	// listen for each panel member to send answer
	socket.on('panelSentAnswer', function(answer, room) {
		console.log('answer received in panelSentAnswer', answer);
		console.log('room received in panelSentAnswer', room);

		// store answer
		activeGames[room].answers.push({
			answer: answer,
			isBot: false,
			playerID: socket.id
		});

		// see what activeGames looks like at this point
		console.log('activeGames[room] is', activeGames[room]);

		if (activeGames[room].answers.length === 3) {
			console.log('sending panel answers in five seconds!');

			// shuffle answers
			shuffle.knuthShuffle(activeGames[room].answers);
			
			setTimeout(function() {
				console.log('sending panel answers in ', activeGames[room]);
				
				// send to all players in the room
				io.in(room).emit('guesserChooseAnswer', activeGames[room]);
			}, 5000);
		}	
	});

	// listen for guesser choice
	socket.on('guesserChoseAnswer', function(answer, room) {
		console.log('player answer received in guesserChoseAnswer', answer);
		console.log('player room received in guesserChoseAnswer', room);

		// check if socket that triggered event is current player
		if (activeGames[room].players[activeGames[room].currentGuesserIndex].playerID === socket.id) {

			console.log('the guesser is the one that clicked');

			// assign guesser's choice to game instance
			// answer is object with text of answer, isBot, and playerID
			activeGames[room].guesserChoice = answer.answer;

// **********************************************
// THIS IS WHERE DECIDE WINNER LOGIC WILL GO
// THIS IS WHERE SCORING LOGIC WILL ALSO GO
// THIS IS WHERE LEARNING LOGIC FOR ROBOT WILL ALSO GO
// **********************************************			

			// check if answer is correct
			activeGames[room] = game.pickWinnerAndScoring(activeGames[room]);

			console.log('sending game results in five seconds!');
			setTimeout(function() {
				console.log('sending game results in ', activeGames[room]);
				
				// send to all players in the room
				io.in(room).emit('displayResults', activeGames[room]);
			}, 5000);
		} else {
			console.log('the guesser is NOTTTTTT the one that clicked');
		}
	});

	socket.on('gameNextTurn', function(room) {
		if (activeGames[room].players[activeGames[room].currentGuesserIndex].playerID === socket.id) {

		console.log('the guesser is the one that clicked');
		
			// update currentGuesserIndex to move to next player
			activeGames[room].currentGuesserIndex++;

			// check to see if game is over
			if (activeGames[room].currentGuesserIndex >= activeGames[room].players.length) {

				game.updateUserScoresInDB(activeGames[room]);

				// delete game
				delete activeGames[room];

				console.log('double check game is deleted', activeGames);

				// emit gameOver event, taking all users back to create/join page
				io.in(room).emit('gameOver');
			} else {

				console.log('starting new round in room', room);
				// if game is not over, continue to next round
				// reset question, answers, and gameResult
				activeGames[room].question = '';
				activeGames[room].answers = [];
				activeGames[room].guesserChoice = '';
				activeGames[room].gameResult = '';

				if (activeGames[room].players.length === 3) {
					console.log('starting new game in five seconds!');
					setTimeout(function() {
						console.log('starting game in gameInstance', activeGames[room]);
						
						// send different messages to guesser and panel to start game
						for (var i = 0; i < activeGames[room].players.length; i++) {
							if (i === activeGames[room].currentGuesserIndex) {
								io.sockets.connected[activeGames[room].players[i].playerID].emit('startGuesser', activeGames[room]);		
							} else {
								io.sockets.connected[activeGames[room].players[i].playerID].emit('startPanel', activeGames[room]);		
							}
						}
					}, 5000);
				}
			}
		} else {
			console.log('the guesser is NOTTTTTT the one that clicked');
		}
	});
});

exports = module.exports = app;
