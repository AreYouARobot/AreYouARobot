'use strict';

angular.module('AYARApp')
	.controller('AllCreateOrJoinGameController', function($scope, $state) {
		$scope.createNewGame = function() {
			$state.go('game.createGame');
		};
		$scope.joinExistingGame = function() {
			$state.go('game.joinGame');
		};
	});
