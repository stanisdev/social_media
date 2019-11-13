'use strict';

const Joi = require('@hapi/joi');

const plugin = {
	name: "Create new user's post",
	register: async function(server, options) {
		server.route({
			method: 'PUT',
			path: '/',
			options: {
				auth: 'jwt',
				validate: {
					payload: {
						content: Joi.string()
							.min(1)
							.required(),
						/**
						 * Visibility
						 * 0 - all
						 * 1 - friends
						 * 2 - only me
						 */
						state: Joi.number()
							.integer()
							.min(0)
							.max(2)
							.required()
					}
				}
			},
			handler: async function(req, h) {
				const { payload, user } = req;
				payload.user = user;
				await options.postService.create(payload);
				return { ok: true };
			}
		});
	}
};

module.exports = plugin;
