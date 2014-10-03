'use strict'

// How does this play with SocketIO?
// I would need the JWT to obtain the OBJECT ID? 

// Is it safe to have the object ids of all active players stored on the server somewhere for each reference?
// Then once the JWTs of each token are decoded, compare the object id to the stored object ids on the server (cached?)

var jwt = require('jsonwebtoken');
var jwtConstants = require('../auth/authConstants.js').jwt;
var User = require('../api/user/user.model.js');

module.exports = {

	// With the JWT, decode the JWT and grab the object ID
	decodeJWT: function(clientToken, callback) {
		console.log(clientToken, "THIS IS CLIENT TOKEN");
		var isValidToken;
		var	userObjId;

		jwt.verify(clientToken, jwtConstants.secret, function(err, decoded) {
			// isValidToken = !err && typeof decoded.id === 'string';
			isValidToken = true;
			console.log(decoded, "this is DECODED");

			if (isValidToken) {
				userObjId = decoded.id;
				console.log(userObjId, "this is userObjId");
				callback(userObjId);
			} else {
				return null;
			}
		})
	},

	pickWinnerAndScoring: function(gameObj) {
		// gameObj is basically the key on the activeGame object where the value is an object with newGame properties
		var playersArray = gameObj.players; // This is an array with players
		var answersArray = gameObj.answers; // This is an array with objects

		var guesserWinner;
		var guesserID = gameObj.players[gameObj.currentGuesserIndex][playerID];
		var panelWinnerID;
		var botID;

		for (var i = 0; i < answersArray.length; i++) {
			var playerResponseObject = answersArray[i]; // Answers array is an array of answer objs
			if (playerResponseObj.isBot) {
				botID = playerResponseObj.playerID;
			}
			if (playerResponseObject.answer === gameObj.guesserChoice) {
				// This is a valid response
				if (playerResponseObj.isBot) {
					gameObj.gameResults = 'Player Guessed Correctly!'; // Put this in the socket logic
					gameObj.players[gameObj.currentGuesserIndex][playerCurrentScore] += 30;
					guesserWinner = true;
				} else {
					// Panel wins - then I need to loop through the player array to find who has the playerREsponseObj[playerID]
					panelWinnerID = playerResponseObj[playerID];
					gameObj.gameResults = 'Player Guessed Incorrectly'; // Put this in the socket 	
				}
			}
		}

		if (panelWinnerID) {
			for (var j = 0; j < playersArray.length; j++) {
				var player = playersArray[i];
				// Update the panelWinner's score with +15
				if (player['playerID'] === panelWinnerID) {
					player['playerCurrentScore'] += 15;
				}
				// Now I need to handle the 2nd panelist's score OR just say not bot && not guesser
				// Find the second panel player and update his score by 10
				if (player['playerID'] !== guesserID || player['playerID'] !== panelWinnerID || player['playerID'] !== botID) {
					// Increase the other player's points by 10  
					player['playerCurrentScore'] += 10;
				}
				
			}
		}

		return gameObj;

	},

	updateUserScoresInDB: function(gameObj) {

		// gameObj now has everyone's scores that should be updated for that round.
		var playersArray = gameObj.players;
		// var updateUser = Q.nbind(User.findByIdAndUpdate, User);

		playersArray.forEach(function(playerObj) {
			Users.findByIdAndUpdate(playerObj[playerObjID], {$inc: { points: playerObj[playerCurrentScore]}}, function(err, user) {
				if (err) return err;
				return user;
			});
		});
	}


	// Since there are multiple individuals' scores to update, loop through every object in an array to be updated? Batch queries? Need to research

	
}

	// assignScores: function(guesserWinner) {
	// 	// If winner is guesser, we're good. Just do a +30
		
	// 	// The database query should be in an object format
	// 		// It would be interesting to see how the logic flows for 

	// 	if (guesserWinner === true) {

	// 		return = {
	// 			socketid: 
	// 			pointstoadd: 
	// 		}

	// 	} else {

	// 	}


	// 		// Otherwise, the panel players are winners, but the scoring is different 

	// 	// Otherwise, if winner is either of the 2 players on the panel, the panel member whose answer was chosen by the guesser gets +15 and the bot and the other panel player gets + 10

	// 	// Return object with user identification property and a score update property

	// },


	// Refactor this - this is ridiculous
	// activeGames[room].players[activeGames[room].currentGuesserIndex].playerID
		// This is the gameObject.players[]
		// [ActiveGames[room].currentGuesserIndex] - What does currentGuesserIndex to? Is it the socketID of the player?
		// var bot = activeGames[room].players[]
		// var panelist = activeGames[room].players[]

	/*

	var activeGames = {};
	activeGames[room] = newGame;

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
