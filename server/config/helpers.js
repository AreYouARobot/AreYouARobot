'use strict'

var jwt = require('jsonwebtoken');

module.exports = {
	errorLogger: function(error, req, res, next) {
		// Log the error then send it to the next middleware in middleware.js

		console.error(error.stack);
		next(error);
	},

	errorHandler: function(error, req, res, next) {
		// Send error message to client
		// Message for graceful error handling on app
		res.send(500, {error: error.message});
	},

	decode: function(req, res, next) {
		var token = req.headers['x-access-token'];
		var user;

		if (!token) {
			return res.send(403); // Send forbidden status if a token is not provided
		}

		try {
			// Decode token and attach user to the request for inside controllers
			user = jwt.decode(token, 'secret');
			req.username = username;
			next();
		} catch(error) {
			return next(error);
		}
	}

};
