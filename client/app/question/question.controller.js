'use strict';

angular.module('AYARApp')
  .controller('QuestionController', function($scope, Messages, Robot) {

    $scope.clearText = function() {
      console.log($scope.question);
      $scope.question = '';
    }
  });
