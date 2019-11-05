'use strict';

const plugin = {
	name: 'Login route',
	register: async function(server, options) {
		server.route({
			method: 'GET',
			path: '/login',
			handler: function(req, h) {
				return { ok: true, message: 'Loged in' };
			}
		});
	}
};

module.exports = plugin;
