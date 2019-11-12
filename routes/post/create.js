'use strict';

const plugin = {
  name: "Create new user's post",
  register: async function (server, options) {
    server.route({
      method: 'PUT',
      path: '/',
      options: {
        auth: 'jwt'
      },
      handler: async function (req, h) {
        console.log(req.user.dataValues);
        return { ok: true };
      }
    });
  }
};

module.exports = plugin;
