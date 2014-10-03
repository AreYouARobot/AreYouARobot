'use strict';

angular.module('AYARApp')
  .service('fbAuth', ['$window', 'facebookParams', '$q', 'Restangular', '$state', function($window, facebookParams, $q, Restangular, $state) {

      var loginUrlWithParameters = facebookParams.loginUrl + '?client_id=' + facebookParams.appId + '&display=popup' + '&scope=email' +'&redirect_uri=';
      var newBrowserWindow;
      var deferred;

      loginUrlWithParameters = loginUrlWithParameters + facebookParams.oauthRedirectUrlLocal;

      $window._app.oauthCallback = function (url) {
        console.log(url, 'THIS IS URL');
        deferred.resolve(url);
      };

      this.login = function(){
        deferred = $q.defer();
        newBrowserWindow = $window.open(loginUrlWithParameters, '_blank', 'location=no');
        console.log(deferred.promise, 'THIS IS DEFERRED.PROMISE');
        return deferred.promise;
      };


      this.sendAuthCode = function(url){
        console.log('THIS IS THE URL PARAM: ', url);
        var code = url.split('code=')[1];
        console.log(code, 'THIS IS THE CODE SENT TO SERVER');

        return Restangular.all('auth/fb')
          .post({code: code})
          .then(function(data){
            console.log('MADE IT TO RECEIVING JWT');
            console.log(data, 'THIS IS THE JWT');
            console.log('this is the token', data.token);
            $window.localStorage.jwt = data.token;
            $window.localStorage.name = data.fbProfileInfo.name;

            $state.go('game.createOrJoinGame', {jwt: data.token});
          })
          .catch(function(error){
            console.log('Failed to convert access code to Token: ', error);
          });

      };
      
      //REMOVE WHEN NOT IN USE
      var profileInfo;
      this.fbProfileInfo = function(){return profileInfo;};

  }]);



// CODE COULD BE REFACTORED USABLE

  // .factory('fbAuth', ['facebookParams', '$window', '$q', 'Restangular', '$state', function(facebookParams, $window, $q, Restangular, $state) {

  //   // Can think about refactoring this into a service later on.

  //   var loginUrlWithParameters = facebookParams.loginUrl + '?client_id=' + facebookParams.appId + '&redirect_uri=' + facebookParams.oauthRedirectUrl + '&scope=email';

  //   // Function that redirects to Facebook
  //     // Make sure the Redirect url is uniform for the server and the client
  //     // If they're logged in, redirect them back to index.html, but with another view; the join/host game view
  //   var sendToFB = function() {
  //     // Window.location?
  //     console.log("INSIDE fbAuth FACTORY");
  //     window.location.replace(loginUrlWithParameters);
  //   }

    // // Then prase the URL and get the access code from FB's response
    // var parseAccessCode = function(url) {

    // }

    // // Then send the accessCode to the server
    // var sendAccessCode = function(accessCode) {

    // }


    // Also include the fbProfile to be returned
    // return {
      // sendToFB: sendToFb
      // parseAccessCode: parseAccessCode,
      // sendAccessCode: sendAccessCode
    // }

  // }]);
