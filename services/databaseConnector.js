'use strict';

const config = require('../config');

const plugin = {
  name: 'Set connector of database',
  register: async function (server, options) {

  	const db = require(config.databaseDir);
  	await db.sequelize.authenticate();

    server.app.db = db;
  }
};

module.exports = plugin;