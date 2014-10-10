'use strict';

angular.module('AYARApp')
  .controller('AllChooseAnswerController', function(gameStorage, $scope, $state, $stateParams) {
  	console.log('you have made it this far with responses.', $stateParams.room.answers);
		$scope.game = $stateParams.room;

		// $scope.question = $stateParams.room.question;
		// $scope.answers = $stateParams.room.answers;
		console.log('$stateParams.room in AllChooseAnswerController is:', $stateParams.room);

		$scope.guesserChooseAnswer = function(answer) {
			gameStorage.guesserChooseAnswer(answer, $stateParams.room.room);
		};

		socket.on('displayResults', function(room) {
			console.log('room in displayResults emit is', room);
			$state.go('game.allDisplayResults', {room: room});
		});

		socket.on('gameOver', function() {
		  swal('Your game has ended!', 'Head back to the Create/Join page!', 'success');
		  $state.go('game.createOrJoinGame');
		});
	});
