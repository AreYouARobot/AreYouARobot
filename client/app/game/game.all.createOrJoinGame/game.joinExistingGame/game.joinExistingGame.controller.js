'use strict';

angular.module('AYARApp')
	.controller('AllJoinGameController', function($scope, $state, gameStorage, $stateParams) {
		// join game upon click
		$scope.joinGame = function() {
			gameStorage.joinGame($scope.gameID, $scope.playerName, $stateParams.jwt);
			$state.go('game.lobby', {room: $scope.gameID});
		};
	});
