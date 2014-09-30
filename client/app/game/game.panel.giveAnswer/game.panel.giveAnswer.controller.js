'use strict';

angular.module('AYARApp')
  .controller('PanelGiveAnswerController', function($scope, $state, $timeout, $stateParams, gameStorage) {
// set players equal to players associated with that room
    $scope.game = $stateParams.room;
    $scope.panelSendAnswer = function() {
      gameStorage.panelSendAnswer($scope.answer, $scope.game.room);
    	$state.go('game.panelWaitingForResponses', {room: $scope.game.room});
    };
  });
