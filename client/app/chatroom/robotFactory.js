'use strict';

angular.module('AYARApp')
.factory('Robot', function() {
	var robot = {
		username: 'Jonathan Robot',
		isBot: true,
		badVotes: 0,
		goodVotes: 0,
		// phraseLibrary will be an object that contains phrases (keywords)
		// each phrase (keyword) will contain an array of possible responses
		phraseLibrary: {
			"hi": [
				'hey',
				'hi',
				'yo',
				'greetings',
				'sup?'
			],
			"how are you?": [
				'good',
				'fine',
				'bad',
				'sad',
				'ok'
			]
		},
		lastMessageSent: '',
		chooseResponse: function(userMessage) {
			// first, receive text input from user-sent message
			var userText = userMessage;
			var phrase = robot.phraseLibrary[userText];
			// second, match response to keyword(s) in phrase library
			if (phrase) {
				// choose a random response from phrases linked to keyword(s)
				return phrase[Math.floor(Math.random() * phrase.length)];	
			} else {
				// default value for now
				return 'I don\'t know what you\'re saying!';
			}
			// send response (function below)
		},
		sendMessage: function(userMessage) {
		  return robot.chooseResponse(userMessage);
		}
	};
	return {
		robot: robot
	};
});