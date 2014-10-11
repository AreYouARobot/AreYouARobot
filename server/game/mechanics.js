'use strict';

/*

Game mechanics on logic is found here. 

gameMechHelpers are helper functions for the function scoreGameUpdateMetricsAndAchivementsThenSendToDB that will be exported from this module.

The mechanics module exposes only three functions: decoding the JWT,picking the winner and scoring everyone, and of course updating the metrics for everyone including calculating achievements and then sending it to the database.

*/

var jwt = require('jsonwebtoken');
var jwtConstants = require('../auth/authConstants.js').jwt;
var User = require('../api/user/user.model.js');

var gameMechHelpers = {

	// updateUserMetricsPreDB is called on the socket game object that modifies the properties on the gameObj that will eventually update on the database.
	// THIS SHOULD BE CALLED AFTER EVERY GAME
	updateUserMetricsPreDB: function(gameObj) {
		var playersArray = gameObj.players;
		
		// Find max score for an array of objects with the property playerCurrentScore
		// Something like: Math.max.apply(Math,array.map(function(o){return o.y;}))
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
		return gameObj;
	},

	// AFTER RUNNING updateMetricsForDB function, it should then run updateUserMetricsAndAchievementsInDB
	updateUserMetricsAndAchievementsInDB: function(updatedGameObj) {
		// gameObj now has everyone's scores and additional properties that should be updated for that game.
		var that = this;
		var playersArray = updatedGameObj.players;
		// This is where we can increment each player's game count

		playersArray.forEach(function(playerObj) {
			// So this query updates each player's points and numOfGamesPlayed so far
			// It also needs to update numOfGamesWon (only one per game) for 1 player and 0 for others, and also update the numOfPerfectGames (set this conditional to whether or not a player has won for optimization). If the player hasn't won, then 

			// The Mongo query updates five fields on the user model and upon updating, calls the function grantUserAchievements to calculate any achievements earned.
			// Function ultimately returns the updated user from the database
			User.findByIdAndUpdate(playerObj.playerObjID, {$inc: { points: playerObj.playerCurrentScore, numOfGamesPlayed: 1, numOfGamesWon: playerObj.playerWonGame, numOfPerfectGames: playerObj.playerGotPerfectGame, timesGuessedBotCorrectly: playerObj.playerGuessBotAnswer }}, function(err, user) {
				if (err) { return err; }
				that.grantUserAchievementsThenUpdateDB(user);
				return user;
			});
		});
	},

	// RUNS INSIDE THE DATABASE UPDATE QUERY.
	grantUserAchievementsThenUpdateDB: function(user) {
		// Initialize an array to hold the updates that will be iterated over to store in database.
		var achievementsToUpdate = [];

		if (user.achievements.length) {
			for (var i = 0; i < user.achievements.length; i++) {
				var achievement = user.achievements[i]; // Inidividual achievement object
				if (achievement.hasOwnProperty('fiveBotGuesses') === false) {
					if (user.timesGuessedBotCorrectly === 5) {
						achievementsToUpdate.push('5botguesses');
					}
				}
				if (achievement.hasOwnProperty('oneHPoints') === false) {
					if (user.points >= 100) {
						achievementsToUpdate.push('100points');
					}
				}
				if (achievement.hasOwnProperty('fiveWins') === false) {
					if (user.numOfGamesWon === 5) {
						achievementsToUpdate.push('5wins')
					}
				}
				if (achievement.hasOwnProperty('tenGamesPlayed') === false) {
					if (user.numOfGamesPlayed === 10) {
						achievementsToUpdate.push('10gamesplayed')
					}	
				} 
			}
		} else {
			if (user.timesGuessedBotCorrectly === 5) {
				achievementsToUpdate.push('5botguesses');
			}
			if (user.points >= 100) {
				achievementsToUpdate.push('100points');
			}
			if (user.numOfGamesWon === 5) {
				achievementsToUpdate.push('5wins')
			}
			if (user.numOfGamesPlayed === 10) {
				achievementsToUpdate.push('10gamesplayed')
			}	
		}

		// Then update the database again with Achievements
		// Use the $addToSet method to get achievement strings inside the achievements array so that they won't be duplicated
		User.update({_id: user._id}, {
			$addToSet: { achievements: { $each: achievementsToUpdate }}
		}, function(err, user) {
			if (err) { return err; }
			console.log('THIS IS USER OBJ AFTER THE ADDTOSET: ', user);
			return user;
		})
	}

	// Logs the user on the server side to verify that the achievements and metrics have updated.

}

module.exports = {

	// With the JWT, decode the JWT and grab the object ID
	decodeJWT: function(clientToken, callback) {
		var isValidToken;
		var	userObjId;

		jwt.verify(clientToken, jwtConstants.secret, function(err, decoded) {
			isValidToken = !err && typeof decoded.id === 'string';

			if (isValidToken) {
				userObjId = decoded.id;
				callback(userObjId);
			} else {
				return null;
			}
		});
	},

	// This is done during every ROUND
	pickWinnerAndScoring: function(gameObj) {

		// gameObj is basically the key on the activeGame object where the value is an object with newGame properties
		var playersArray = gameObj.players; // This is an array with players
		var answersArray = gameObj.answers; // This is an array with objects

		var guesserWinner;
		var guesserID = gameObj.players[gameObj.currentGuesserIndex].playerID;
		var panelWinnerID;
		var botID;

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
					panelWinnerID = playerResponseObject.playerID;
					gameObj.gameResult = 'Player Guessed Incorrectly'; // Put this in the socket 	
				}
			}
		}

		// Panel wins - then I need to loop through the player array to find who has the playerResponseObj[playerID]
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

	scoreGameUpdateMetricsAndAchivementsThenSendToDB: function(gameObj) {
		var updatedGameObj = gameMechHelpers.updateUserMetricsPreDB(gameObj);
		console.log('THIS IS UPDATED GAME OBJ FOR THE SERVER: ', updatedGameObj);
		gameMechHelpers.updateUserMetricsAndAchievementsInDB(updatedGameObj);
	}

	// After game is over, client should be able to pull the latest metrics/scores and achievements from a DB query.

};
