'use strict';

angular.module('AYARApp')
	.controller('PanelWaitingForQuestionController', function($scope, $state) {
		socket.on('sendPanelQuestion', function(room) {
			$state.go('game.panelGiveAnswer', {room: room});
		});
	});
