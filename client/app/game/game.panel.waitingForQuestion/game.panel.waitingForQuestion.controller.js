'use strict';

angular.module('AYARApp')
	.controller('PanelWaitingForQuestionController', function($scope, $state, gameStorage) {
		socket.on('sendPanelQuestion', function(room) {
			$state.go('game.panelGiveAnswer', {room: room});
		});
	});
