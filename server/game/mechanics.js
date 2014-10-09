'use strict';

// How does this play with SocketIO?
// I would need the JWT to obtain the OBJECT ID? 

// Is it safe to have the object ids of all active players stored on the server somewhere for each reference?
// Then once the JWTs of each token are decoded, compare the object id to the stored object ids on the server (cached?)

var jwt = require('jsonwebtoken');
var jwtConstants = require('../auth/authConstants.js').jwt;
var User = require('../api/user/user.model.js');

var gameMechHelpers = {

	// THIS SHOULD BE CALLED AFTER EVERY GAME
	updateUserMetricsPreDB: function(gameObj) {
		console.log('INSIDE updateUserMetricsPreDB FUNCTION');
		var playersArray = gameObj.players;
		
		// Find max score for an array of objects with the property playerCurrentScore
		// Something like this: Math.max.apply(Math,array.map(function(o){return o.y;}))
		var winnerInPoints = Math.max.apply(Math, playersArray.map(function(obj) { return obj.playerCurrentScore; }))

		// Loop through the players array and credit properties accordingly
		for (var i = 0; i < playersArray.length; i++) {
			var player = playersArray[i]; // Player now refers to an object inside the players array
			if (player.playerCurrentScore === winnerInPoints) {
				// After the game is over (after all players go), calculate if any perfect game exists, if so flag 
				if (player.playerCurrentScore === 60) {
					player.playerGotPerfectGame++;
					player.playerWonGame++;
				} else {
					player.playerWonGame++;
				}				
			} 
		}
		console.log(gameObj, 'this is gameObj after updating metrics');
		return gameObj;
	},

	// AFTER RUNNING updateMetricsForDB function, it should then run updateUserMetricsAndAchievementsInDB
	updateUserMetricsAndAchievementsInDB: function(updatedGameObj) {
		console.log('INSIDE updateUserMetricsAndAchievementsInDB FUNCTION');
		// gameObj now has everyone's scores and additional properties that should be updated for that game.
		var that = this;
		var playersArray = updatedGameObj.players;
		// This is where we can increment each player's game count

		playersArray.forEach(function(playerObj) {
			// So this query updates each player's points and numOfGamesPlayed so far
			// It also needs to update numOfGamesWon (only one per game) for 1 player and 0 for others, and also update the numOfPerfectGames (set this conditional to whether or not a player has won for optimization). If the player hasn't won, then 

			// THIS MIGHT BE ANOTHER ASYNC ISSUE. PROMISIFY findByIdAndUpdate with Q?

			console.log('INSIDE playersArray forEach LOOP');
			User.findByIdAndUpdate(playerObj.playerObjID, {$inc: { points: playerObj.playerCurrentScore, numOfGamesPlayed: 1, numOfGamesWon: playerObj.playerWonGame, numOfPerfectGames: playerObj.playerGotPerfectGame, timesGuessedBotCorrectly: playerObj.playerGuessBotAnswer }}, function(err, user) {
				if (err) { return err; }
				console.log('user object after db save is', user);
				that.grantUserAchievementsThenUpdateDB(user);
				return user;
			});
		});
	},

	// AFTER RUNNING THE TWO ABOVE FUNCTIONS, IT SHOULD THEN RUN grantUserAchievementsThenUpdateDB 
	grantUserAchievementsThenUpdateDB: function(user) {
		// Need to figure out what updateUserMetricsInDB returns first. If it returns list of users, we're good.
		console.log('THIS IS THE USER OBJECT: ', user);
		console.log('THIS IS USER.ACHIEVEMENTS: ', user.achievements);
		console.log('THIS IS USER.ACHIEVEMENTS.LENGTH: ', user.achievements.length);
		// If it returns one user, we're going to have to throw this function into the updateUserMetricsInDB function as the callback
		var achievementsToUpdate = [];

		if (user.achievements.length) {
			console.log('WHEN USER ACHIEVEMENTS LENGTH IS GREATER THAN 0');
			for (var i = 0; i < user.achievements.length; i++) {
				var achievement = user.achievements[i]; // Inidividual achievement object
				if (achievement.hasOwnProperty('fiveBotGuesses') === false) {
					if (user.timesGuessedBotCorrectly >= 1) {
						console.log('timesguessedBotCorrectly is greater or equal to 1');
						achievementsToUpdate.push('5botguesses');
					}
				}
				if (achievement.hasOwnProperty('oneHPoints') === false) {
					if (user.points >= 50) {
						console.log('points is greater or equal to 50');
						achievementsToUpdate.push('100points');
					}
				}
				if (achievement.hasOwnProperty('fiveWins') === false) {
					if (user.numOfGamesWon >= 1) {
						console.log('numofgameswon is greater or equal to 1');
						achievementsToUpdate.push('5wins')
					}
				}
				if (achievement.hasOwnProperty('tenGamesPlayed') === false) {
					if (user.numOfGamesPlayed >= 1) {
						console.log('numofgamesplayed is greater or equal to 1');
						achievementsToUpdate.push('10gamesplayed')
					}	
				} 
			}
		} else {
			if (user.timesGuessedBotCorrectly >= 1) {
				console.log('timesguessedBotCorrectly is greater or equal to 1');
				achievementsToUpdate.push('5botguesses');
			}
			if (user.points >= 50) {
				console.log('points is greater or equal to 50');
				achievementsToUpdate.push('100points');
			}
			if (user.numOfGamesWon >= 1) {
				console.log('numofgameswon is greater or equal to 1');
				achievementsToUpdate.push('5wins')
			}
			if (user.numOfGamesPlayed >= 1) {
				console.log('numofgamesplayed is greater or equal to 1');
				achievementsToUpdate.push('10gamesplayed')
			}	
		}

		console.log('THIS IS USER ACHIEVEMENTS AFTER PUSHING NEW ACHIEVEMENTS: ', achievementsToUpdate);
		console.log('THIS IS THE USER OBJECT AFTER UPDATES: ', user);

		// Then update the database again with Achievements
		// Use the $push method to get achievement objects inside the achievements array
		User.update({_id: user._id}, {
			$addToSet: { achievements: { $each: achievementsToUpdate }}
		}, function(err, user) {
			if (err) { return err; }
			console.log('THIS IS USER OBJ AFTER THE ADDTOSET: ', user);
			return user;
		})

		// grantUserAchievements may or may not need to write to the achievements property
		// If not, then just do a client side achievements rendering/calculation? Or is that not a good idea?

		// If we could calculate achievements on the client side, do it there?
	}

}

