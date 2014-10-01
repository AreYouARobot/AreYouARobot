'use strict';

angular.module('AYARApp')
	.controller('AllDisplayResultsController', function($scope, $state, $stateParams, gameStorage) {
		$scope.gameResult = $stateParams.room.gameResult;
		
		$scope.gameNextTurn = function() {
			gameStorage.gameNextTurn($stateParams.room.room);
		};

		socket.on('startGuesser', function(room) {
			$state.go('game.guesserAskQuestion', {room: room});
		});

		socket.on('startPanel', function(room) {
			$state.go('game.panelWaitingForQuestion', {room: room});
		});

		socket.on('gameOver', function() {
			console.log('Game Over!');
		});
	});
