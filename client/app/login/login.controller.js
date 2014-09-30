 'use strict'

angular.module('AYARApp')
	.controller('LoginController', ['$scope', 'fbAuth', '$location', function($scope, fbAuth, $location) {
		console.log("INSIDE LOGINCONTROLLER");
		
		// var location = $location.absUrl();
		// var accessCodeToTrim = location.split('code=')[1];
		// if (accessCodeToTrim) {
		// 	var accessCode = accessCodeToTrim.substring(0, accessCodeToTrim.indexOf('#'));		
		// }
		// console.log(location, "this is location");
		// console.log(accessCodeToTrim, "this is accessCodeToTrim");
		// console.log(accessCode, "this is accessCode");

		// $scope.parseURL = function(location) {
		// 	var code = codeUrl.split('code=')[1];
		// 	console.log("THIS IS CODE: ", code);
		// }

		$scope.sendtoFB = function() {
			fbAuth.login()
				.then(fbAuth.sendAuthCode);
		}


	}])

 
// REFACTOR INTO STANDARD NON-IIFE PATTERN

// COMMENT OUT BELOW CODE

// 'use strict';

// (function(){

//   var LoginController = function(fbAuth){
//     this.signup = function(){
//       fbAuth.login()
//       .then(fbAuth.sendAuthCode);
//     };
//   };

//   angular
//     .module('app.login.controllers', [])
//     .controller('LoginController', ['fbAuth', LoginController]);
// })();