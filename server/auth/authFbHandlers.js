	'use strict';

var request = require('../config/promiserequest.js').request;

var Q = require('q'); // Q used to promisify the database queries
var fbConstants = require('./authConstants.js').fb;
var jwtConstants = require('./authConstants.js').jwt;
var User = require('../api/user/user.model.js');
var jwt = require('jsonwebtoken');

/////// THESE ARE ALL HELPER FUNCTIONS ////////

var fbTokenUrlGenerator = function(accessCode){
  return fbConstants.tokenUrl + '?client_id=' + fbConstants.clientId + '&redirect_uri=' + fbConstants.redirectUri + '&client_secret=' + fbConstants.clientSecret + '&code=' + accessCode;
};

var exchangeCodeForToken = function(accessCode){
  var fbTokenUrl = fbTokenUrlGenerator(accessCode);
  console.log(fbTokenUrl, 'this is fbTokenUrl that uses the fbTokenUrlGenerator+AccessCode');
  var parseToken = function(data){
  	console.log(data, 'THIS IS DATA FROM FB REQ');
    var token = data[1].split('=')[1].split('&expires')[0];
    console.log(token, 'this is token');
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
    console.log(data, 'this is data returned from FB');
    console.log(profileData, 'this is data[1] from FB response');
    var parsedProfileData = JSON.parse(profileData);
    console.log('this is parsed ProfileData: ', parsedProfileData);
    return parsedProfileData;
  };
  return request(requestOptions).then(parseProfileData);
};

// Mongoose here or regular MongoDB query?
var checkIfUserExists = function(profileData) {
	// Scott uses Q.nbind to bind the User.findOne method to User
	// Where is it losing context?
		// Why not just try it? Do a User.findOne({'username': username})
		// Q makes Scott's findUser call return a promise
		console.log('THIS IS PROFILEDATA INSIDE CHECKIFUSEREXISTS: ', profileData);
		var findUser = Q.nbind(User.findOne, User);
		var findUsers = Q.nbind(User.find, User);
		findUsers()
			.then(function(users) {
				console.log(users);
			});
		// var user = findUser({facebook_user_id: profileData.id});
		// console.log(JSON.stringify(user), 'this is the user from MongoDB');
		return findUser({facebook_user_id: profileData.id});
};

// Might refactor all of this into Q for promisifying stuff.
// Reference Shortly-Angular

var updateUserProfile = function(userModel, fbProfileInfo, accessToken) {
	console.log('INSIDE UPDATEUSERPROFILE');
	console.log('userModel is this: ', userModel);
	var updateUser = Q.nbind(User.findOne, User);
	return updateUser({facebook_user_id: fbProfileInfo.id})
		.then(function(user) {
			user.facebook_access_token = accessToken;
			user.save();
			return user;
		})
		.then(function(user) {
			console.log('INSIDE UPDATEUSERPROFILE CALLBACK');
			console.log(user, 'this is user INSIDE UPDATEUSERPROFILE');
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
	console.log('At createUserProfile');

	var newUser = {
		facebook_user_id: fbProfileInfo.id,
		username: fbProfileInfo.name,
		email: fbProfileInfo.email,
		points: 0,
		achievements: [],
		facebook_access_token: accessToken
	};
	console.log(newUser, 'this is newUser');
	return create(newUser)
		.then(function() {
			console.log('after creating a new User');
			return findUser({facebook_user_id: fbProfileInfo.id})
				.then(function(user) {
					console.log('FOUND USER - ', user);
					var userAccountInfo = {
						users_objectKey: user._id,
						isNewUser: true
					}
					console.log(userAccountInfo, 'USERACCOUNTINFO RETURNED');
					return userAccountInfo;
				});
		});
};

var sendJWT = function(accountDetails, res, fbProfileInfo) {
	// This creates the JSON web token and then sends it to the client
	// The client then needs to take the JSON web token and make sure it is attached on every server request in the header.
	var payload = {id: accountDetails.users_objectKey};
	console.log(payload, 'is payload this legit?');
	var token = jwt.sign(payload, jwtConstants.secret, {expiresInMinutes: jwtConstants.expirationInMinutes});
	console.log(token, 'this is the JWT token');

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

	// So something comes in the req.body. What do I need?
  var accessCode = req.body.code;
  var accessToken;
  var fbProfileInfo;

  exchangeCodeForToken(accessCode)

  .then(function(token){  
    accessToken = token;
    console.log(accessToken, 'this is the accessToken');
    return token;
  })

  .then(fetchUserFbProfile)

  .then(function(profileData){
    fbProfileInfo = profileData;
    console.log('this is profileData: ', profileData)
    return profileData;
  })

	// Afterward, check if the user exists
	.then(checkIfUserExists)

	.then(function(userModel) {
		console.log(userModel, 'after checking if user exists');
		var userExists = !!userModel;
		console.log('THIS IS USER EXISTS: ', userExists);
		if (userExists) {
			console.log(userExists, 'this is userExists');
			return updateUserProfile(userModel, fbProfileInfo, accessToken);
		} else {
			return createUserProfile(fbProfileInfo, accessToken);
		}
	})

	// // // Returns user's account information
	// // // Need to create a JWT and send it back to the client to store
	.then(function(userAccountInfo) {
		console.log(userAccountInfo, 'this is userAccountInfo');
		sendJWT(userAccountInfo, res, fbProfileInfo);
	});

}
