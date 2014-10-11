'use strict';

var request = require('request');
var promise = require('bluebird');

// Promisifying the request module used in authFbHandlers.js
module.exports.request = promise.promisify(request);