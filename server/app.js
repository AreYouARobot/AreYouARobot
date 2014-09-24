'use strict';

// Primary server file
var express = require('express');
var mongoose = require('mongoose');
var database = require('./config/developmentdb.js');

// Require bluebird so that as soon as req comes in, promisify it.
var app = express();
var port = process.env.PORT || 8085;

// Require middleware (also handles initial API routing)
require('./config/middleware.js')(app, express);

// // Require database connections
// // mongoose.connect(database); // connect to mongo database named 'areyouarobot-dev'
mongoose.connect('mongodb://localhost/areyouarobot-dev');
// // Seed the MongoDB with sample user data

if(database.seedDB) { require('./config/seed'); };

app.listen(port);
console.log('Server running on port %d', port);

exports = module.exports = app;
