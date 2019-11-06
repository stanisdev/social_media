'use strict';

const Joi = require('@hapi/joi');

const plugin = {
	name: 'Register route',
	register: async function(server, options) {
		server.route({
			method: 'POST',
			path: '/register',
			options: {
				validate: {
					payload: {
						email: Joi.string()
							.email()
							.min(6)
							.max(70)
					}
				}
			},
			handler: async function(req, h) {
				const { email } = req.payload;
				await options.authService.register(email);
				return { ok: true, message: 'Registered' };
			}
		});
	}
};

module.exports = plugin;
