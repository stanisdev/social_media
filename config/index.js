'use strict';

const { merge, isEmpty } = require('lodash');
const { dirname, join } = require('path');
const rootDir = dirname(__dirname);
const { env } = process;

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
				pass: env.MAILER_PASS
			}
		},
		auth: {
			secret: '0UIHDJgRajeJfj85E8849LJR6p', // replace this by another value
			ttl: '?' // @todo: use it in JWT.crypt
		},
		cacheEnabled: !isEmpty(env.CACHE_ENABLED) || false
	},
	test: {
		port: 3001
	},
	development: {},
	staging: {},
	production: {}
};

const env = env.NODE_ENV || 'local';
const result = merge(config.local, config[env]);

module.exports = Object.freeze(result);
