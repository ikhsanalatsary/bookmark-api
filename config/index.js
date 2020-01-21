'use strict';

module.exports = {
	db: {
		uri:
			process.env.MONGOHQ_URL ||
      process.env.MONGOLAB_URI ||
      process.env.MONGODB_URI ||
			'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/api_collections',
		options: {
			user: '',
			pass: ''
		},
		// Enable mongoose debug mode
		debug: process.env.MONGODB_DEBUG || false
	}
};
