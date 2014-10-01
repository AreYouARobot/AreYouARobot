'use strict';

angular.module('AYARApp')
	.controller('GuesserWaitingForResponsesController', function($scope, $state) {
		socket.on('guesserChooseAnswer', function(gameInstance) {
			$state.go('game.allChooseAnswer', {room: gameInstance});
		});
	});
