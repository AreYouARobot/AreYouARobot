'use strict';

angular.module('AYARApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('chatroom', {
        url: '/chatroom',
        templateUrl: 'app/chatroom/chatroom.html',
        controller: 'ChatroomController'
      });
  });