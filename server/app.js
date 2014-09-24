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


// var user1 = {
//       username: 'Fluffy',
//       pic: 'http://38.media.tumblr.com/bc7ad1e6a8d4e78063466815ce94043c/tumblr_nb0vfnDO731tnlgoco1_500.gif',
//       points: 30,
//       achievements: ['awesome',
//                       'kickass'
//                     ]
//     };

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

app.listen(port);
console.log('Server running on port %d', port);

exports = module.exports = app;
