'use strict';

angular.module('AYARApp')
	.controller('AllJoinGameController', function($scope, $state) {
		$scope.joinGame = function() {
			// need to send broadcast here

			socket.emit('joinGame', {
				gameID: $scope.gameID,
				playerName: $scope.playerName
			});
			
			socket.on('gameStart', function(players) {
				console.log('got players', players);
				$scope.$apply(function() {
					$scope.players = players;
				});
				$state.go('game.lobby', {players: $scope.players});
			});
			
			$state.go('game.waitForStart');
		};
	});
