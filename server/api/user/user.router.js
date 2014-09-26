'use strict'

var userController = require('./user.controller.js');

module.exports = function(app) {
	// app === userRouter injected from middleware.js

	app.get('/signedin', userController.checkAuth);
	app.post('/signup', userController.signup);
	app.post('/signin', userController.signin);

};
