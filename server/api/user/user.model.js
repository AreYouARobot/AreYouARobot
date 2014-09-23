'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	email: {type: String, lowercase: true},
	pic: String,
	points: Number,
	achievements: Array
});

module.exports = mongoose.model('User', UserSchema);
