'use strict';

angular.module('AYARApp')
.controller('ProfileController', function ($scope, ProfilePages) {
  $scope.getProfilePage = ProfilePages.getProfilePage;
  $scope.getProfilePage()
    .success(function (user) {
      $scope.user = user;
    });
})
.factory('ProfilePages', function ($http) {
  var getProfilePage = function () {
    return $http({
      method: 'GET',
      url: 'api/user',
    }).success(function (user) {
      return user;
    });
  };

  return {
    getProfilePage: getProfilePage
  };
});
