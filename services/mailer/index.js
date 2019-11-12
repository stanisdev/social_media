'use strict';

const config = require('../../config');
const Mailer = require('./class');

const plugin = {
  name: 'Set instance of mailer',
  register: async function (server, options) {
    server.app.mailer = new Mailer(config.mailer);
  }
};

module.exports = plugin;
