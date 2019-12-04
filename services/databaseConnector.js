'use strict';

const plugin = {
	name: 'Set connector of database',
	register: async function(server, options) {
		// const db = require(server.app.config.databaseDir);
		const db = require('../../social_media_models/mariadb/models'); // @todo: fix this
		await db.sequelize.authenticate();

		server.app.db = {};
	}
};

module.exports = plugin;
