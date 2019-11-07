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
