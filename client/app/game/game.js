'use strict';

angular.module('AYARApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('game', {
        url: '/game',
        templateUrl: '/app/game/game.html',
        controller: 'GameController'
      })
      // Old View 1
      .state('game.guesserAskQuestion', {
      	url: '/guesserAskQuestion',
      	templateUrl: '/app/game/game.guesser.askQuestion/game.guesser.askQuestion.html',
      	controller: 'GuesserAskQuestionController'
      })
      // Old View 2
      .state('game.guesserWaitingForResponses', {
        url: '/guesserWaitingForResponses',
        templateUrl: '/app/game/game.guesser.waitingForResponses/game.guesser.waitingForResponses.html',
        controller: 'GuesserWaitingForResponsesController'
      })
      // Old View 3
      .state('game.allChooseAnswer', {
        url: '/allChooseAnswer?responses',
        templateUrl: '/app/game/game.all.chooseAnswer/game.all.chooseAnswer.html',
        controller: 'AllChooseAnswerController'
      })
      // Old View 4
      .state('game.allDisplayResults', {
        url: '/allDisplayResults?result',
        templateUrl: '/app/game/game.all.displayResults/game.all.displayResults.html',
        controller: 'AllDisplayResultsController'
      })
      // Old View 5
      .state('game.panelGiveAnswer', {
        url: '/panelGiveAnswer?question',
        // params: ['question'],
        templateUrl: '/app/game/game.panel.giveAnswer/game.panel.giveAnswer.html',
        controller: 'PanelGiveAnswerController'
      })
      // Old View 6
      .state('game.panelWaitingForResponses', {
        url: '/panelWaitingForResponses',
        templateUrl: '/app/game/game.panel.waitingForResponses/game.panel.waitingForResponses.html',
        controller: 'PanelWaitingForResponsesController'
      })
      // New View
      .state('game.panelWaitingForQuestion', {
        url: '/panelWaitingForQuestion',
        templateUrl: '/app/game/game.panel.waitingForQuestion/game.panel.waitingForQuestion.html',
        controller: 'PanelWaitingForQuestionController'
      });
  });




// SAVE THIS FOREVER THIS WORKS
// .state('game.gAskQuestion', {
//   url: '/guesser',
//   templateUrl: '/app/game/game.guesser.askQuestion/game.guesser.askQuestion.html',
//   controller: 'GuesserAskQuestionController'
// });