'use strict'

var messagesController = require('./messages.controller.js');

module.exports = function(app) {
	// app === messagesRouter injected from middleware.js
	app.route('/')
		.get(messagesController.latestMsgs)
		.post(messagesController.postMsg);

	console.log("we're here in messages.router");
};