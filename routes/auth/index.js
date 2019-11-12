'use strict';

const AuthService = require('./AuthService');

const plugin = {
  name: 'Auth routes',
  register: async function (server, _options) {
    const { db, mailer, config } = server.app;
    const authService = new AuthService(db, mailer, config);
    const options = { authService };

    await server.register([
      { plugin: require('./login'), options },
      { plugin: require('./registrationInit'), options },
      { plugin: require('./registrationComplete'), options },
      { plugin: require('./resetPassword'), options }
    ]);
  }
};

module.exports = plugin;
