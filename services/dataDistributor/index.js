'use strict';

const DataDistributor = require('./class');

const plugin = {
	name: 'To distribute access to data storages depending on config',
	register: async function(server, options) {
		server.app.dataDistributor = new DataDistributor(server.app);
	}
};

module.exports = plugin;
