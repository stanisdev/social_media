'use strict';

const AuthService = require('./AuthService');

const plugin = {
	name: 'Auth routes',
	register: async function(server, _options) {
		const { db, mailer } = server.app;
		const authService = new AuthService(db, mailer);
		const options = { authService };

		await server.register([
			{ plugin: require('./login'), options },
			{ plugin: require('./register'), options },
			{ plugin: require('./resetPassword'), options }
		]);
	}
};

module.exports = plugin;
