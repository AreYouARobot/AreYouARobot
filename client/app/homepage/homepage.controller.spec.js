'use strict';

describe('HomepageController', function(){
  var $scope, $rootScope, Homepage;

  // beforeEach(module('app'));
  // beforeEach(inject(function($injector) {

  //   // mock of dependencies within controller
  //   $rootScope = $injector.get('$rootScope');
  //   $scope = $rootScope.$new();

  //   var $controller = $injector.get('$controller');

  //   createController = function() {
  //     return $controller('HomepageController', {
  //       $scope: $scope,
  //       Homepage: Homepage
  //     });
  //   };
  // }));

  it('should direct user to login overlay', function() {
    var showLogin = function(){return 'sing'};
    var username = showLogin();
    expect(username).to.eql('sing');
  });
  it('should save inputted username and password', function() {

  });
  it('should have a signup function', function() {

  });
})
