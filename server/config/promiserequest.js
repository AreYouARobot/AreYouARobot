'use strict';

var request = require('request');
var promise = require('bluebird');

module.exports.request = promise.promisify(request);