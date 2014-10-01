'use strict';

angular.module('AYARApp')
	.controller('AllCreateOrJoinGameController', function($scope, $state) {
		// create new game
		$scope.createNewGame = function() {
			$state.go('game.createGame');
		};

		// join existing game
		$scope.joinExistingGame = function() {
			$state.go('game.joinGame');
		};
	});
