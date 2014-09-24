'use strict';

describe('Controller: ChatroomController', function () {

  // load the controller's module
  beforeEach(module('AYARApp'));

  var ChatroomController, scope, factory;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    ChatroomController = $controller('ChatroomController', {
      $scope: scope
    });
    factory = $injector.get('Robot');
  }));
  it('should have a sendMessage function', function () {
    (typeof scope.sendMessage).should.equal('function');
  });

  it('should have a guessRobotOrUser function', function () {
    (typeof scope.guessRobotOrUser).should.equal('function');
  });
  it('should have a robot', function () {
    (factory.robot).should.be.an('object');
    (factory.robot.goodVotes).should.equal(0);
    (factory.robot.badVotes).should.equal(0);
    (factory.robot.isBot).should.equal(true);
    (factory.robot.responses).should.be.an('array');
    (typeof factory.robot.chooseResponse).should.equal('function');
    (typeof factory.robot.sendMessage).should.equal('function');
  });

  it('should have a messages variable that is an array', function() {
  	(Array.isArray(scope.messages)).should.equal(true);
  });
  it('should clear input field after submit', function() {
    scope.clearText();
    (scope.messageText).should.equal('');
  });
});
