'use strict';

angular.module('AYARApp')
.controller('ProfileController', function ($scope, ProfilePages) {
  $scope.user = ProfilePages.getProfilePage();
})
.factory('ProfilePages', function ($http) {
  var getProfilePage = function ($http) {
    return {
      name: 'Stef',
      pic: 'http://38.media.tumblr.com/bc7ad1e6a8d4e78063466815ce94043c/tumblr_nb0vfnDO731tnlgoco1_500.gif',
      points: 30,
      achievements: 20
    };

    // return $http({
    //   method: 'GET',
    //   url: 'api/user',
    // }).success(function(user){
    //   return user;
    // })
  };

  return {
    getProfilePage: getProfilePage
  };
});
