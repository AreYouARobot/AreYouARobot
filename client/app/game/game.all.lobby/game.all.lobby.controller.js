'use strict';

angular.module('AYARApp')
	.controller('AllLobbyController', function($scope, $state, $stateParams) {
		// set players equal to players associated with that room
		$scope.game = $stateParams.room;

		// set up listening event to add player names to lobby
		socket.on('addPlayer', function(room) {
			$scope.$apply(function() {
				$scope.players = room.players;
			});
		});

		// set up listening event for player who is guesser
		socket.on('startGuesser', function(room) {
			$state.go('game.guesserAskQuestion', {room: $stateParams.room});
		});

		socket.on('startPanel', function(room) {
			$state.go('game.panelWaitingForQuestion', {room: $stateParams.room});
		});

		socket.on('gameOver', function() {
		  swal('Your game has ended!', 'Head back to the Create/Join page!', 'success');
		  $state.go('game.createOrJoinGame');
		});
	});
