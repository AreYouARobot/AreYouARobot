'use strict';

var jwt = require('jsonwebtoken');
var jwtConstants = require('./authConstants.js').jwt;

// jwtCheck runs on each call to the user api routes
module.exports.jwtCheck = function(req, res, next) {

	var token = req.headers['x-access-token'];
	var isValidToken;
	var userObjId;

	// Checks if there's a token
	if(!!token) {
		jwt.verify(token, jwtConstants.secret, function(err, decoded) {

			// JWT verify takes the token sent from the request header and decodes it with the secret.
			// The decoded id is then stored and used to query Mongo for the rest of the user information
			isValidToken = !err && typeof decoded.id === 'string';

			if(isValidToken) {
				userObjId = decoded.id;
				req.userObjId = userObjId;
				next();
			} else {
				res.status(401).send({routeToLogin: true});
			}
		});
	
	} else {
		res.status(401).send({routeToLogin: true});
	}

};
