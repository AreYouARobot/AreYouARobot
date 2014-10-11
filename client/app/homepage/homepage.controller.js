'use strict';

angular.module('AYARApp')
  .controller('HomepageController', function ($scope, Auth) {
    $scope.user = {};

    $scope.login = false;
    $scope.showLogin = function() {
      $scope.login = !$scope.login;
    };
    $scope.signup = function(err) {
      if( !$scope.user.username || !$scope.user.password ){
        console.log('Please enter in a valid username and password!');
        throw(err);
      } else {
        Auth.signin($scope.user);
        $scope.clearText();
      }
    };
    $scope.clearText = function() {
      $scope.user.username = '';
      $scope.user.password = '';
    };

    $scope.team = [{
          face: 'https://media.licdn.com/mpr/mpr/shrink_200_200/p/5/005/06e/3dc/3d7a83e.jpg',
          what: 'Stef Contreras',
          who: 'Product Visionary, Robot Master, Back-End Engineer',
          // when: '3:08PM',
          notes: "Stef has always wanted a robot friend to keep her company, so she jumped at the chance to make one. Stef built out the Markov chain module, the Wiki parser, and the logic to build sentences."
        }, {
          face: 'https://media.licdn.com/mpr/mpr/shrink_200_200/p/6/005/08d/12a/1e5df03.jpg',
          what: 'Jonathan Warrick',
          who: 'Project Manager, Robot Master, Server / Client Interaction and Sockets',
          // when: '3:08PM',
          notes: "Jonathan's passion for serving as the grammar police in his circle of friends made him a natural fit for building out the underlying chat bot logic that interprets user input and generates sentences in return. Jonathan also developed the Socket.IO functionality that allows users to interact in real-time while playing the game."
        }, {
          face: 'https://media.licdn.com/mpr/mpr/shrink_200_200/p/8/005/08e/0d3/2e1e8a3.jpg',
          what: 'Christopher Singhavong',
          who: 'UI / UX Guru, Front-End / Angular Material Designer',
          // when: '3:08PM',
          notes: "Chris' passion for sleek design in basketball shoes is echoed through his prowess for design. Chris led the wire-framing discussions for the entire application and brought the team's vision to life with his UI / UX skills. When he's not making front-end magic, you can usually find him getting buckets on the basketball courts."
        }, {
          face: 'https://media.licdn.com/media/p/3/000/1d6/13a/3e2ee25.jpg',
          what: 'Collin Wu',
          who: 'Game Master, Facebook Authentication Expert, Back-End Engineer',
          // when: '3:08PM',
          notes: "Collin gets really excited about driving user engagement and the concept of gamification."
        }];
  });
