'use strict';

angular.module('AYARApp')
.factory('Robot', function($http) {
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
			robot.getSentenceStuff(userMessage);
		  return robot.chooseResponse(userMessage);
		}, 
		getSentenceStuff: function(userMessage) {
			console.log('userMessage is', userMessage);
			console.log('typeof user message is', typeof userMessage);
			return $http.post('/robot', {sentence: userMessage})
			            .success(function(data) {
			            	console.log('success in getStuff:', data);
			            })
			            .error(function(error) {
			            	console.error('failed :(', error);
			            });
		}
	};
	return {
		robot: robot
	};
});
