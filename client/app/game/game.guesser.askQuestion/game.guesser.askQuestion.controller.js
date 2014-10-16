'use strict';

angular.module('AYARApp')
	.controller('GuesserAskQuestionController', function($scope, $state, $stateParams, $http, gameStorage) {
		$scope.guesserSendQuestion = function() {
			$http.post('http://ayar-robot.azurewebsites.net/api/ask', {question: $scope.question})
			  .success(function(botAnswer) {
					gameStorage.guesserSendQuestion($scope.question, botAnswer, $stateParams.room);
					socket.on('guesserWait', function(room) {
						$state.go('game.guesserWaitingForResponses', {room: $stateParams.room});
					});
			  });
		};

		socket.on('gameOver', function() {
		  swal('Your game has ended!', 'Head back to the Create/Join page!', 'success');
		  $state.go('game.createOrJoinGame');
		});
	})

	.directive('ig', function() {
	  return {
	    restrict: 'E',
	    replace: true,
	    scope: {
	      fid: '@',
	      value: '=ngModel',
	      label: '@'
	    },
	    template:
	      '<material-input-group>' +
	        '<label for="{{fid}}">{{label}}</label>' +
	        '<material-input maxlength="80" id="{{fid}}" type="text" ng-model="value">' +
	      '</material-input-group>'
	  };
	});
