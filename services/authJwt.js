'use strict';

const plugin = {
  name: 'JWT auth filter',
  register: async function (server, options) {
    await server.register(require('hapi-auth-jwt2'));
    const { db, config } = server.app;

    server.auth.strategy('jwt', 'jwt', {
      key: config.auth.secret,
      validate: async function (decoded, request, h) {
        const { id } = decoded;
        const user = await db.User.findByPk(id);
        if (!(user instanceof Object)) {
          return { isValid: false };
        }

        request.user = user;
        return { isValid: true };
      }
    });

    server.auth.default('jwt');
  }
};

module.exports = plugin;
