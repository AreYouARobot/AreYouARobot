'use strict';

angular.module('AYARApp')
	.controller('AllLobbyController', function($scope, $state, $stateParams) {
		console.log('I got into lobby with ', $stateParams.players);
		$scope.players = $stateParams.players;
	});
