'use strict';

angular.module('AYARApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('question', {
        url: '/question',
        templateUrl: '/app/question/question.html',
        controller: 'QuestionController'
      });
  });
