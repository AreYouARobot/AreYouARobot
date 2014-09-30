'use strict'

angular.module('AYARApp')
	.value('facebookParams', {
		loginUrl: 'https://www.facebook.com/dialog/oauth',
		appId: 856871080999075,
		oauthRedirectUrlLocal: 'http://localhost:8085/oauthcallback.html',
		oauthRedirectUrlDeployed: ''
	})
	