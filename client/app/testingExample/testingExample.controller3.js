'use strict';

angular.module('AYARApp')
  .controller('TestingExampleController3', function($scope, $state) {
    $scope.goToNextView = function() {
      $state.go('testingExample.view4');
    };
  });