'use strict';

var should = require('chai').should();
var request = require('supertest');
var app = require('../app.js');
var mechanics = require('./mechanics.js');

describe('Game Mechanics Functions', function() {
	it('Module should contain three properties', function(done) {
		var countOfMechanicsProps = Object.keys(mechanics).length;
		countOfMechanicsProps.should.equal(3);
		done();
	});

	it('decodeJWT should be a function', function(done) {
		var typeOfDecodeJWT = mechanics.decodeJWT;
		typeOfDecodeJWT.should.be.a('function');
		done();
	});

	it('pickWinnerAndScoring should be a function', function(done) {
		var typeOfPickWinnerAndScoring = mechanics.pickWinnerAndScoring;
		typeOfPickWinnerAndScoring.should.be.a('function');
		done();
	});

	it('updateUserScoresInDB', function(done) {
		var typeOfUpdateUserScoresInDB = mechanics.updateUserScoresInDB;
		typeOfUpdateUserScoresInDB.should.be.a('function');
		done();
	});

});
