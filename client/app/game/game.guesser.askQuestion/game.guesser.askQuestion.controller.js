'use strict';

angular.module('AYARApp')
	.controller('GuesserAskQuestionController', function($scope, $state) {
		$scope.askQuestion = function(question) {
			console.log('scope.question is', $scope.question);
			socket.emit('guesserAskedQuestion', $scope.question);
			$state.go('game.guesserWaitingForResponses');
		};
	});
