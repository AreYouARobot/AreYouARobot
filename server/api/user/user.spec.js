'use strict'

var should = require('chai').should();
var request = require('supertest');
var app = require('../../app');

describe('GET api/user/', function() {
	// it('response should be a JSON object', function(done) {
	// 	request(app)
	// 	.get('/api/user')
	// 	.expect('Content-Type', /json/)
	// 	.expect(200)
	// 	.end(function(err, res) {
	// 		if (err) return done(err);
	// 		res.should.be.instanceof(Object);
	// 		done();
	// 	});
	// });

	// it('response object should contain a username property', function(done) {
	// 	request(app)
	// 	.get('/api/user')
	// 	.expect(200)
	// 	.end(function(err, res) {
	// 		if (err) return done(err);
	// 		should.exist(res.body.username);
	// 		done();
	// 	});
	// });

	// it('response object should contain a pic property', function(done) {
	// 	request(app)
	// 	.get('/api/user')
	// 	.expect(200)
	// 	.end(function(err, res) {
	// 		if (err) return done(err);
	// 		should.exist(res.body.pic);
	// 		done();
	// 	});
	// });

	// it('response object should contain a points property', function(done) {
	// 	request(app)
	// 	.get('/api/user')
	// 	.expect(200)
	// 	.end(function(err, res) {
	// 		if (err) return done(err);
	// 		should.exist(res.body.points);
	// 		done();
	// 	});
	// });

	// it('response object should contain an achievements property', function(done) {
	// 	request(app)
	// 	.get('/api/user')
	// 	.expect(200)
	// 	.end(function(err, res) {
	// 		if (err) return done(err);
	// 		should.exist(res.body.achievements);
	// 		done();
	// 	});
	// });

})