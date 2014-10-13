'use strict';

var should = require('chai').should();
var request = require('supertest');
var app = require('../../app');

// Need to mock the user? JWT?

describe('GET api/user/', function() {
	it('response should be a JSON object', function(done) {
		request(app)
		.post('/api/user')
		.set('x-access-token', '')

		.expect('Content-Type', /json/)
		.expect(200)
		.end(function(err, res) {
			if (err) return done(err);
			res.should.be.instanceof(Object);
			done();
		});
	});


});
