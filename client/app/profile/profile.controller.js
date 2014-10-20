'use strict';

angular.module('AYARApp')
// .controller('ProfileController', function ($scope, userProfile) {
//   // $scope.user = userProfile[0];
// })

// getProfilePage just obtains the user profile from the database/server.
.service('ProfilePages', ['Restangular', function(Restangular) {
  this.getProfilePage = function() {
    return Restangular.all('api/user')
    .getList();
  };

  // Returns an achievements hashmap that points to the location of the achievement images
	this.achievements = {
  		'5botguesses': 'http://i.imgur.com/PRjw9ob.gif',
  		'100points': 'http://i.imgur.com/LDTNdAp.gif',
  		'5wins': 'http://i.imgur.com/h7nTe7l.gif',
  		'10gamesplayed': 'http://i.imgur.com/xGanGlp.gif'
  };
}]);
