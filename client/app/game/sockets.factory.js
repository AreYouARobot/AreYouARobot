'use strict';

angular.module('AYARApp')
  .service('gameStorage', function() {
  	// create new game, generating a gameID
  	this.createGame = function(gameID, playerName) {
  		console.log('createGame called in service with gameID and playerName', gameID, playerName);
  		socket.emit('createGame', {
  			gameID: gameID,
  			playerName: playerName
  		});
  	};

  	// join existing game, using a gameID
  	this.joinGame = function(gameID, playerName) {
  		socket.emit('joinGame', {
  			gameID: gameID,
  			playerName: playerName
  		});
  	};

		this.guesserSendQuestion = function(question, botResponse, room) {
			socket.emit('guesserSentQuestion', question, botResponse, room);
		};

		this.panelSendAnswer = function(answer, room) {
			socket.emit('panelSentAnswer', answer, room);
		};

  	this.guesserChooseAnswer = function(answer, room) {
  		socket.emit('guesserChoseAnswer', answer, room)
  	};

  	this.gameNextTurn = function(room) {
  		socket.emit('gameNextTurn', room);
  	};
  });
