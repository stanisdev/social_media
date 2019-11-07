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
	}
};

module.exports = plugin;
