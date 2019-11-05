'use strict';

const AuthService = require('./AuthService');

const plugin = {
  name: 'Auth routes',
  register: async function (server, options) {
    const authService = new AuthService(server.app.db);

    await server.register([
      { plugin: require('./login') },
      { plugin: require('./register') },
      { plugin: require('./resetPassword'), options: { authService } }
    ]);
  }
};

module.exports = plugin;
