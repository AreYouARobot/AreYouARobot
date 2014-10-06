'use strict';

var should = require('chai').should();
var request = require('supertest');
var app = require('../app.js');
var authfbHandlers = require('./authFbHandlers.js');


var token, user, url, headers, response, results;

describe('FB OAuth', function() {
	describe('Facebook Token URL Generator', function() {
		it('Should generate a FB URL with access code', function(done) {
			var accessCode = ''
			console.log(authfbHandlers.fbLoginApiTest, "this is handlers.app");
			done();
		});
	});
});