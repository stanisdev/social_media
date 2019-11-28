'use strict';

const CacheManager = require('./class');

const plugin = {
	name: 'Client of cache manager',
	register: async function(server, options) {
		const cm = new CacheManager(server.app);
		await cm.start();
		server.app.cacheManager = cm;
	}
};

module.exports = plugin;
