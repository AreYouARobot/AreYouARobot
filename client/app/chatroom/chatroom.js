'use strict';

angular.module('AYARApp')
  .config(function ($stateProvider) {
  	console.log('test chatroom start');
    $stateProvider
      .state('chatroom', {
        url: "/chatroom",
        templateUrl: 'app/chatroom/chatroom.html',
        controller: 'ChatroomController'
      });
  });