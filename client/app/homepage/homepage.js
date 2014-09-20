'use strict';

angular.module('AYARApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('homepage', {
        url: '/',
        templateUrl: 'app/homepage/homepage.html',
        controller: 'HomepageController'
      });
  });
