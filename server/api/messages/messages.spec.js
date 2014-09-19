'use strict';

var chai = require('chai').should();
var request = require('supertest');
var app = require('../../app');


describe('GET /api/messages/', function() {
	it('response should be a JSON object', function() {
		request(app)
			.get('/api/messages')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				res.should.be.instanceof(Object);
				done();
			});
	});

	it('response should contain a JSON array', function() {
		request(app)
			.get('/api/messages')
			// Modify my other code to handle this 
			.expect(200)
			.expect('Content-Type', 'application/json')
			.end(function(err, res) {
				if (err) return done(err);
				res.body.should.be.instanceof(Array);
				done();
			});
	});

	it('the response array should contain at least one object', function() {
		request(app)
			.get('/api/messages')
			.expect(200)
			.expect('Content-Type', 'application/json')
			.end(function(err, res) {
				if (err) return done(err);
				// Seed the back end (very generic), with an array of objects with the properties listed below
				res.body[0].should.be.instanceof(Object);
				done();
			});
	});


	it('response should contain JSON object with a username', function() {
		request(app)
			.get('/api/messages')
			.expect(200)
			.expect('Content-Type', 'application/json')
			.end(function(err, res) {
				if (err) return done(err);
				should.exist(res.body.username);
				done();
			});
	});

	it('response should contain JSON object with a message', function() {
		request(app)
			.get('/api/messages')
			.expect(200)
			.expect('Content-Type', 'application/json')
			.end(function(err, res) {
				if (err) return done(err);
				should.exist(res.body.message);
				done();
			});
	});

	it('response should contain JSON object with createddate', function() {
		request(app)
			.get('/api/messages')
			.expect(200)
			.expect('Content-Type', 'application/json')
			.end(function(err, res) {
				if (err) return done(err);
				should.exist(res.body.createddate);
				done();
			});
	});

	it('response should contain JSON object with an id', function() {
		request(app)
			.get('/api/messages')
			.expect(200)
			.expect('Content-Type', 'application/json')
			.end(function(err, res) {
				if (err) return done(err);
				should.exist(res.body.id);
				done();
			});
	});

});

describe('POST /api/messages/', function() {
	it('posts should contain blahblahblah', function() {
		request(app)
			// Does supertest have a .post method? How come the yokel tests only show the .get method	
			.post('/api/messages')
			.expect(200)
			// Post requests are sending data to the server. Is it also in json format?
			// Initial thoughts is that it should be.
			.expect('Content-Type', 'application/json')
			// If we do a post request. what's the best way to test this?
				// Do a post and then a get to see if res contains the message posted?
			.end(function(err, res) {
				if (err) return done(err);
				should.exist(res.body);
				done;
			});
	});
});

// 	it('response should contain', function() {
// 		request(app)
// 			.post('/api/messages')
// 			.expect(200)
// 			.expect('Content-Type', 'application/json')
// 			.end(function(err, res) {
// 				if (err) return done(err);

// 				done();
// 			});
// 	});

// 	it('response should contain ', function() {
// 		request(app)
// 			.post('/api/messages')
// 			.expect(200)
// 			.expect('Content-Type', 'application/json')
// 			.end(function(err, res) {
// 				if (err) return done(err);

// 				done();
// 			});
// 	});

// 	it('response should contain', function() {
// 		request(app)
// 			.post('/api/messages')
// 			.expect(200)
// 			.expect('Content-Type', 'application/json')
// 			.end(function(err, res) {
// 				if (err) return done(err);

// 				done();
// 			});
// 	});

// 	it('response should contain', function() {
// 		request(app)
// 			.post('/api')
// 	})

// })