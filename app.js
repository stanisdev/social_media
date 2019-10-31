'use strict';

const Hapi = require('@hapi/hapi');
init();

async function init() {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  await server.register({
    plugin: require('./routes')
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
}
