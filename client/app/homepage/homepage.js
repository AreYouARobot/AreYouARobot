'use strict';

angular.module('AYARApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('homepage', {
        url: '/',
        templateUrl: 'app/homepage/homepage.html',
        controller: 'HomepageController'
      });
  })

  .factory('Auth', function ($http) {
    var signin = function (user) {
      return $http({
        method: 'POST',
        url: '/api/user',
        data: user
      });
    };

    return {
      signin: signin
    };
  });
