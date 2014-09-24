'use strict'

var fbHandling = require('./authFbHandlers.js');

module.exports = function(app) {
	// app = router injected from middleware.js

	app.route('/fb')
		.post(fbHandling.fbLogin);

	app.route('/*', function(req, res) {
		res.status(400).end();
	});

};
