'use strict';

var should = require('chai').should();
var request = require('supertest');
var app = require('../app.js');
var authfbHandlers = require('./authFbHandlers.js');

describe('FB OAuth', function() {
	describe('Facebook Token URL Generator', function() {
		it('fbTokenUrlGeneator should be a function', function(done) {
			var fbTokenUrlGenerator = authfbHandlers.fbLoginApiTest['api.testing_fbTokenUrlGenerator'];
			fbTokenUrlGenerator.should.be.a('function');
			done();
		});

		it('Should generate a FB URL with access code', function(done) {
			var accessCode = 'AQASkYDomHYA_tdPGJru-QOPw_h67tReQ60ygoRX-jrbXK7HTYCMVIR-hlTx_ic505K4MXKt0_sa1eLBH_WduYzbyCFc72Nrkb4AajjEtIZaeIQ0rAPHuMz-yVQ-tP54PeTTWsKeUl91KilOmeDfkz14Tn0eKXNP0kcoxZzFw6zZzR3mPgvKX7oAXr_1w5ZzDDUIaAE_Jo5fpHfKZOvG6xa-zC22zUJPxi-7LonX3LualpRyxcApiuNMi5mtSN42zaxcvSjUEmeCb-r0zPk_DbD4nLCUCDH3YsTB0IdRpX2ywFk5igmKFcvDJpM7vzCGkDrIexT4cQ2btKxFIpm7G97S#_=_';
			var fbTokenUrlGenerator = authfbHandlers.fbLoginApiTest['api.testing_fbTokenUrlGenerator'];
			fbTokenUrlGenerator(accessCode).should.be.a('string');
			done();
		});
	});

	describe('Exchanging Access Code for Token', function() {
		it('exchangeCodeForToken should be a fuction', function(done) {
			var exchangeCodeForToken = authfbHandlers.fbLoginApiTest['api.testing_exchangeCodeForToken'];
			exchangeCodeForToken.should.be.a('function');
			done();
		});
	});

	describe('Fetch Facebook Profile', function() {
		it('fetchUserFbProfile should be a function', function(done) {
			var fetchUserFbProfile = authfbHandlers.fbLoginApiTest['api.testing_fetchUserFbProfile'];
			fetchUserFbProfile.should.be.a('function');
			done();
		});
	});

	describe('Checking if User exists', function() {
		it('checkIfUserExists should be a function', function(done) {
			var checkIfUserExists = authfbHandlers.fbLoginApiTest['api.testing_checkIfUserExists'];
			checkIfUserExists.should.be.a('function');
			done();
		});
	});

	describe('Updating the User Profile', function() {
		it('updateUserProfile should be a function', function(done) {
			var updateUserProfile = authfbHandlers.fbLoginApiTest['api.testing_updateUserProfile'];
			updateUserProfile.should.be.a('function');
			done();
		});
	});

	describe('Creating a new User Profile', function() {
		it('createUserProfile should be a function', function(done) {
			var createUserProfile = authfbHandlers.fbLoginApiTest['api.testing_createUserProfile'];
			createUserProfile.should.be.a('function');
			done();
		});
	});

	describe('Sending the JWT after obtaining User Information', function() {
		it('sendJWT should be a function', function(done) {
			var sendJWT = authfbHandlers.fbLoginApiTest['api.testing_sendJWT'];
			sendJWT.should.be.a('function');
			done();
		});
	});

});
