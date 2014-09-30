'use strict';

angular.module('AYARApp')
	.controller('AllJoinGameController', function($scope, $state, gameStorage) {
		// join game upon click
		$scope.joinGame = function() {
			gameStorage.joinGame($scope.gameID, $scope.playerName);
			$state.go('game.lobby', {room: $scope.gameID});
		};
	});
