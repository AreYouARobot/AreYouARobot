'use strict';

var mongoose = require('mongoose');

if (!process.env.isProduction) {
	var devDbConnect = require('./devConstants.js').dbConnectionInfo;
}

// connectionString = process.env.CUSTOMCONNSTR_MONGOLAB_URI || devDbConnect.uri

var connectionString = process.env.CUSTOMCONNSTR_MONGOLAB_URI || devDbConnect.uri;

mongoose.connect(connectionString);
