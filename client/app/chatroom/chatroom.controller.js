'use strict';

angular.module('AYARApp')
	.controller('ChatroomController', function($scope, Messages, Users) {
		$scope.messages = [];
		$scope.sendMessage = function(text) {
			Messages.sendMessage({
				id: 100,
				username: 'Test User',
				message: text,
				createdate: 'now!'
			});
			Messages.sendMessage({
				id: 101,
				username: Messages.robot.name,
				message: Messages.robot.chooseResponse(),
				createdate: 'now!'
			});
		};
		$scope.getMessages = function() {
			Messages.getMessages(function(data) {
				for(var i = 0; i < data.data.length; i++) {
					console.log('individual data object is', data.data[i]);
					$scope.messages.push(data.data[i]);
				}
				console.log($scope.messages);
			});
		};
		$scope.guessRobotOrUser = function() {
			$scope.guess = prompt('Robot or User?');
			console.log($scope.guess);
		};
		$scope.getMessages();
	})
	.factory('Messages', function($http) {
		var sendMessage = function(text) {
			console.log('in sendMessage');
			$http.post('api/messages', text)
			  .success(function(data) {
			  	console.log('Success:', data)
			  })
			  .error(function(data) {
			  	console.error('Error:', data);
			  });
		};
		var getMessages = function(callback) {
			$http.get('api/messages')
			  .success(function(data) {
			  	console.log('GET request successful.');
			  	callback(data);
			  })
			  .error(function(data) {
			  	console.error('Error:', data);
			  });
		};
		var robot = {
			name: 'Jonathan Robot',
			responses: [
				'hey',
				'hi',
				'yo',
				'greetings',
				'sup?'
			],
			chooseResponse: function() {
				return robot.responses[Math.floor(Math.random() * robot.responses.length)];
			}
		};
		return {
			sendMessage: sendMessage,
			getMessages: getMessages,
			robot: robot
		};
	})
	.factory('Users', function() {
		var user = {};
		return {
			user: user
		};
	});

// NOTES: JW
// Needs to pull logged-in user as part of message text
// Needs to auto-generate ID for each user
// Needs to only populate messages that haven't already been populated (stop getting duplicate messages on pull requests)
// Needs to scroll/iFrame
