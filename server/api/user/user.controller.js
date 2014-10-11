'use strict';

var User = require('./user.model.js');
var Promise = require('bluebird');
var Q = require('q');

module.exports = {

	// sendUserProfile takes the request with the User's MongoDB object id
	// Then queries the db and returns the user 
	sendUserProfile: function(req, res) {
		var userObjId = req.userObjId;
		var getUser = Q.nbind(User.findOne, User);
		return getUser({'_id': userObjId})
			.then(function(user) {
				res.send([user]);
			});
	}

};
