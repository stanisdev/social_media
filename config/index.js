'use strict';

const _ = require('lodash');
const { dirname, join } = require('path');
const rootDir = dirname(__dirname);

const config = {
  local: {
    rootDir,
    databaseDir: join(rootDir, 'storages', 'database', 'models'),
    host: 'localhost',
    port: 3000,
    mailer: {
      service: 'Yandex',
      auth: {
        user: 'media.5ocial@yandex.ru',
        pass: process.env.MAILER_PASS
      }
    },
    auth: {
      secret: '0UIHDJgRajeJfj85E8849LJR6p', // replace this by another value
      ttl: '?' // @todo: use it in JWT.crypt
    }
  },
  test: {
    port: 3001
  },
  development: {},
  staging: {},
  production: {}
};

const env = process.env.NODE_ENV || 'local';
const result = _.merge(config.local, config[env]);

module.exports = Object.freeze(result);
