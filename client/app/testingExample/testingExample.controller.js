'use strict';

angular.module('AYARApp')
	.controller('TestingExampleController', function($scope) {
		$scope.testFunction = function(test) {
			return test;
		};
	});
