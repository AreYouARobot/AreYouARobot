'use strict';

angular.module('AYARApp')
	.controller('AllCreateOrJoinGameController', function($scope, $state, $stateParams) {
		// create new game
		$scope.createNewGame = function() {
			$state.go('game.createGame', {jwt: $stateParams.jwt});
		};

		// join existing game
		$scope.joinExistingGame = function() {
			$state.go('game.joinGame', {jwt: $stateParams.jwt});
		};
	});
