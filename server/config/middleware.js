'use strict'

var fs = require('fs');
var morgan = require('morgan');
var bodyParser = require('body-parser');
// var jwtCheck = require()

module.exports = function(app, express) {

	// Setup morgan to log request details
	// Create a write stream (in append mode)
	var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
	app.use(morgan('combined', {stream: accessLogStream}));

	// Initialize bodyParser middleware to read request body
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser());

	// Set static file directory
	app.use(express.static(__dirname + '../../../client'));

};