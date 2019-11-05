'use strict';

const plugin = {
	name: 'Register route',
	register: async function(server, options) {
		server.route({
			method: 'GET',
			path: '/register',
			handler: function(req, h) {
				return { ok: true, message: 'Registered' };
			}
		});
	}
};

module.exports = plugin;
