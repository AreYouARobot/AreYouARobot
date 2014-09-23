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
			"how are you": [
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
			var userText = userMessage.toLowerCase().replace(/[\.\[\],-\/#!%@?$&\^&\*;:{}=\-_`~()]/g,"");
			var phrase = robot.phraseLibrary[userText];
			// second, match response to keyword(s) in phrase library
			if (phrase) {
				// choose a random response from phrases linked to keyword(s)
				var response = phrase[Math.floor(Math.random() * phrase.length)];	
				if (response !== robot.lastMessageSent) {
					robot.lastMessageSent = response;
					return response;
				} else {
					return robot.chooseResponse(userMessage);
				}
			} else {
				// default value for now
				robot.lastMessageSent = '';
				return 'I don\'t know what you\'re saying!';
			}
		},
		sendMessage: function(userMessage) {
		  return robot.chooseResponse(userMessage);
		}
	};
	return {
		robot: robot
	};
});