'use strict';

angular.module('AYARApp', [
	 'ui.router'
	 ])
	.config(function ($urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/');
    });

//some config and dependencies will go here
