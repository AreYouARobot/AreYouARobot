'use strict';

angular.module('AYARApp')
  .service('fbAuth', ['$window', 'facebookParams', '$q', 'Restangular', '$state', function($window, facebookParams, $q, Restangular, $state) {

      var loginUrlWithParameters = facebookParams.loginUrl + '?client_id=' + facebookParams.appId + '&display=popup' + '&scope=email' +'&redirect_uri=';
      var newBrowserWindow;
      var deferred;

      loginUrlWithParameters = loginUrlWithParameters + facebookParams.oauthRedirectUrlDeployed;
      // loginUrlWithParameters = loginUrlWithParameters + facebookParams.oauthRedirectUrlLocal;

      // Look into eventlistener for pageload URL. If URL contains localhost, use localhost for oauthredirectUrl
      // Else configure it to use the server/deployed URL

      $window._app.oauthCallback = function (url) {
        // console.log(url, 'THIS IS URL');
        deferred.resolve(url);
      };

      this.login = function(){
        deferred = $q.defer();
        newBrowserWindow = $window.open(loginUrlWithParameters, '_blank', 'location=no');
        // console.log(deferred.promise, 'THIS IS DEFERRED.PROMISE');
        return deferred.promise;
      };


      this.sendAuthCode = function(url){
        // console.log('THIS IS THE URL PARAM: ', url);
        var code = url.split('code=')[1];
        // console.log(code, 'THIS IS THE CODE SENT TO SERVER');

        return Restangular.all('auth/fb')
          .post({code: code})
          .then(function(data){
            // console.log(data, 'THIS IS THE JWT');
            // console.log('this is the token', data.token);
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
      this.fbProfileInfo = function() { return profileInfo; };

  }]);
