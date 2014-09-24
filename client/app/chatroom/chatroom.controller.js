'use strict';

angular.module('AYARApp')
	.controller('ChatroomController', function($scope, Messages, Robot) {
		$scope.messages = [];
		$scope.sendMessage = function(text) {
		  $scope.messages = [];

			Messages.sendMessage({
				id: 100,
				username: 'Test User',
				message: text,
				createdate: 'now!'
			});
			Messages.sendMessage({
				id: 101,
				username: Robot.robot.username,
				message: Robot.robot.sendMessage(),
				createdate: 'now!'
			});
			$scope.getMessages();
			$scope.clearText();
		};
		$scope.getMessages = function() {
			Messages.getMessages(function(data) {
				$scope.messages = data.data;
				// for(var i = 0; i < data.data.length; i++) {
				// 	$scope.messages.push(data.data[i]);
				// }
			});
		};
		$scope.guessRobotOrUser = function() {
			$scope.guess = prompt('Robot or User?');
			if($scope.guess.toLowerCase() === 'robot' ){
				Robot.robot.badVotes++;
				console.log(Robot.robot.badVotes);
			} else if ($scope.guess.toLowerCase() === 'user') {
				Robot.robot.goodVotes++;
				console.log(Robot.robot.goodVotes);
			}
		};
		$scope.clearText = function() {
			$scope.messageText = '';
		};

		$scope.getMessages();
	})

	.factory('Messages', function($http) {
		var sendMessage = function(text) {
			$http.post('api/messages', text)
			  .success(function(data) {
			  	console.log('Success:', data);
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
	});

// NOTES: JW
// Needs to pull logged-in user as part of message text
// Needs to auto-generate ID for each user
// Needs to only populate messages that haven't already been populated (stop getting duplicate messages on pull requests)
// Needs to scroll/iFrame
