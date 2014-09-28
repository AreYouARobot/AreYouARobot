'use strict';

angular.module('AYARApp')
	.controller('PanelWaitingForQuestionController', function($scope, $state) {
		$scope.question = 'TEST';
		socket.on('sendingGuesserQuestion', function(question) {
			console.log('gotcha question:', question);
			$scope.question = question;
			$scope.$apply();
			console.log('question is a question', $scope.question);
		});
	});
