'use strict';

// Primary server file
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var robot = require('./private/robot/robotInstance');

// Require bluebird so that as soon as req comes in, promisify it.
var app = express();

var port = process.env.PORT || 7085;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser());

app.use(express.static(__dirname + '../../client')); // __dirname = server right now. dirname + ../ = AreYouARobot, so dirname + '../client'

// app.get('/api/messages', function(req, res) {
// 	// Use some utility function
// 	res.status(200).send(storage);
// 	res.end();
// });

// app.post('/api/messages', function(req, res) {
// 	// Use some utility function
// 	var message = req.body;
// 	storage['data'].push(message);
// 	res.status(202).send();
// });

// app.get('/api/user', function(req, res) {
// 	var userInfo = req.body;
// 	// For quick turnaround, we're just returning a hard-coded user example
// 	res.status(200).send(user1);
// 	res.end();
// })

// app.post('/api/user', function(req, res) {
// 	var userData = req.body;
// 	// Do soemthing with the data such as store it in a variable or handle in db
// 	res.status(202).send();
// })

app.post('/api/ask', function(req, res) {
	console.log(req.body);
	var question = req.body.question;
	var response = robot.robot.chooseResponse(question);
	console.log(response);
	res.status(200).send(response);
	res.end();
});

app.listen(port);
console.log('Server running on port %d', port);

exports = module.exports = app;
