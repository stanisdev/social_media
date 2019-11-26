'use strict';

const plugin = {
	name: 'Routes',
	register: async function(server, options) {
		await server.register({
			plugin: require('./auth'),
			routes: {
				prefix: '/auth'
			}
		});

		await server.register({
			plugin: require('./post'),
			routes: {
				prefix: '/post'
			}
		});

		await server.register({
			plugin: require('./user'),
			routes: {
				prefix: '/user'
			}
		});
	}
};

module.exports = plugin;
