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
		return {
			sendMessage: sendMessage,
			getMessages: getMessages
		};
	})
	.factory('Users', function() {
		var user = {};
		return {
			user: user
		};
	});
