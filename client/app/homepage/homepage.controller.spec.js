'use strict';

describe('Controller: HomepageController', function () {

  // load the controller's module
  beforeEach(module('AYARApp'));

  var HomepageController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HomepageController = $controller('HomepageController', {
      $scope: scope
    });
  }));

  it('should direct user to login overlay', function() {
    (typeof scope.showLogin).should.equal('function');
  });
  it('should save inputted username and password', function() {
    (scope.user).should.be.a('object');
  });
  it('should have a signup function', function() {
    (typeof scope.signup).should.equal('function');
  });
});
