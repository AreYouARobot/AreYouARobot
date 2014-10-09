'use strict';

angular.module('AYARApp')
	.controller('AllDisplayResultsController', function($scope, $state, $stateParams, gameStorage) {
		$scope.game = $stateParams.room;
		// $scope.gameResult = $stateParams.room.gameResult;
		console.log('$stateParams.room in DisplayResultsController is:', $stateParams.room);
		
		$scope.gameNextTurn = function() {
			gameStorage.gameNextTurn($stateParams.room.room);
		};

		socket.on('startGuesser', function(room) {
			console.log('room in startGuesser emit is', room);
			$state.go('game.guesserAskQuestion', {room: $stateParams.room.room});
		});

		socket.on('startPanel', function(room) {
			console.log('room in startPanel emit is', room);
			$state.go('game.panelWaitingForQuestion', {room: $stateParams.room.room});
		});

    socket.on('gameOver', function() {
      swal('Your game has ended!', 'Head back to the Create/Join page!', 'success');
      $state.go('game.createOrJoinGame');
    });
	});
