angular.module('AYARApp')
.factory('Robot', function() {
	robot = {
		username: 'Jonathan Robot',
		isBot: true,
		badVotes: 0,
		goodVotes: 0,
		responses: [ // each response needs to have good votes/bad votes properties
			'hey',
			'hi',
			'yo',
			'greetings',
			'sup?'
		],
		lastMessageSent: '',
		chooseResponse: function() {
			return robot.responses[Math.floor(Math.random() * robot.responses.length)];
		},
		sendMessage: function() {
		  return robot.chooseResponse();
		}
	};
	return {
		robot: robot
	};
});