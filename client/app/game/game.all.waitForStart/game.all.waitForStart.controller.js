'use strict';

angular.module('AYARApp')
	.controller('AllWaitForStartController', function($scope, $state) {
		socket.on('gameStart', function(players) {
			console.log('got players', players);
			$scope.$apply(function() {
				$scope.players = players;
			});
			$state.go('game.lobby', {players: $scope.players});
		});
	});
