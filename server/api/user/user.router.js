'use strict';

var userController = require('./user.controller.js');
var express = require('express');

module.exports = function(app) {
	// app === userRouter injected from middleware.js

	app.get('/', userController.sendUserProfile);


	app.route('/*', function(req, res){
	  res.status(404).end();
	});	

};
