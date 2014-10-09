'use strict';

angular.module('AYARApp')
	.controller('PanelWaitingForResponsesController', function($scope, $state) {
		socket.on('guesserChooseAnswer', function(gameInstance) {
			$state.go('game.allChooseAnswer', {room: gameInstance});
		});

		socket.on('gameOver', function() {
		  swal('Your game has ended!', 'Head back to the Create/Join page!', 'success');
		  $state.go('game.createOrJoinGame');
		});
	});
