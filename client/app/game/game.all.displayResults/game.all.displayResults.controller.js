'use strict';

angular.module('AYARApp')
	.controller('AllDisplayResultsController', function($scope, $stateParams) {
		console.log('am i even in the end?', $stateParams);
		$scope.result = $stateParams.result;
	});
