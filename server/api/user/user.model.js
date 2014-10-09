'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	facebook_user_id: String,
	facebook_access_token: String,
	username: {type: String, unique: true},
	email: {type: String, lowercase: true},
	pic: String,
	points: {type: Number, default: 0},
	numOfGamesWon: {type: Number, default: 0},
	numOfGamesPlayed: {type: Number, default: 0},
	numOfPerfectGames: {type: Number, default: 0},
	timesGuessedBotCorrectly: {type: Number, default: 0},
	achievements: [],
	completed_setup: Boolean,
	ceatedDateTime: {type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
