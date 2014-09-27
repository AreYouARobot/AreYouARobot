'use strict';

angular.module('AYARApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('testingExample', {
        url: '/testingExample',
        templateUrl: '/app/testingExample/testingExample.html',
        controller: 'TestingExampleController'
      })
      .state('testingExample.view1', {
      	url: '/view1',
      	templateUrl: '/app/testingExample/testingExample.view1.html',
      	controller: 'TestingExampleController1'
      })
      .state('testingExample.view2', {
      	url: '/view2',
      	templateUrl: '/app/testingExample/testingExample.view2.html',
      	controller: 'TestingExampleController2'
      })
      .state('testingExample.view3', {
      	url: '/view3',
      	templateUrl: '/app/testingExample/testingExample.view3.html',
      	controller: 'TestingExampleController3'
      })
      .state('testingExample.view4', {
      	url: '/view4',
      	templateUrl: '/app/testingExample/testingExample.view4.html',
      	controller: 'TestingExampleController4'
      })
      .state('testingExample.view5', {
      	url: '/view5',
      	templateUrl: '/app/testingExample/testingExample.view5.html',
      	controller: 'TestingExampleController5'
      })
      .state('testingExample.view6', {
      	url: '/view6',
      	templateUrl: '/app/testingExample/testingExample.view6.html',
      	controller: 'TestingExampleController6'
      });
  });
