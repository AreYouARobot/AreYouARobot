'use strict';

angular.module('AYARApp')
  .controller('AllChooseAnswerController', function($scope, $state, $stateParams) {
  	console.log('you have made it this far with responses.', $stateParams.responses);
		
		$scope.responses = $stateParams.responses;
		
		$scope.guesserChooseAnswer = function(response) {
			socket.emit('guesserChoseAnswer', response);
		};

		socket.on('displayResults', function(result) {
			console.log('got results and it is:', result);
			$scope.$apply(function() {
				$scope.result = result;
			});
			$state.go('game.allDisplayResults', {result: $scope.result});
		});
  });