'use strict'

var request = require('request');
var promise = require('bluebird');
var fbConstants = require('./authConstants.js').fb;
var jwtConstants = require('./authConstants.js').jwt;
var User = require('../api/user/user.model.js');
var jwt = require('jsonwebtoken');

// What is the flow of authentication? 
// At the login screen, a button should be clicked to link them to Facebook for authentication
// Or signup?

var fbTokenUrlGenerator = function(accessCode) {
	return fbConstants.tokenUrl + '?client_id=' + fbConstants.clientId + '&redirect_uri=' + fbConstants.redirectUri + '&client_secret=' + fbConstants.clientSecret + '&code=' + accessCode;
};

var exchangeCodeForToken = function(accessCode) {
	var fbTokenUrl = fbTokenUrlGenerator(accessCode);
	var parseToken = function(data) {
		// Unless there's an example, I'm not sure what parseToken is returning?
		var token = data[1].split('=')[1].split('&expires')[0];
		return token;
	}
	return request(fbTokenUrl).then(parseToken);
};

var fetchUserFbProfile = function(token) {
	var requestAuthHeader = 'Bearer '+token;
	var reequestOptions = {
		url: 'https://graph.facebook.com/me',
		headers: {Authorization: requestAuthHeader }
	};
	var parseProfileData = function(data) {
		var profileData = data[1];
		var parsedProfileData = JSON.parse(profileData);
		return parsedProfileData;
	};
	return request(requestOptions).then(parseProfileData);
};


// Mongoose here or regular MongoDB query?
// var checkIfUserExists = function(profileData) {
// 	var user = new User({
		
// 	})
// }

module.exports.fbLogin = function(req, res) {

	// So something comes in the req.body. What do I need?
	var accessCode = req.body.code; // As long as it's configured correctly on the client side
	var accessToken;
	var fbProfileInfo;

	// Once the client sends the fbURL over with the accesscode, we parse the URL for the code, and then bundle it together with app id and app secret and send to FB for an accessToken
	exchangeCodeForToken(accessCode); // What does exchangeCodeForToken do?

	// After FB validates the credentials, an accessToken is granted and we store it in the accessToken variable
	.then(function(token) {
		accessToken = token;
		return token;
	})

	// Then we make a FB api call to grab profile data
	.then(fetchUserFbProfile())

	// Then store that data into the variable fbProfileInfo
	.then(function(profileData) {
		fbProfileInfo = profileData;
	})

	// Afterward, check if the user exists
	.then(checkIfUserExists)

	.then(function(placeHolder) {
		var userExists = !!placeHolder;
		if (userExists) {
			return updateUserProfile(placeHolder, fbProfileInfo, accessToken);
		} else {
			return createUserProfile(fbProfileInfo, accessToken);
		}
	})

	// Need to create a JWT and send it back to the client to store
	.then(function() {

	})

}
