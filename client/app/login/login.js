'use strict'

angular.module('AYARApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/loginTemplate.html',
        controller: 'LoginController'
      });
  })
  