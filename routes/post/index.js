'use strict';

const plugin = {
  name: 'Post routes',
  register: async function (server, _options) {
    await server.register([{ plugin: require('./create') }]);
  }
};

module.exports = plugin;
