'use strict';

angular.module('AYARApp')
  .controller('AllChooseAnswerController', function(gameStorage, $scope, $state, $stateParams) {
		$scope.game = $stateParams.room;

		$scope.guesserChooseAnswer = function(answer) {
			gameStorage.guesserChooseAnswer(answer, $stateParams.room.room);
		};

		socket.on('displayResults', function(room) {
			$state.go('game.allDisplayResults', {room: room});
		});

		socket.on('gameOver', function() {
		  swal('Your game has ended!', 'Head back to the Create/Join page!', 'success');
		  $state.go('game.createOrJoinGame');
		});
	});
