'use strict';

var mocha = require('mocha');
var assert = require('chai').assert;
var authfbHandlers = require('./authFbHandlers.js');

describe('FBLogin', function() {
	it('fbLogin should be a function', function() {
		assert.typeOf(authfbHandlers.fbLogin, 'function');
	});
})


