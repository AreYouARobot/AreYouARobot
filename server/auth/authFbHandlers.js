	'use strict';

var request = require('../config/promiserequest.js').request;

var Q = require('q'); // Q used to promisify the database queries
var fbConstants = require('./authConstants.js').fb;
var jwtConstants = require('./authConstants.js').jwt;
var User = require('../api/user/user.model.js');
var jwt = require('jsonwebtoken');

/////// BELOW ARE HELPER FUNCTIONS FOR THE FBLOGIN HANDLER ////////

var fbTokenUrlGenerator = function(accessCode){
  return fbConstants.tokenUrl + '?client_id=' + fbConstants.clientId + '&redirect_uri=' + fbConstants.redirectUri + '&client_secret=' + fbConstants.clientSecret + '&code=' + accessCode;
};

var exchangeCodeForToken = function(accessCode){
  var fbTokenUrl = fbTokenUrlGenerator(accessCode);
  var parseToken = function(data){
  	// Data returned from the FB Request that contains the user's auth token
    var token = data[1].split('=')[1].split('&expires')[0];
    return token;
  };
  return request(fbTokenUrl).then(parseToken);
};

var fetchUserFbProfile = function(token){
  var requestAuthHeader = 'Bearer '+token;
  var requestOptions = {
    url: 'https://graph.facebook.com/me',
    headers: {Authorization: requestAuthHeader }
  };
  var parseProfileData = function(data){
    var profileData = data[1];
    var parsedProfileData = JSON.parse(profileData);
    return parsedProfileData;
  };
  return request(requestOptions).then(parseProfileData);
};

// Using Q to promisify MongoDB queries to find user/users
var checkIfUserExists = function(profileData) {
		var findUser = Q.nbind(User.findOne, User);
		var findUsers = Q.nbind(User.find, User);
		findUsers()
			.then(function(users) {
				console.log('users found in MongoDB - Success');
			});
		return findUser({facebook_user_id: profileData.id});
};

var updateUserProfile = function(userModel, fbProfileInfo, accessToken) {
	var updateUser = Q.nbind(User.findOne, User);
	return updateUser({facebook_user_id: fbProfileInfo.id})
		.then(function(user) {
			user.facebook_access_token = accessToken;
			user.save();
			return user;
		})
		.then(function(user) {
			var isNewUser = true;
			if (userModel['completed_setup'] === true) {
				isNewUser = false;
			}
			return {
				users_objectKey: userModel._id,
				isNewUser: isNewUser
			}
		});
};

// Create UserProfile function still needs to be built
var createUserProfile = function(fbProfileInfo, accessToken) {
	var create = Q.nbind(User.create, User);
	var findUser = Q.nbind(User.findOne, User);

	var newUser = {
		facebook_user_id: fbProfileInfo.id,
		username: fbProfileInfo.name,
		email: fbProfileInfo.email,
		points: 0,
		achievements: [],
		facebook_access_token: accessToken
	};

	return create(newUser)
		.then(function() {
			return findUser({facebook_user_id: fbProfileInfo.id})
				.then(function(user) {
					var userAccountInfo = {
						users_objectKey: user._id,
						isNewUser: true
					}
					return userAccountInfo;
				});
		});
};

// This creates the JSON web token and then sends it to the client
var sendJWT = function(accountDetails, res, fbProfileInfo) {
	// The client then needs to take the JSON web token and make sure it is attached on every server request in the header.
	var payload = {id: accountDetails.users_objectKey};
	var token = jwt.sign(payload, jwtConstants.secret, {expiresInMinutes: jwtConstants.expirationInMinutes});

	res.status(200).send({
	  token: token, 
	  isNewUser: accountDetails.isNewUser, 
	  fbProfileInfo: fbProfileInfo
	});
};


// Export the fbLogin function that handles authentication
// All the helper functions were written above to not clutter up the login function itself

module.exports.fbLoginApiTest = {
	
		'api.testing_fbTokenUrlGenerator': fbTokenUrlGenerator,
		'api.testing_exchangeCodeForToken': exchangeCodeForToken,
		'api.testing_fetchUserFbProfile': fetchUserFbProfile,
		'api.testing_checkIfUserExists': checkIfUserExists,
		'api.testing_updateUserProfile': updateUserProfile,
		'api.testing_createUserProfile': createUserProfile,
		'api.testing_sendJWT': sendJWT
}

module.exports.fbLogin = function(req, res) {

  var accessCode = req.body.code;
  var accessToken;
  var fbProfileInfo;

  exchangeCodeForToken(accessCode)

  .then(function(token){  
    accessToken = token;
    return token;
  })

  .then(fetchUserFbProfile)

  .then(function(profileData){
    fbProfileInfo = profileData;
    return profileData;
  })

	// Afterward, check if the user exists
	.then(checkIfUserExists)

	// Returns the user's account/profile information from MongoDB
	.then(function(userModel) {
		var userExists = !!userModel;
		if (userExists) {
			return updateUserProfile(userModel, fbProfileInfo, accessToken);
		} else {
			return createUserProfile(fbProfileInfo, accessToken);
		}
	})

	// Takes the User info and creates a JWT and send it back to the client to store locally
	.then(function(userAccountInfo) {
		sendJWT(userAccountInfo, res, fbProfileInfo);
	});

}
