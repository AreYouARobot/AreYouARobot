'use strict';

angular.module('AYARApp')
	.controller('ChatroomController', function($scope, Messages, Users) {
		$scope.messages = Messages.messages;
		$scope.user = Users.user;
		$scope.sendMessage = Messages.sendMessage;
		$scope.guessRobotOrUser = function() {
			$scope.guess = prompt('Robot or User?');
			console.log($scope.guess);
		};
	})
	.factory('Messages', function() {
		var messages = [];
		var sendMessage = function(text) {
			console.log('sendMessage triggered with text:', text);
			messages.push('User says: ' + text);
		};
		return {
			messages: messages,
			sendMessage: sendMessage
		};
	})
	.factory('Users', function() {
		var user = {};
		return {
			user: user
		};
	});
