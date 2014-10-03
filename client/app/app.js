'use strict';

(function(){

  //Global object for storing callback functions
  window._app = {};

  var defaultRouteConfig = function($urlRouterProvider){
    $urlRouterProvider.otherwise('/login');
  };

  var restangularConfig = function(Restangular, $window, $state){

    var jwtRequestInterceptor = function(element, operation, route, url, headers, params, httpConfig){
      var jwt = $window.localStorage.getItem('jwt');
      if (jwt){
        headers['x-access-token'] = jwt;
        console.log(headers['x-access-token'], "THIS IS HEADERS['x-access-token']");
        console.log(headers, "THIS IS HEADERS");
      }
      return {
        headers: headers
      };
    };

    var errorResponseInterceptor = function(response, deferred, responseHandler) {
      var isUnauthorized = response.status === 401;
      var routeToLogin = response.data ? response.data.routeToLogin : false;

      if (isUnauthorized && routeToLogin){
        console.log('Unauthorized, Error Response Interceptor: ', response);
        $state.go('login');
      }
    };

    Restangular.setErrorInterceptor(errorResponseInterceptor);
    Restangular.addFullRequestInterceptor(jwtRequestInterceptor);
  };

  angular
    .module('AYARApp', [
      'ngMaterial',
      'ui.router',
      'restangular'
      ])

    .config(['$urlRouterProvider', defaultRouteConfig])

    .run(['Restangular', '$window', '$state', restangularConfig])

})();

// KEEP CODE IN CASE I WANT TO REFACTOR INTO NON-IIFE

// angular.module('AYARApp', [
//   'ui.router'
//   ])
//  .config(['$urlRouterProvider', function ($urlRouterProvider) {
//     $urlRouterProvider
//       // .when('/code=', '/game')
//       .otherwise('/login');
//   }])