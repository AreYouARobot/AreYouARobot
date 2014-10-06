'use strict';

var mongoose = require('mongoose');

if (!process.env.isProduction) {
	var devDbConnect = require('./developmentdb.js').mongo;
}

// connectionString = process.env.CUSTOMCONNSTR_MONGOLAB_URI || devDbConnect.uri

var connectionString = process.env.CUSTOMCONNSTR_MONGOLAB_URI || devDbConnect.uri;

mongoose.connect(connectionString);
