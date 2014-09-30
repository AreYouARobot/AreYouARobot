'use strict';

angular.module('AYARApp')
	.controller('AllDisplayResultsController', function($scope, $stateParams) {
		$scope.gameResult = $stateParams.room.gameResult;
	});
