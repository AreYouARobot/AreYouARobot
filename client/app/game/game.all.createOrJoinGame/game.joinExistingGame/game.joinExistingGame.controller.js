'use strict';

angular.module('AYARApp')
	.controller('AllJoinGameController', function($scope, $state) {
		$scope.joinGame = function() {
			// need to send broadcast here
			$state.go('game.lobby')
		};
	});
