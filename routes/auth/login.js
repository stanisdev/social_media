'use strict';

const Joi = require('@hapi/joi');

const plugin = {
	name: 'Login user',
	register: async function(server, options) {
		server.route({
			method: 'POST',
			path: '/login',
			options: {
				auth: false,
				validate: {
					payload: {
						email: Joi.string()
							.email()
							.min(6)
							.max(70)
							.required(),
						password: Joi.string()
							.min(5)
							.required()
					}
				}
			},
			handler: async function(req, h) {
				const token = await options.authService.login(req.payload);
				return { ok: true, token };
			}
		});
	}
};

module.exports = plugin;
