'use strict';

const UserService = require('./UserService');

const plugin = {
	name: 'User routes',
	register: async function(server, _options) {
		const userService = new UserService(server.app);
		const options = { userService };

		await server.register([
			{ plugin: require('./changePassword'), options }
		]);
	}
};

module.exports = plugin;
