'use strict';

var fs = require('fs');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var jwtCheck = require('../auth/authJWT.js').jwtCheck;
// var helpers = require('./helpers.js');

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
	var authHandling = express.Router();
	// var gameHandling = express.Router();

	app.use('/api/user', jwtCheck, userRouter); // User router for all user requests
	require('../api/user/user.router.js')(userRouter);

	app.use('/auth', authHandling);
	require('../auth/authRouting.js')(authHandling);
	
	// app.use('/game', jwtCheck, gameHandling);
	// require('../game/gamerouting.js')(gameHandling);


};
