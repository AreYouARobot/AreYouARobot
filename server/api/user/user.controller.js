'use strict';

var User = require('./user.model.js');
var Promise = require('bluebird');
var Q = require('q');

module.exports = {

	sendUserProfile: function(req, res) {
		var userObjId = req.userObjId;
		console.log('made it to sendUserProfile');
		var getUser = Q.nbind(User.findOne, User);
		return getUser({'_id': userObjId})
			.then(function(user) {
				console.log('This is the user object from the MongoDB');
				console.log(user, 'this is user');
				res.send([user]);
			});
	}

};
