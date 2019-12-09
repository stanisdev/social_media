'use strict';

const plugin = {
  name: 'Register config object in global variable',
  register: async function(server, options) {
    const config = require('../../CONFIG');
    server.app.config = config;
  }
};

module.exports = plugin;