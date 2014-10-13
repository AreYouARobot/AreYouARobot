 'use strict';

angular.module('AYARApp')
	.controller('LoginController', ['$scope', 'fbAuth', '$location', function($scope, fbAuth) {

		$scope.sendtoFB = function() {
			fbAuth.login()
				.then(fbAuth.sendAuthCode);
		};

	}]);
