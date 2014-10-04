'use strict';

var should = require('chai').should();
var request = require('supertest');
var app = require('../../app');
var assert = require('chai').assert;
var authfbHandlers = require('./authFbHandlers.js');

// Need to mock up the request to auth/fb
// 

var token, user, url, headers, response, results;

describe('FB OAuth', function() {
	// it('should authenticate', function() {
	// 	beforeEach(function(done) {

	// 		request(app)
	// 			.post('/')
	// 			.end(function(err, res){
 //        	if (err) return done(err);
 //        	done()
 //      	});

	// 	})
	// })
})