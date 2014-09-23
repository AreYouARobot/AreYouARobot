'use strict'

// Production specific configuration

module.exports = {
	// MongoDB Connection options
	mongo: {
		uri: 		process.env.CUSTOMCONNSTR_MONGOLAB_URI ||
						process.env.MONGOHQ_URL ||
						process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
						'mongodb://localhost/areyouarobot'
	}
};