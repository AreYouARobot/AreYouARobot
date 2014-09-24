'use strict'

var jwt = require('jsonwebtoken');
var jwtConstants = require('./authConstants.js').jwt;

module.exports.jwtCheck = function(req, res, next) {

	var token = req.header['x-access-token'];
	console.log(req.header, "this is req.header");
	console.log(token, "this is token");
	var isValidToken;

	// Comment what is happening in this entire block of text
	if(!!token) {
		jwt.verify(token, jwtConstants.secret, function(err, decoded) {

			// After jwt verifies the token with the secret, it takes a callback
			// What is decoded.id ? It's the success portion of the callback?
			isValidToken = !err && typeof decoded.id === 'number';

			if(isValidToken) {
				req.userId = decoded.id;
				next();
			} else {
				res.status(401).send({routeToLogin: true});
			}
		});
	
	} else {
		res.status(401).send({routeToLogin: true});
	}

}
