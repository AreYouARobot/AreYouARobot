'use strict';

var userController = require('./user.controller.js');

module.exports = function(app) {
	// app === userRouter injected from middleware.js

	app.get('/signedin', userController.checkAuth);

};
