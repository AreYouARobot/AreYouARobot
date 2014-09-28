'use strict';

angular.module('AYARApp')
	.controller('PanelWaitingForQuestionController', function($scope, $state) {
		$scope.question = 'TEST';
		socket.on('sendingGuesserQuestion', function(question) {
			console.log('gotcha question:', question);
			$scope.$apply(function() {
				$scope.question = question;
			});
			$state.go('game.panelGiveAnswer', {'question': $scope.question});
		});
	});
