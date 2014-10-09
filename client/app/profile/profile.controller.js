'use strict';

angular.module('AYARApp')
.controller('ProfileController', function ($scope, userProfile) {
  // $scope.user = userProfile[0];
})

.service('ProfilePages', ['Restangular', function(Restangular) {
  this.getProfilePage = function() {
    return Restangular.all('api/user')
    .getList();
  };
}]);
