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

  // it('should have a testFunction function', function () {
  //   (typeof scope.testFunction).should.equal('function');
  // });

  // it('testFunction should return test value', function () {
  //   var test = 123;
  //   (scope.testFunction(test)).should.equal(123);
  // });

  // it('testFunction should not return wrong test value', function () {
  //   var test = 123;
  //   (scope.testFunction(test)).should.not.equal(12332);
  // });
});
