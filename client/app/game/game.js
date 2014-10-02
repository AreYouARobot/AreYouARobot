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
      	url: '/guesserAskQuestion/:room',
      	templateUrl: '/app/game/game.guesser.askQuestion/game.guesser.askQuestion.html',
      	controller: 'GuesserAskQuestionController'
      })
      // Old View 2
      .state('game.guesserWaitingForResponses', {
        url: '/guesserWaitingForResponses/:room',
        templateUrl: '/app/game/game.guesser.waitingForResponses/game.guesser.waitingForResponses.html',
        controller: 'GuesserWaitingForResponsesController'
      })
      // Old View 3
      .state('game.allChooseAnswer', {
        url: '/allChooseAnswer/:room',
        templateUrl: '/app/game/game.all.chooseAnswer/game.all.chooseAnswer.html',
        controller: 'AllChooseAnswerController'
      })
      // Old View 4
      .state('game.allDisplayResults', {
        url: '/allDisplayResults/:room',
        templateUrl: '/app/game/game.all.displayResults/game.all.displayResults.html',
        controller: 'AllDisplayResultsController',
      })
      // Old View 5
      .state('game.panelGiveAnswer', {
        url: '/panelGiveAnswer/:room',
        // params: ['question'],
        templateUrl: '/app/game/game.panel.giveAnswer/game.panel.giveAnswer.html',
        controller: 'PanelGiveAnswerController'
      })
      // Old View 6
      .state('game.panelWaitingForResponses', {
        url: '/panelWaitingForResponses/:room',
        templateUrl: '/app/game/game.panel.waitingForResponses/game.panel.waitingForResponses.html',
        controller: 'PanelWaitingForResponsesController'
      })
      // New View -- Panel Waiting For Question From Guesser
      .state('game.panelWaitingForQuestion', {
        url: '/panelWaitingForQuestion/:room',
        templateUrl: '/app/game/game.panel.waitingForQuestion/game.panel.waitingForQuestion.html',
        controller: 'PanelWaitingForQuestionController'
      })
      // New View -- Create / Join Game
      .state('game.createOrJoinGame', {
        url: '/allCreateOrJoinGame/:jwt',
        templateUrl: '/app/game/game.all.createOrJoinGame/game.all.createOrJoinGame.html',
        controller: 'AllCreateOrJoinGameController'
      })
      // New View -- Create New Game
      .state('game.createGame', {
        url: '/allCreateGame/:jwt',
        templateUrl: '/app/game/game.all.createOrJoinGame/game.createNewGame/game.createNewGame.html',
        controller: 'AllCreateGameController'
      })
      // New View -- Join Existing Game
      .state('game.joinGame', {
        url: '/allJoinGame/:jwt',
        templateUrl: '/app/game/game.all.createOrJoinGame/game.joinExistingGame/game.joinExistingGame.html',
        controller: 'AllJoinGameController'
      })
      // New View -- Lobby
      .state('game.lobby', {
        url: '/lobby:room',
        templateUrl: '/app/game/game.all.lobby/game.all.lobby.html',
        controller: 'AllLobbyController'
      })
      // New View -- Waiting For Players To Join
      .state('game.waitForStart', {
        url: '/allWaitForStart/:room',
        templateUrl: '/app/game/game.all.waitForStart/game.all.waitForStart.html',
        controller: 'AllWaitForStartController'
      });
  });




// SAVE THIS FOREVER THIS WORKS
// .state('game.gAskQuestion', {
//   url: '/guesser',
//   templateUrl: '/app/game/game.guesser.askQuestion/game.guesser.askQuestion.html',
//   controller: 'GuesserAskQuestionController'
// });
