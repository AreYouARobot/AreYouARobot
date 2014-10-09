'use strict';

angular.module('AYARApp')
	.controller('PanelWaitingForQuestionController', function($scope, $state) {
		socket.on('sendPanelQuestion', function(room) {
			$state.go('game.panelGiveAnswer', {room: room});
		});

		socket.on('gameOver', function() {
		  swal('Your game has ended!', 'Head back to the Create/Join page!', 'success');
		  $state.go('game.createOrJoinGame');
		});
	});
