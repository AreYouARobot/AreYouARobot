'use strict';

angular.module('AYARApp')
	.controller('GuesserAskQuestionController', function($scope, $state, $stateParams, $http, gameStorage) {
		console.log('$stateParams.room in GuesserAskQuestionController is:', $stateParams.room);
		$scope.guesserSendQuestion = function() {
			// $http.get('/api/ask', {question: question})
			  // .success(function(botAnswer) {
			  	var botAnswer = 'this is a test response';
					gameStorage.guesserSendQuestion($scope.question, botAnswer, $stateParams.room);
					// $state.go('game.guesserWaitingForResponses', {room: $stateParams.room});			  	
					socket.on('guesserWait', function(room) {
						console.log('room in guesserWait emit is', room);
						$state.go('game.guesserWaitingForResponses', {room: $stateParams.room});
					});
			  // });
		};
	});
