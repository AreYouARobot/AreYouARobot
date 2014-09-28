'use strict';

angular.module('AYARApp')
	.controller('GameController', function($scope) {
		$scope.testFunction = function(test) {
			return test;
		};
	});
