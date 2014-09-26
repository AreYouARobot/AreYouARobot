'use strict'

describe('Controller: guesserController', function() {

	// load the controller's module
	beforeEach(module('AYARApp'));

	var guesserController, scope;

	beforeEach(inject(function($controller, $rootScope) {
		scope = $rootScope.$new();
		guesserController = $controller('guesserController', {
			$scope: scope
		});
	}));

	it('should have a sendQuestion function', function() {
		expect(typeof(scope.sendQuestion)).toEqual("function");
	});

	it('should have a sendAnswer function', function() {
		expect(typeof(scope.sendAnswer)).toEqual("function");
	});


})