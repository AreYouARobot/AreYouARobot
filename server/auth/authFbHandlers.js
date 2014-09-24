// 'use strict'

// var request = require('request');
// var promise = require('bluebird');
// var fbConstants = require('./authConstants.js').fb;
// var jwtConstants = require('./authConstants.js').jwt;
// var User = require('../api/user/user.model.js');
// var jwt = require('jsonwebtoken');

// // What is the flow of authentication? 
// // At the login screen, a button should be clicked to link them to Facebook for authentication
// // Or signup?

// var fbTokenUrlGenerator = function(accessCode) {
// 	return fbConstants.tokenUrl + '?client_id=' + fbConstants.clientId + '&redirect_uri=' + fbConstants.redirectUri + '&client_secret=' + fbConstants.clientSecret + '&code=' + accessCode;
// };

// var exchangeCodeForToken = function(accessCode) {
// 	var fbTokenUrl = fbTokenUrlGenerator(accessCode);
// 	var parseToken = function(data) {
// 		var token = data[1].split('=')[1].split('&expires')[0];
// 		return token;
// 	}
// 	return request(fbTokenUrl).then(parseToken);
// };

// var fetchUserFbProfile = function(token) {
// 	var requestAuthHeader = 'Bearer '+token;
// 	var reequestOptions = {
// 		url: 'https://graph.facebook.com/me',
// 		headers: {Authorization: requestAuthHeader }
// 	};
// 	var parseProfileData = function(data) {
// 		var profileData = data[1];
// 		var parsedProfileData = JSON.parse(profileData);
// 		return parsedProfileData;
// 	};
// 	return request(requestOptions).then(parseProfileData);
// };

// var checkIfUserExists = function(profileData) {
// 	var user = new User({
		
// 	})
// }


// }