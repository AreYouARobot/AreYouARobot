'use strict'

// Should authentication handle all the signup stuff as well?
// In Shortly-Angular, Scott put these methods inside the user controller
// Figure out how to incorporate both and make the authentication piece work?

// What happens if login fails in this logic?
// Do they get redirected? Does Facebook redirect them? Or do they stay on Facebook?
// I'm actually not sure?

// var requestnpm = require('request');
// var promise = require('bluebird');

// var request = promise.promisify(requestnpm).request;
var request = require('../config/promiserequest.js').request;

var Q = require('q'); // Q used to promisify the database queries
var fbConstants = require('./authConstants.js').fb;
var jwtConstants = require('./authConstants.js').jwt;
var User = require('../api/user/user.model.js');
var jwt = require('jsonwebtoken');

/////// THESE ARE ALL HELPER FUNCTIONS ////////

var fbTokenUrlGenerator = function(accessCode) {
	return fbConstants.tokenUrl + '?client_id=' + fbConstants.clientId + '&redirect_uri=' + fbConstants.redirectUri + '&client_secret=' + fbConstants.clientSecret + '&code=' + accessCode;
};

// Potentially re-write some of this stuff.
var exchangeCodeForToken = function(accessCode) {
	var fbTokenUrl = fbTokenUrlGenerator(accessCode);
	console.log(fbTokenUrl, "this is fbTokenUrl that uses the fbTokenUrlGenerator+AccessCode");
	var parseToken = function(data) {
		// Unless there's an example, I'm not sure what parseToken is returning?
		var token = data[1].split('=')[1].split('&expires')[0];
		console.log(token, "this is token");
		return token;
	}
	return request(fbTokenUrl).then(parseToken);
	// return;
};

var fetchUserFbProfile = function(token) {
	var requestAuthHeader = 'Bearer '+token;
	var requestOptions = {
		url: 'https://graph.facebook.com/me',
		headers: {Authorization: requestAuthHeader }
	};
	var parseProfileData = function(data) {
		var profileData = data[1];
		var parsedProfileData = JSON.parse(profileData);
		return parsedProfileData;
	};
	console.log("here at fetchUserfbProfile");
	return request(requestOptions).then(parseProfileData);
};

// Mongoose here or regular MongoDB query?
var checkIfUserExists = function(profileData) {
	// Scott uses Q.nbind to bind the User.findOne method to User
	// Where is it losing context?
		// Why not just try it? Do a User.findOne({'username': username})
		// Q makes Scott's findUser call return a promise
		console.log("got here");
		return;
}

// Might refactor all of this into Q for promisifying stuff.
// Reference Shortly-Angular
var updateUserProfile = function(userModel, fbProfileInfo, accessToken) {
	var findOne = Q.nbind(User.findOne, User);
	console.log("got to updateUserProfile");
	findOne({username: username})
	return;
}

// Create UserProfile function still needs to be built
var createUserProfile = function() {
	console.log("Got to create user profile");
	return;
};

var sendJWT = function(accountDetails, res, fbProfileInfo) {
	// This creates the JSON web token and then sends it to the client
	// The client then needs to take the JSON web token and make sure it is attached on every server request in the header.
	var payload = {id: accountDetails.user["_id"]};
	var token = jwt.sign(payload, jwtConstants.secret, {expiresInMinutes: jwtConstants.expirationInMinutes});

	res.status(200).send({
	  token: token, 
	  isNewUser: accountDetails.isNewUser, 
	  //TAKE OUT FBPROFILEINFO - What is inside FBProfileInfo that needs to be taken out?
	  // Better yet, why is it included in the sendJWT function?
	  fbProfileInfo: fbProfileInfo
	});
};


// Export the fbLogin function that handles authentication
// All the helper functions were written above to not clutter up the login function itself
module.exports.fbLogin = function(req, res) {

	// So something comes in the req.body. What do I need?
	var accessCode = req.body.code; // As long as it's configured correctly on the client side
	console.log(req.body, "this is req.body");
	var accessToken;
	var fbProfileInfo;

	// Once the client sends the fbURL over with the accesscode, we parse the URL for the code, and then bundle it together with app id and app secret and send to FB for an accessToken
	exchangeCodeForToken(accessCode) // What does exchangeCodeForToken do?

	// After FB validates the credentials, an accessToken is granted and we store it in the accessToken variable
	.then(function(token) {
		accessToken = token;
		return token;
	})

	// // Then we make a FB api call to grab profile data
	.then(fetchUserFbProfile())

	// // Then store that data into the variable fbProfileInfo
	.then(function(profileData) {
		fbProfileInfo = profileData;
		console.log(fbProfileInfo, "fbProfileInfo");
	})

	// Afterward, check if the user exists
	// .then(checkIfUserExists)

	// .then(function(userModel) {
	// 	var userExists = !!userModel;
	// 	if (userExists) {
	// 		return updateUserProfile(userModel, fbProfileInfo, accessToken);
	// 	} else {
	// 		return createUserProfile(fbProfileInfo, accessToken);
	// 	}
	// })

	// // Returns user's account information
	// // Need to create a JWT and send it back to the client to store
	// .then(function(userAccountInfo) {
	// 	sendJWT(userAccountInfo, res, fbProfileInfo);
	// });

}
