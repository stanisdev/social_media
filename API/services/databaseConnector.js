'use strict';

const plugin = {
  name: 'Set connector of database',
  register: async function(server, options) {
    const db = require('../../MODELS/mariadb/models'); // @todo: fix this
    await db.sequelize.authenticate();

    server.app.db = db;
  }
};

module.exports = plugin;