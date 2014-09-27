'use strict';

// Primary server file
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var robot = require('./private/robot/robotInstance');
var markov = require('../testMarkovCode');
var fs = require('fs');

// Require bluebird so that as soon as req comes in, promisify it.
var app = express();

var port = process.env.PORT || 7085;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser());

app.use(express.static(__dirname + '../../client')); // __dirname = server right now. dirname + ../ = AreYouARobot, so dirname + '../client'

app.post('/api/ask', function(req, res) {
	var question = req.body.question;
	var response = robot.robot.chooseResponse(question);
	res.status(200).send(response);
	res.end();
});

var pathName = __dirname;

app.listen(port);
console.log('Server running on port %d', port);

exports = module.exports = app;

exports.readFileData = function (fileName, chats) {
  fs.readFile(fileName, function (err, data) {
    if (err) {
      console.log(err);
    } else {  
    	console.log('data in function is', data);
      //split by sentence into arrays
      var phrases = data.toString();
      //for each paragraph
      chats.push(phrases);
    }
  });
};

exports.array = [];
// exports.readFileData(__dirname + '/austen-emma.txt', exports.array);
// exports.readFileData(__dirname + '/melville-moby_dick.txt', exports.array);
// exports.readFileData(__dirname + '/austen-persuasion.txt', exports.array);
// exports.readFileData(__dirname + '/whitman-leaves.txt', exports.array);
// exports.readFileData(__dirname + '/whitman-leaves.txt', exports.array);
exports.readFileData(__dirname + '/bible-kjv.txt', exports.array);

setTimeout(function() {
  exports.array.forEach(function(value) {
    markov.addSnippets(value);
    markov.addBackSnippets(value);
  });
  console.log(markov.makeBackSentence('abraham') + markov.makeSentence('abraham'));
}, 1000);


// app.post('/api/getSentence', function(req, res) {
//   var data = req.body.context;

// })