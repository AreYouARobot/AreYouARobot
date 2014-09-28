'use strict'

var fs = require('fs');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var helpers = require('./helpers.js');
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

	// Routing
	var userRouter = express.Router();
	var messagesRouter = express.Router();

	app.use('/api/user', userRouter); // User router for all user requests
	app.use(helpers.errorLogger);
	app.use(helpers.errorHandler); 
	// require('../api/user/user.router.js')(userRouter);

};