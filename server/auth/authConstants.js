'use strict';

if (!process.env.isProduction){
  var fbConstants = require('../config/devConstants.js').fbConstants;
  var jwtConstants = require('../config/devConstants.js').jwtConstants;
}

module.exports.fb = {
	clientId: process.env.fbClientId || fbConstants.clientId,
	redirectUri: process.env.fbRedirectUri || fbConstants.redirectUri,
	clientSecret: process.env.fbClientSecret || fbConstants.clientSecret,
	tokenUrl: process.env.tokenUrl || fbConstants.tokenUrl
};

module.exports.jwt = {
	secret: process.env.jwtSecret || jwtConstants.secret,
	expirationInMinutes: process.env.jwtExpiration || jwtConstants.expirationInMinutes
};
