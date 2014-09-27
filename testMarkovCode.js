'use strict';

exports = module.exports;
// MARKOV
// expected input:
// [[sentence], [sentence], [sentence]] => sentence: [word1, word2, word3, word4]
// each word is structured as:
// word1: {count: x, word2: count}

var markovChain = {};
var backwardChain = {};

// var sentenceArray = testSentence.replace(/\./g, ' EOSMARKER BOSMARKER').split(' ');

// for each sentence, take current indexed word 
exports.addSnippets = function(sentence) {
	sentence = sentence.toLowerCase().replace(/\n/g, ' ').replace(/\./g, ' EOSMARKER BOSMARKER').split(' ');
  for (var i = 0; i < sentence.length - 1; i++) {
    if (!markovChain[sentence[i]]) {
      markovChain[sentence[i]] = {};
      markovChain[sentence[i]].totNumOfWords = 0;
    }
    markovChain[sentence[i]].totNumOfWords++;
    if (!markovChain[sentence[i]][sentence[i + 1]]) {
      markovChain[sentence[i]][sentence[i + 1]] = 0;
    }
    markovChain[sentence[i]][sentence[i + 1]]++;
  }
};

// for each sentence, take current indexed word 
exports.addBackSnippets = function(sentence) {
	sentence = sentence.toLowerCase().replace(/\n/g, ' ').replace(/\./g, ' EOSMARKER BOSMARKER').split(' ');
  for (var i = sentence.length - 1; i > 0; i--) {
    if (!backwardChain[sentence[i]]) {
      backwardChain[sentence[i]] = {};
      backwardChain[sentence[i]].totNumOfWords = 0;
    }
    backwardChain[sentence[i]].totNumOfWords++;
    if (!backwardChain[sentence[i]][sentence[i - 1]]) {
      backwardChain[sentence[i]][sentence[i - 1]] = 0;
    }
    backwardChain[sentence[i]][sentence[i - 1]]++;
  }
};


exports.makeBackSentence = function (startingWord) {
  //add the last word unless it's EOSMARKER
  var sentence = '';
  //set current word
  var currentWord = startingWord;
  var seed = 0;
  var cumulativeCount = 0;
  //while we haven't selected the EOSMARKER
  while (currentWord !== 'BOSMARKER') {
    seed = Math.random() * backwardChain[currentWord].totNumOfWords;
    cumulativeCount = 0;
    for (var key in backwardChain[currentWord]) {
      if (key !== 'totNumOfWords') {
        if (cumulativeCount < seed && seed <= cumulativeCount + backwardChain[currentWord][key]) {
          if(key !== 'BOSMARKER'){
            sentence = key + ' ' + sentence;
          }
          currentWord = key;
          break;
        } else {
          cumulativeCount += backwardChain[currentWord][key];
        }
      }
    }
  }
  return sentence;
};

exports.makeSentence = function (startingWord) {
  //add the first word unless it's BOSMARKER
  var sentence = '';
  if (startingWord !== 'BOSMARKER') {
    sentence += startingWord;
  }
  //set current word
  var currentWord = startingWord;
  var seed = 0;
  var cumulativeCount = 0;
  //while we haven't selected the EOSMARKER
  while (currentWord !== 'EOSMARKER') {
    seed = Math.random() * markovChain[currentWord].totNumOfWords;
    cumulativeCount = 0;
    for (var key in markovChain[currentWord]) {
      if (key !== 'totNumOfWords') {
        if (cumulativeCount < seed && seed <= cumulativeCount + markovChain[currentWord][key]) {
          if(key !== 'EOSMARKER'){
            sentence += ' ' + key;
          }
          currentWord = key;
          break;
        } else {
          cumulativeCount += markovChain[currentWord][key];
        }
      }
    }
  }
  return sentence;
};