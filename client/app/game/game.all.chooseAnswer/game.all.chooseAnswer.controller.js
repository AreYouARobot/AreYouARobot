'use strict';

angular.module('AYARApp')
  .controller('AllChooseAnswerController', function(gameStorage, $scope, $state, $stateParams) {
  	console.log('you have made it this far with responses.', $stateParams.room.answers);
		
		$scope.answers = $stateParams.room.answers;
		
		$scope.guesserChooseAnswer = function(answer) {
			// socket.emit('guesserChoseAnswer', answer);
			gameStorage.guesserChooseAnswer(answer, $stateParams.room.room);
		};

		socket.on('displayResults', function(room) {
			$state.go('game.allDisplayResults', {room: room});
		});

		// socket.on('displayResults', function(result) {
		// 	console.log('got results and it is:', result);
		// 	$scope.$apply(function() {
		// 		$scope.result = result;
		// 	});

		// });
  })
  .service('gameStorage', function($rootScope, $timeout) {
  	// set storage object to hold all active game instances
  	this.storage = {};

  	// set self variable to refer to the scope of the service
  	var self = this;

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
			
  	// create new active game instance, using room ID as key in storage object
		// socket.on('saveNewGame', function(newGame) {
		// 	console.log('saving game', newGame);
		// 	// save game instance in storage
		// 	self.storage[newGame.room] = newGame;
		// });

		// update existing game instance with new joiner, using room ID as key in storage object
		// socket.on('updateExistingGame', function(newPlayerInfo) {
		// 	console.log('updating game', newPlayerInfo, 'in', self.storage);
		// 	// update game instance in storage
		// 	// ** Do you need $rootScope.$apply here?
		// 	$rootScope.$apply(function() {
		// 		self.storage[newPlayerInfo.room].players.push({
		// 			playerName: newPlayerInfo.playerName,
		// 			playerID: newPlayerInfo.playerID
		// 		});
		// 	})

		// 	// check if game is full
		// 	if (self.storage[newPlayerInfo.room].players.length === 3) {
		// 		// emit room ID to server to start game after waiting 5 seconds
		// 		console.log('starting new game in 5 seconds for room', self.storage[newPlayerInfo.room]);

		// 		// add countdown feature eventually
		// 		$timeout(function() {
		// 			socket.emit('startGame', self.storage[newPlayerInfo.room]);
		// 		}, 5000);
		// 	}
		// });

		this.guesserSendQuestion = function(question, botResponse, room) {
			console.log('guesserSentQuestion', question, 'in room', room);
			// console.log('storage before adding is:', self.storage);
			// store question in our gameStorage object
			// self.storage[room].question = question;

		// store botResponse as first item in our answers array
			// self.storage[room].answers.push({
			// 	answer: botResponse,
			// 	isBot: true
			// });

			// console.log('storage after adding is:', self.storage);
			// emit room to server to prompt panel
			socket.emit('guesserSentQuestion', question, botResponse, room);
		};

		this.panelSendAnswer = function(answer, room) {
			// console.log('panelSentAnswer', answer);
			// // store answers in our gameStorage object
			// self.storage[room].answers.push({
			// 	answer: answer,
			// 	isBot: false
			// });

			// console.log(self.storage[room], 'it is now storage');

			// check if all answers have been received (2 players, 1 bot)
			// if (self.storage[room].answers.length === 3) {
			// 	// emit room to server to prompt guesser
			// 		socket.emit('guesserChooseAnswer', self.storage[room]);
			// }
			socket.emit('panelSentAnswer', answer, room);
		};

  	this.guesserChooseAnswer = function(answer, room) {
  		// var playerGuessIndex =  self.storage[room].answers.indexOf(response);
  		// var playerGuess = self.storage[room].answers[playerGuessIndex];
  		// // if bot response, emit that player is winner
  		// if (playerGuess.isBot) {
  		// 	socket.emit('guesserChoseRightAnswer', room);
  		// } else {
  		// 	// if player response, emit that player is lower
  		// 	socket.emit('guesserChoseWrongAnswer', room);
  		// }
  		socket.emit('guesserChoseAnswer', answer, room)
  	};

  	this.gameNextTurn = function(room) {
  		socket.emit('gameNextTurn', room);
  	};
  	
  	// listen for response from server to display results
  	// socket.on('displayResults', function(result) {

  	// 	console.log('got results and it is:', result);
  	// 	self.storage = result;
  	// });

  	this.get = function(room) {
  		return self.storage[room];
  	};
  });