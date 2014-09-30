'use strict';

angular.module('AYARApp')
	.controller('GuesserAskQuestionController', function($scope, $state, $stateParams, $http, gameStorage) {
		$scope.guesserSendQuestion = function() {
			// $http.get('/api/ask', {question: question})
			  // .success(function(botAnswer) {
			  	var botAnswer = 'this is a test response';
					gameStorage.guesserSendQuestion($scope.question, botAnswer, $stateParams.room);
					// $state.go('game.guesserWaitingForResponses', {room: $stateParams.room});			  	
					socket.on('guesserWait', function(room) {
						$state.go('game.guesserWaitingForResponses', {room: $stateParams.room});
					});
			  // });
		};
	});
