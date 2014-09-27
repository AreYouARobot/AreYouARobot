'use strict';

angular.module('AYARApp')
	.controller('TestingExampleController1', function($scope, $state) {
		$scope.goToNextView = function() {
			$state.go('testingExample.view2');
		};
	});
	