module.exports = {

	// With the JWT, decode the JWT and grab the object ID
	decodeJWT: function(clientToken, callback) {
		console.log(clientToken, 'THIS IS CLIENT TOKEN');
		var isValidToken;
		var	userObjId;

		jwt.verify(clientToken, jwtConstants.secret, function(err, decoded) {
			// isValidToken = !err && typeof decoded.id === 'string';
			isValidToken = true;
			console.log(decoded, 'this is DECODED');

			if (isValidToken) {
				userObjId = decoded.id;
				console.log(userObjId, 'this is userObjId');
				callback(userObjId);
			} else {
				return null;
			}
		});
	},

	// This is done during every ROUND
	pickWinnerAndScoring: function(gameObj) {
		console.log('gameObj in pickWinnerAndScoring is', gameObj);
		// gameObj is basically the key on the activeGame object where the value is an object with newGame properties
		var playersArray = gameObj.players; // This is an array with players
		var answersArray = gameObj.answers; // This is an array with objects

		var guesserWinner;
		var guesserID = gameObj.players[gameObj.currentGuesserIndex].playerID;
		var panelWinnerID;
		var botID;

		console.log('playersArray', playersArray);
		console.log('answersArray', answersArray);
		console.log('guesserID', guesserID);

		for (var i = 0; i < answersArray.length; i++) {
			var playerResponseObject = answersArray[i]; // Answers array is an array of answer objs
			if (playerResponseObject.isBot) {
				botID = playerResponseObject.playerID;
			}
			if (playerResponseObject.answer === gameObj.guesserChoice) {
				// This is a valid response
				if (playerResponseObject.isBot) {
					gameObj.gameResult = 'Player Guessed Correctly!'; // Put this in the socket logic
					gameObj.players[gameObj.currentGuesserIndex].playerCurrentScore += 30;
					// This line should handle the # of times player guesses bot answer correctly
					gameObj.players[gameObj.currentGuesserIndex].playerGuessBotAnswer += 1;
					guesserWinner = true;
				} else {
					// Panel wins - then I need to loop through the player array to find who has the playerREsponseObj[playerID]
					panelWinnerID = playerResponseObject.playerID;
					gameObj.gameResult = 'Player Guessed Incorrectly'; // Put this in the socket 	
				}
			}
		}

		if (panelWinnerID) {
			for (var j = 0; j < playersArray.length; j++) {
				var player = playersArray[j];
				// Update the panelWinner's score with +15
				if (player.playerID === panelWinnerID) {
					player.playerCurrentScore += 15;
				}
				// Now I need to handle the 2nd panelist's score OR just say not bot && not guesser
				// Find the second panel player and update his score by 10
				if (player.playerID !== guesserID && player.playerID !== panelWinnerID && player.playerID !== botID) {
					// Increase the other player's points by 10  
					player.playerCurrentScore += 10;
				}
				
			}
		}

		console.log('gameObj at end of scoring is', gameObj);

		return gameObj;

	},

	/*
	var newGame = {
		room: room,
		players: [{
			playerName: socket.nickname,
			playerID: socket.id,
			playerObjID: playerObjID,
			playerCurrentScore: 0,
			playerGuessBotAnswer: 0,
			playerGotPerfectGame: 0,
			playerWonGame: 0
		}],
		currentGuesserIndex: 0,
		question: '',
		answers: [],
		guesserChoice: '',
		gameResult: ''
	};
	*/

	scoreGameUpdateMetricsAndAchivementsThenSendToDB: function(gameObj, callback) {
		// Need to practice callbacks 
		var updatedGameObj = gameMechHelpers.updateUserMetricsPreDB(gameObj) // THIS PART WORKS
		console.log(updatedGameObj, "THIS IS UPDATED GAME OBJ");
		gameMechHelpers.updateUserMetricsAndAchievementsInDB(updatedGameObj);
		// callback();
	}


	// THEN UPDATE THE DB AGAIN IF ANY ACHIEVEMENTS HAVE OCCURED. 

		// THEN SWITCH TO THE PROFILE VIEW AND MAKE SURE THE ACHIEVEMENTS ARE BEING DISPLAYED/SAVED AS WELL - Make sure the client side renders the achievements when it happens in real time by looking at the achievements property of the person and then outputting the image if necessary (how is this done? Like a switch or something?)
		// Work with Chris to handle this part if there are time constraints
};




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
