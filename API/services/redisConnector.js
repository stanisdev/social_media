'use strict';

const Redis = require('ioredis');
const { strictEqual } = require('assert');

const plugin = {
  name: 'Set connector of redis',
  register: async function(server, options) {
    const redis = new Redis(server.app.config.redis);

    const response = await redis.ping();
    strictEqual(response, 'PONG');

    server.app.redis = redis;
  }
};

module.exports = plugin;