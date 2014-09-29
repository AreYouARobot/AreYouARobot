'use strict';

angular.module('AYARApp')
	.controller('GuesserWaitingForResponsesController', function($scope, $state) {
		socket.on('sendingAllResponses', function(responses) {
			console.log('got responses', responses);
			$scope.$apply(function() {
				$scope.responses = responses;
			});
			$state.go('game.allChooseAnswer', {responses: $scope.responses});
		});
	});
