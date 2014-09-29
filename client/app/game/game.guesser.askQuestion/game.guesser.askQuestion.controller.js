'use strict';

angular.module('AYARApp')
	.controller('GuesserAskQuestionController', function($scope, $state) {
		$scope.askQuestion = function(question) {
			console.log('scope.question is', $scope.question);
			socket.emit('guesserAskedQuestion', $scope.question);
			// need to send robot question at this point too
			// ASYNCHRONICITY IS GOING TO BE A PROBLEM HERE!
			$state.go('game.guesserWaitingForResponses');
		};
	});
