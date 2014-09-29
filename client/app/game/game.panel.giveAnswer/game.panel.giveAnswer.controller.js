'use strict';

angular.module('AYARApp')
  .controller('PanelGiveAnswerController', function($scope, $state, $stateParams) {
    $scope.question = $stateParams.question;
    $scope.giveAnswer = function(answer) {
    	console.log('sent answer in giveAnser', $scope.answer);
    	socket.emit('panelSentAnswer', $scope.answer);
    	$state.go('game.panelWaitingForResponses');
    };
    socket.on('sendingAllResponses', function(responses) {
			console.log('got responses', responses);
			$scope.$apply(function() {
				$scope.responses = responses;
			});
			$state.go('game.allChooseAnswer', {responses: $scope.responses});
		});
  });
