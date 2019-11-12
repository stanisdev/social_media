'use strict';

const plugin = {
  name: 'Register config object in global variable',
  register: async function (server, options) {
    const config = require('../config');
    server.app.config = config;
  }
};

module.exports = plugin;
