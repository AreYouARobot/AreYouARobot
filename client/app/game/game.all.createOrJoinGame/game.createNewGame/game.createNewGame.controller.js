'use strict';

angular.module('AYARApp')
	.controller('AllCreateGameController', function($scope, $state, gameStorage) {
		// create random Game ID upon instantiation
		$scope.gameID = Math.floor(Math.random() * 9999);

		// create new game and join game upon click
		$scope.createGame = function() {
			gameStorage.createGame($scope.gameID, $scope.playerName);
			$state.go('game.lobby', {room: $scope.gameID});
		};
	});
