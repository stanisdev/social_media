'use strict';

const AuxiliaryTools = require('./class');

const plugin = {
	name: 'Register instance of auxiliary tools class',
	register: async function(server, options) {
		const { app } = server;
		app.auxiliaryTools = new AuxiliaryTools(app);
	}
};

module.exports = plugin;
