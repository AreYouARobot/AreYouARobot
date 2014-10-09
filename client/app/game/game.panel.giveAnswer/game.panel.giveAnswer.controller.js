'use strict';

angular.module('AYARApp')
  .controller('PanelGiveAnswerController', function($scope, $state, $timeout, $stateParams, gameStorage) {
// set players equal to players associated with that room
    $scope.game = $stateParams.room;
    $scope.panelSendAnswer = function() {
      gameStorage.panelSendAnswer($scope.answer, $scope.game.room);
    	$state.go('game.panelWaitingForResponses', {room: $scope.game.room});
    };

    $scope.item = {
      face: 'http://media-cache-ec0.pinimg.com/236x/c7/97/d7/c797d77e149595e06aea1d04be2d312a.jpg',
      who: "- Robot",
    };
  });
