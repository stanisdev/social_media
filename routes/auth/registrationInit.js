'use strict';

const Joi = require('@hapi/joi');

const plugin = {
	name: 'Initialization of registration',
	register: async function(server, options) {
		server.route({
			method: 'POST',
			path: '/registration-init',
			options: {
				auth: false,
				validate: {
					payload: {
						email: Joi.string()
							.email()
							.min(6)
							.max(70)
							.required()
					}
				}
			},
			handler: async function(req, h) {
				const { email } = req.payload;
				await options.authService.registrationInit(email);
				return { ok: true };
			}
		});
	}
};

module.exports = plugin;
