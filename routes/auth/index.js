'use strict';

const plugin = {
  name: 'Auth routes',
  register: async function (server, options) {

    server.route([
    	require('./login'),
    	require('./register'),
    	require('./resetPassword')
    ]);
  }
};

module.exports = plugin;
