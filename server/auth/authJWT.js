'use strict';

var jwt = require('jsonwebtoken');
var jwtConstants = require('./authConstants.js').jwt;

module.exports.jwtCheck = function(req, res, next) {

	var token = req.headers['x-access-token'];
	console.log(req.headers, 'this is req.header');
	console.log(token, 'this is token');
	var isValidToken;
	var userObjId;

	// Comment what is happening in this entire block of text
	if(!!token) {
		jwt.verify(token, jwtConstants.secret, function(err, decoded) {

			// After jwt verifies the token with the secret, it takes a callback
			// What is decoded.id ? It's the success portion of the callback?
			// isValidToken = !err && typeof decoded.id === 'string';
			isValidToken = true;

			if(isValidToken) {
				userObjId = decoded.id;
				console.log('This is userObjId: ', userObjId);
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
