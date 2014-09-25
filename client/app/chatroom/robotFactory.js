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
		// each response within a phrase will contain a weighting
		phraseLibrary: {
			"what is your favorite color?": [
				['Blue', 0.5],
				['What is a color?', 0.1],
				['My favorite color is rainbow', 0.25],
				['Black, just like my heart', 0.15]
			]
		},
		chooseResponse: function(userMessage) {
			// first, receive text input from user-sent message
			var userText = userMessage.toLowerCase().replace(/[\.\[\],-\/#!%@$&\^&\*;:{}=\-_`~()]/g,"");
			var phrase = robot.phraseLibrary[userText];
			console.log(userText);
			// second, match response to keyword(s) in phrase library
			if (phrase) {
				// choose a random response from phrases linked to keyword(s)
				var seed = Math.random();
				var cumulativePercentage = 0;
				for (var i = 0; i < phrase.length; i++) {
					if (cumulativePercentage < seed && seed <= cumulativePercentage + phrase[i][1]) {
						return phrase[i][0];
					} else {
						cumulativePercentage += phrase[i][1];
					}
				}
			} else {
				return 'I have no idea what you are saying!';
			}
		},
		sendMessage: function(userMessage) {
		  return robot.chooseResponse(userMessage);
		}
		// getSentenceStuff: function(userMessage) {
		// 	console.log('userMessage is', userMessage);
		// 	console.log('typeof user message is', typeof userMessage);
		// 	return $http.post('/robot', {sentence: userMessage})
		// 	            .success(function(data) {
		// 	            	console.log('success in getStuff:', data);
		// 	            })
		// 	            .error(function(error) {
		// 	            	console.error('failed :(', error);
		// 	            });
		// }
	};
	return {
		robot: robot
	};
});
