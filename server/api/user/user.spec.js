'use strict';

var should = require('chai').should();
var request = require('supertest');
var app = require('../../app');

// Need to mock the user? JWT?

describe('GET api/user/', function() {
	it('response should be a JSON object', function(done) {
		request(app)
		.get('/api/user')
		.set('x-access-token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU0MmVmN2VjMzUyZjNlNmMzMmZjNzUzNCIsImlhdCI6MTQxMzIyNzcwOCwiZXhwIjoxNDEzMjM0OTA4fQ.G1lQ0YJYMSAdB8RgRWkYVLPuL2WQvhjV790Ecc6RZvc')
		.expect(200)
		.end(function(err, res) {
			if (err) return done(err);
			// console.log(res.userObjId, 'userObjId?');
			// console.log(res, 'this is res');
			// console.log(res.body, 'this is body of res');
			res.should.be.instanceof(Object);
			done();
		});
	});

});
