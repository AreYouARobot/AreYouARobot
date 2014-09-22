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

  it('should fetch profile data', function () {
    (typeof scope.getProfilePage).should.equal('function');
  });

});
