'use strict';

const plugin = {
  name: 'Reseting of password route',
  register: async function (server, options) {

    server.route({
      method: 'GET',
      path: '/reset_password',
      handler: function (req, h) {

      	options.authService.resetPassword();
        return { ok: true, message: 'Password reseted' };
      }
    });
  }
};

module.exports = plugin;