'use strict';

angular.module('AYARApp', [
	 'ui.router'
	 ])
	.config(function ($urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/');
    });

//some config and dependencies will go here
//this comment is to make the newline register

