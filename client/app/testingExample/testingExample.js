'use strict';

angular.module('AYARApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('testingExample', {
        url: '/testingExample',
        templateUrl: '/app/testingExample/testingExample.html',
        controller: 'TestingExampleController'
      });
  });
