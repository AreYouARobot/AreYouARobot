'use strict';

angular.module('AYARApp')
	.controller('TestingExampleController3', function($scope) {
		$scope.testFunction = function(test) {
			return test;
		};
	});