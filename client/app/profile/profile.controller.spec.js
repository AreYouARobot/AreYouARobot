'use strict';

describe('Controller: ProfileController', function () {

  // load the controller's module
  beforeEach(module('AYARApp'));

  var ProfileController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfileController = $controller('ProfileController', {
      $scope: scope
    });
  }));

  it('should have a user object', function () {
    (typeof scope.user).should.equal('object');
  });

  it('user should have a name', function () {
    (typeof scope.user.name).should.equal('string');
  });

  it('user should have a picture', function () {
    (typeof scope.user.pic).should.equal('string');
  });

  it('user should have points', function () {
    (typeof scope.user.points).should.equal('number');
  });

  it('user should have achievements', function () {
    (scope.user.achievements).should.be.instanceof(Array);  
  });
});
