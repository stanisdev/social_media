'use strict';

const { merge, isEmpty } = require('lodash');
const { dirname, join } = require('path');
const rootDir = dirname(__dirname);
const env = process.env.NODE_ENV || 'local';

const config = {
	local: {
		rootDir,
		databaseDir: join(rootDir, 'storages', 'database', 'models'),
		routesDir: join(rootDir, 'routes'),
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
		cacheManager: {
			queues: {
				forward: 'socialmedia.cache.forward',
				replyTo: 'socialmedia.cache.replyto'
			}
		},
		cacheEnabled: !isEmpty(env.CACHE_ENABLED) || false,
		redis: {
			host: '127.0.0.1',
			db: 0,
			password: undefined,
			port: 6379,
			maxRetriesPerRequest: 1
		}
	},
	test: {
		port: 3001
	},
	development: {},
	staging: {},
	production: {}
};

const result = merge(config.local, config[env]);

module.exports = Object.freeze(result);
