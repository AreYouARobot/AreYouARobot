'use strict';

angular.module('AYARApp')
  .controller('PanelGiveAnswerController', function($scope, $stateParams) {
  	console.log('am I in here');
  	console.log('$stateParams is', $stateParams);
    $scope.question = $stateParams.question;
  });
