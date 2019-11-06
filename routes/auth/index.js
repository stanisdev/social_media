'use strict';

const AuthService = require('./AuthService');

const plugin = {
	name: 'Auth routes',
	register: async function(server, _options) {
		const mailer = {
			// @todo: Move to separate service
			async send() {}
		};
		const authService = new AuthService(server.app.db, mailer);
		const options = { authService };

		await server.register([
			{ plugin: require('./login'), options },
			{ plugin: require('./register'), options },
			{ plugin: require('./resetPassword'), options }
		]);
	}
};

module.exports = plugin;
