'use strict'

// Why is login.js wrapped in an IIFE (Immediately-invoked function expression)
	// Design pattern - the IIFE Angular (minimal syntax)

// Convert this to regular Angular.


// Inject other dependencies up here as well such as:
	// loginAuthValues.js, loginFacebookAuthService.js, loginController.js

// Throw the config block into app.js

angular.module('AYARApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/loginTemplate.html',
        controller: 'LoginController'
      });
  })

// angular
// 	.module('AYARApp')
// 	.config(function ($stateProvider) {
// 		$stateProvider
// 			.state('login', {
// 				url: '/login',
// 				templateUrl: 'app/login/loginTemplate.html',
// 				controller: 'LoginController as LoginController'
// 			});
// 	});

// Comment out the below code

// (function() {
// 	var loginRoutesConfig = function($stateProvider) {
// 		$stateProvider
// 			.state('login', {
// 				url: '/login',
// 				templateUrl: 'login/loginTemplate.html',
// 				controller: 'LoginController as LoginController'
// 			});
// 	};

// 	angular
// 		.module('app.login', [
// 			'app.login.authValues',
// 			'app.login.facebookAuthService',
// 			'app.login.controllers'])
// 		.config(['$stateProvider', loginRoutesConfig]);

// 	require('./loginAuthValues.js');
// 	require('./loginFacebookAuthService.js');
// 	require('./loginControllers.js');

// })();