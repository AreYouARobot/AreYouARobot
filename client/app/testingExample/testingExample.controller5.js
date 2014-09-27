'use strict';

angular.module('AYARApp')
  .controller('TestingExampleController5', function($scope, $state) {
    $scope.goToNextView = function() {
      $state.go('testingExample.view6');
    };
  });