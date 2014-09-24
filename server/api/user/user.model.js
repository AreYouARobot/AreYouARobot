'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	facebook_user_id: String,
	facebook_access_token: String,
	username: String,
	email: {type: String, lowercase: true},
	pic: String,
	points: Number,
	achievements: Array
});

module.exports = mongoose.model('User', UserSchema);
