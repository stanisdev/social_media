'use strict';

require('make-promises-safe');
const Hapi = require('@hapi/hapi');
const { port, host } = require('../CONFIG');

init();

async function init() {
  const server = Hapi.server({ port, host });

  server.events.on(
    { name: 'request', channels: 'error' },
    (request, event, tags) => {
      const { error } = event;
      if (error instanceof Error) {
        console.error(error.stack); // @todo: prinit more details
      }
    }
  );

  await server.register({
    plugin: require('./services/registerConfig')
  });

  await server.register({
    plugin: require('./services/databaseConnector')
  });

  await server.register({
    plugin: require('./services/redisConnector')
  });

  await server.register({
    plugin: require('./services/auxiliaryTools')
  });

  await server.register({
    plugin: require('./services/authJwt')
  });

  await server.register({
    plugin: require('./services/mailer')
  });

  await server.register({
    plugin: require('./services/cacheManager')
  });

  await server.register({
    plugin: require('./services/assignRoutes')
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
}