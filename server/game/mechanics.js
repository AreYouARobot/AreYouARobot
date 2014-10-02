'use strict'

// How does this play with SocketIO?
// I would need the JWT to obtain the OBJECT ID? 

// Is it safe to have the object ids of all active players stored on the server somewhere for each reference?
// Then once the JWTs of each token are decoded, compare the object id to the stored object ids on the server (cached?)

module.exports = {

	// With the JWT, decode the JWT and grab the object ID
	decodeJWT: function(jwt) {
		var isValidToken;
		var	userObjId;

		jwt.verify(jwt, jwtConstants.secret, function(err, decoded) {
			isValidToken = !err && typeof decoded.id === 'string';

			if (isValidToken) {
				userObjId = decoded.id;
				return userObjId;
			} else {
				return null;
			}

		});
	};


	// Refactor this - this is ridiculous
	// activeGames[room].players[activeGames[room].currentGuesserIndex].playerID
		// This is the gameObject.players[]
		// [ActiveGames[room].currentGuesserIndex] - What does currentGuesserIndex to? Is it the socketID of the player?
		  
	
	gameObj[player[]]

	/*
	var newGame = {
		room: room,
		players: [{
			playerName: socket.nickname,
			playerID: socket.id,
			playerObjID: playerObjID,
			playerCurrentScore: 0
		}],
		currentGuesserIndex: 0,
		question: '',
		answers: [],
		guesserChoice: '',
		gameResult: ''
	};

	activeGames[room] = newGame;

	activeGames[room].players.push({
		playerName: socket.nickname,
		playerID: socket.id,
		playerObjID: playerObjID,
		playerCurrentScore: 0
	});

	activeGames[room].question = question;
	activeGames[room].answers.push({
		answer: botResponse,
		isBot: true,
		playerID: 'none'
	});

	activeGames[room].answers.push({
		answer: answer,
		isBot: false,
		playerID: socket.id
	});

	*/


	decideWinner: function(gameObj) {
		// Need to take guesser's answer selection, and bot's answer 
		var winnerGameObj = [];
		// winnerGameObj will be an array containing player objects with updated properties

		// If gameObj[room].players[]

		// newGame[playerId]

		// Basically player 0 starts as the guesser. The other two players can be identified as the panel by looking at playerID in the players array.

		// This makes it difficult, because now the decideWinner function needs logic to keep track of who's the guesser and who's on the panel at any given time

		// Reformat the socketIO logic to identify which player is the guesser and which players are part of the panel at the beginning of each round.

		if ()

		// If guesser's answer !== bot's answer, then panel wins

			// If panel winner's "pretend bot answer" is selected, that person is considered the "winner" 

		// Else, guesser wins
		return winnerGameObj;
	}

	assignScores: function(winnerGameObj) {

		// If winner is guesser, we're good. Just do a +30



		// Otherwise, if winner is either of the 2 players on the panel, the panel member whose answer was chosen by the guesser gets +15 and the bot and the other panel player gets + 10

		// Return object with user identification property and a score update property

	}


	var updateUserScoresInDB = function() {

		// Takes an object with user identification property and score update property and sends an update query to the Mongo database

		// 

	}


	// Since there are multiple individuals' scores to update, loop through every object in an array to be updated? Batch queries? Need to research

	
}

