'use strict';

angular.module('AYARApp')
	.controller('AllCreateGameController', function($scope, $state, gameStorage, $stateParams) {
		// create random Game ID upon instantiation
		$scope.gameID = Math.floor(Math.random() * 9999);

		// create new game and join game upon click
		$scope.createGame = function() {
			gameStorage.createGame($scope.gameID, $scope.playerName, $stateParams.jwt);
			$state.go('game.lobby', {room: $scope.gameID});
		};
	});
