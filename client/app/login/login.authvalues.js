'use strict'

angular.module('AYARApp')
	.value('facebookParams', {
		loginUrl: 'https://www.facebook.com/dialog/oauth',
		appId: 856871080999075,
		oauthRedirectUrl: 'http://localhost:8085/oauthcallback.html'
	})


// 'use strict';

// (function(){

//   angular
//     .module('app.login.authValues',[])
//     .value('facebookParams', {
//       loginUrl: 'https://www.facebook.com/dialog/oauth',
//       appId: 678308422257930,
//       oauthRedirectUrl: 'http://localhost/#/auth/fb',
//       oauthRedirectUrlNonCordova: 'http://jtmeetup.azurewebsites.net/oauthcallback.html'
//       // oauthRedirectUrlNonCordova: 'http://localhost:8000/oauthcallback.html'
//     });
// })();