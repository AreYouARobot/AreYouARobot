'use strict'

// How does this play with SocketIO?
// I would need the JWT to obtain the OBJECT ID? 

// Is it safe to have the object ids of all active players stored on the server somewhere for each reference?
// Then once the JWTs of each token are decoded, compare the object id to the stored object ids on the server (cached?)
// BONUS: Incorporate reddis? Otherwise just use a native javascript object to store this stuff.



var decideWinner = function() {
	// Need to take guesser's answer selection, and bot's answer 

	// If guesser's answer !== bot's answer, then panel wins

		// If panel winner's "pretend bot answer" is selected, that person is considered the "winner" 

	// Else, guesser wins

}

var assignScores = function(winner) {

	// If winner is guesser, we're good. Just do a +30

	// Otherwise, if winner is either of the 2 players on the panel, the panel member whose answer was chosen by the guesser gets +15 and the bot and the other panel player gets + 10

	// Return object with user identification property and a score update property

}


var updateUserScoresInDB = function() {

	// Takes an object with user identification property and score update property and sends an update query to the Mongo database

	// 

}


// Since there are multiple individuals' scores to update, loop through every object in an array to be updated? Batch queries? Need to research


