'use strict';

angular.module('AYARApp')
  .controller('AllChooseAnswerController', function(gameStorage, $scope, $state, $stateParams) {
  	console.log('you have made it this far with responses.', $stateParams.room.answers);
		
		$scope.answers = $stateParams.room.answers;
		
		$scope.guesserChooseAnswer = function(answer) {
			gameStorage.guesserChooseAnswer(answer, $stateParams.room.room);
		};

		socket.on('displayResults', function(room) {
			$state.go('game.allDisplayResults', {room: room});
		});

  });
  