'use strict';

angular.module('AYARApp')
  .controller('HomepageController', function($scope){
    // input value for username and password
    $scope.user = {};

    // toggles account input fields
    $scope.login = false;
    $scope.showLogin = function(){
      $scope.login = !$scope.login;
    };
    $scope.signup = function(err){
      if( !$scope.user.username || !$scope.user.password ){
        console.log('Please enter in a valid username and password!');
        throw(err);
      } else {
        console.log($scope.user);
      }
    };
  });
