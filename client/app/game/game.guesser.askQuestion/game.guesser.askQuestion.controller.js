'use strict';

angular.module('AYARApp')
	.controller('GuesserAskQuestionController', function($scope, $state, $stateParams, $http, gameStorage) {
		console.log('$stateParams.room in GuesserAskQuestionController is:', $stateParams.room);
		$scope.guesserSendQuestion = function() {
			$http.post('http://localhost:7085/api/ask', {question: $scope.question})
			  .success(function(botAnswer) {	
					gameStorage.guesserSendQuestion($scope.question, botAnswer, $stateParams.room);
					socket.on('guesserWait', function(room) {
						console.log('room in guesserWait emit is', room);
						$state.go('game.guesserWaitingForResponses', {room: $stateParams.room});
					});
			  });
		};
	});
