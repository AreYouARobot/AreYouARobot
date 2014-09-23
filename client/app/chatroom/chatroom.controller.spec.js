'use strict';

describe('Controller: ChatroomController', function () {

  // load the controller's module
  beforeEach(module('AYARApp'));

  var ChatroomController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChatroomController = $controller('ChatroomController', {
      $scope: scope
    });
  }));

  it('should have a sendMessage function', function () {
    (typeof scope.sendMessage).should.equal('function');
  });

  it('should have a guessRobotOrUser function', function () {
    (typeof scope.guessRobotOrUser).should.equal('function');
  });

  it('should have a messages variable that is an array', function() {
  	(Array.isArray(scope.messages)).should.equal(true);
  });
});
