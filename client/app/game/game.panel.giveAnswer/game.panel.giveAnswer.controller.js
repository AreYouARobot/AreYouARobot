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
      face: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTOOOI6lAMyoWVamiRU6AmP8jlJZtycx4w2oARZOZOcRHYRYTai',
      who: '- Optimus Prime',
    };
  });
