'use strict';

var fbHandling = require('./authFbHandlers.js');

// Auth Routing handles authentication requests for our application
// Requests get routed here from middleware.js
module.exports = function(app) {
	// app = router injected from middleware.js

	app.route('/fb')
		.post(fbHandling.fbLogin);

	app.route('/*', function(req, res) {
		res.status(400).end();
	});

};
