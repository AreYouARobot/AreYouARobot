'use strict';

angular.module('AYARApp')
	.controller('AllLobbyController', function($scope, $state, $stateParams, gameStorage) {
		// set players equal to players associated with that room
		$scope.game = $stateParams.room;
		console.log('$stateParams.room in LobbyController is:', $stateParams.room);

		// set up listening event for player who is guesser
		socket.on('startGuesser', function(room) {
			console.log('room in startGuesser emit is', room);
			$state.go('game.guesserAskQuestion', {room: $stateParams.room});
		});

		socket.on('startPanel', function(room) {
			console.log('room in startPanel emit is', room);
			$state.go('game.panelWaitingForQuestion', {room: $stateParams.room});
		});
	});
