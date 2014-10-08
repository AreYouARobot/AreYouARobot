'use strict';

angular.module('AYARApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile', {
        url: '/profile',
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileController',
        resolve: {
          userProfile: function(ProfilePages) {
            return ProfilePages.getProfilePage();
          }
        }
      });
  });
