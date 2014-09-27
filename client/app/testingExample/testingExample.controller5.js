'use strict';

angular.module('AYARApp')
	.controller('TestingExampleController5', function($scope) {
		$scope.testFunction = function(test) {
			return test;
		};
	});