'use strict';

const Joi = require('@hapi/joi');

const plugin = {
	name: 'Set or remove like in a user\'s post',
	register: async function(server, options) {
    const { postService } = options;
		server.route({
			method: 'GET',
			path: '/like/{post_uid}/{state}',
			options: {
        auth: 'jwt',
        pre: [
          {
            method: postService.findPost
          }
        ],
				validate: {
					params: {
            post_uid: Joi.number()
              .integer()
              .required(),
            /**
             * 1 - set like
             * 0 - remove like
             */
            state: Joi.number()
							.integer()
							.min(0)
							.max(1)
							.required()
					}
				}
			},
			handler: async function(req, h) {
        const { user, post, params } = req;
        await options.postService.like({
          user,
          post,
          state: params.state
        });
				return { ok: true };
			}
		});
	}
};

module.exports = plugin;
