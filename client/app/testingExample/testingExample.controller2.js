'use strict';

angular.module('AYARApp')
	.controller('TestingExampleController2', function($scope) {
		$scope.testFunction = function(test) {
			return test;
		};
	});