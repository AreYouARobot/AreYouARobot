'use strict';

angular.module('AYARApp')
	.controller('AllCreateGameController', function($scope, $state) {
		$scope.gameID = Math.floor(Math.random() * 9999);

		$scope.joinGame = function() {
			// need to send broadcast here
			
			socket.emit('joinGame', {
				gameID: $scope.gameID,
				playerName: $scope.playerName
			});
			
			$state.go('game.waitForStart');
		};
	});
