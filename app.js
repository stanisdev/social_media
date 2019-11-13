'use strict';

require('make-promises-safe');
const Hapi = require('@hapi/hapi');
const config = require('./config');

init();

async function init() {
	const server = Hapi.server({
		port: config.port,
		host: config.host
	});

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
		plugin: require('./services/auxiliaryTools')
	});

	await server.register({
		plugin: require('./services/authJwt')
	});

	await server.register({
		plugin: require('./services/mailer')
	});

	await server.register({
		plugin: require('./routes')
	});

	await server.start();
	console.log('Server running on %s', server.info.uri);
}
