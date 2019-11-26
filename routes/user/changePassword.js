'use strict';

const Joi = require('@hapi/joi');

const plugin = {
	name: "Change user's password",
	register: async function(server, options) {
		server.route({
			method: 'POST',
			path: '/change-password',
			options: {
				auth: 'jwt',
				validate: {
					payload: {
						oldPassword: Joi.string()
							.min(5) // @todo: this value move to config
							.required(),
						newPassword: Joi.string()
							.min(5)
							.required(),
						newPasswordConfirm: Joi.ref('newPassword')
					}
				}
			},
			handler: async function(req, h) {
				const { payload, user } = req;
				payload.user = user;
				await options.userService.changePassword(payload);
				return { ok: true };
			}
		});
	}
};

module.exports = plugin;
