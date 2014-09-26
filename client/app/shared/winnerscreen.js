'use strict';

angular.module('AYARApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('winnerscreen', {
        url: '/winnerscreen',
        templateUrl: '/app/shared/winnerscreen.html'
      });
  });
