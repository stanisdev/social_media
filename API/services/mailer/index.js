'use strict';

const plugin = {
	name: 'Set instance of mailer',
	register: async function(server, options) {
		const Mailer = require('./class');
		server.app.mailer = new Mailer(server.app.config.mailer);
	}
};

module.exports = plugin;
