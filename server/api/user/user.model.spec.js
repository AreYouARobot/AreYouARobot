'use strict';

var should = require('chai').should();
var app = require('../../app');
var User = require('./user.model.js');

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

mockgoose(mongoose);

var User = mongoose.model('User');
var objectId = mongoose.Types.ObjectId();

beforeEach(function(done) {
	mockgoose.reset();
	User.create({
		_id: objectId,
		facebook_user_id: 'somethingmadeup',
		facebook_access_token: 'somethingmadeup',
		username: 'user1test',
		email: 'user1test@user1test.com',
		pic: 'google.com/images',
		points: 20,
		achievements: []
	}, function(err, model) {
		done(err);
	});
});

afterEach(function(done) {
	// Reset database after every test
	mockgoose.reset();
	done();
})

describe('User Model', function() {
	it('User should have an objectId property', function(done) {
		User.find(function(err, users) {
			// Returns an array
			if (err) return done(err);
			users[0]._id.should.exist;
			done();
		});
	});

	describe('Facebook User ID Property', function() {
		it('User should have a facebook_user_id property', function(done) {
			User.find(function(err, users) {
				if (err) return done(err);
				users[0].facebook_user_id.should.exist;
				done();
			});
		});

		it('facebook_user_id property should be a string', function(done) {
			User.find(function(err, users) {
				if (err) return done(err);
				var typeOfFbUserId = typeof (users[0].facebook_user_id);
				typeOfFbUserId.should.equal('string');
				done();
			});
		});
	});

	describe('Facebook Access Token Property', function() {
		it('User should have a facebook_access_token property', function(done) {
			User.find(function(err, users) {
				if (err) return done(err);
				users[0].facebook_access_token.should.exist;
				done();
			});
		});
		
		it('facebook_access_token should be a string', function(done) {
			User.find(function(err, users) {
				if (err) return done(err);
				var typeOfFbAccessToken = typeof (users[0].facebook_access_token);
				typeOfFbAccessToken.should.equal('string');
				done();
			});
		});
	});

	describe('Username Property', function() {
		it('User should have a username property', function(done) {
			User.find(function(err, users) {
				if (err) return done(err);
				users[0].username.should.exist;
				done();
			});
		});

		it('username should be a string', function(done) {
			User.find(function(err, users) {
				if (err) return done(err);
				var typeOfUsername = typeof (users[0].username);
				typeOfUsername.should.equal('string');
				done();
			});
		});	
	});

	describe('Email Property', function() {
		it('User should have an email property', function(done) {
			User.find(function(err, users) {
				if (err) return done(err);
				users[0].email.should.exist;
				done();
			});
		});	
		
		it('email should be a string', function(done) {
			User.find(function(err, users) {
				if (err) return done(err);
				var typeOfEmail = typeof (users[0].email);
				typeOfEmail.should.equal('string');
				done();
			});
		});
	});

	describe('Pic Property', function() {
		it('User should have a pic property', function(done) {
			User.find(function(err, users) {
				if (err) return done(err);
				users[0].pic.should.exist;
				done();
			});
		});	
		
		it('Pic should be a URL in string format', function(done) {
			User.find(function(err, users) {
				if (err) return done(err);
				var typeOfPic = typeof (users[0].pic);
				typeOfPic.should.equal('string');
				done();
			});
		});
	});

	describe('Points Property', function() {
		it('User should have a points property', function(done) {
			User.find(function(err, users) {
				if (err) return done(err);
				users[0].points.should.exist;
				done();
			});
		});	
		
		it('points should be a number', function(done) {
			User.find(function(err, users) {
				if (err) return done(err);
				var typeOfPoints = typeof (users[0].points);
				typeOfPoints.should.equal('number');
				done();
			});
		});
	});

	describe('Achievements Property', function() {
		it('User should have an achivements property', function(done) {
			User.find(function(err, users) {
				if (err) return done(err);
				users[0].achievements.should.exist;
				done();
			});
		});	
		
		it('achievements should be an array', function(done) {
			User.find(function(err, users) {
				if (err) return done(err);
				var typeOfAchievements = Array.isArray(users[0].achievements);
				typeOfAchievements.should.equal(true);
				done();
			});
		});
	});
});
