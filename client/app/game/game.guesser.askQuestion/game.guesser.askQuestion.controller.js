'use strict';

angular.module('AYARApp')
	.controller('GuesserAskQuestionController', function($scope, $state, $stateParams, $http, gameStorage) {
		console.log('$stateParams.room in GuesserAskQuestionController is:', $stateParams.room);
		$scope.guesserSendQuestion = function() {
			$http.post('http://ayar-robot.azurewebsites.net/api/ask', {question: $scope.question})
			  .success(function(botAnswer) {
					gameStorage.guesserSendQuestion($scope.question, botAnswer, $stateParams.room);
					socket.on('guesserWait', function(room) {
						console.log('room in guesserWait emit is', room);
						$state.go('game.guesserWaitingForResponses', {room: $stateParams.room});
					});
			  });
		};

		$scope.console = function(){
			console.log($scope.question);
		}
		// $scope.goToNextView = function() {
		// 	$state.go('testingExample.view2');
		// };
		// $scope.sendTest = function() {
		// 	socket.emit('test', 'this is a test');
		// }
		// socket.on('sendBack', function(msg) {
		// 	$state.go('testingExample.view2');
	})

	.directive('ig', function() {
	  return {
	    restrict: 'E',
	    replace: true,
	    scope: {
	      fid: '@',
	      value: "=ngModel",
	      label: '@'
	    },
	    template:
	      '<material-input-group>' +
	        '<label for="{{fid}}">{{label}}</label>' +
	        '<material-input id="{{fid}}" type="text" ng-model="value">' +
	      '</material-input-group>'
	  };
	});
