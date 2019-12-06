'use strict';

const Joi = require('@hapi/joi');
const PostService = require('./PostService');

module.exports = {
  prefix: '/post',
  data: {
    create: {
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
			}
    },
    like: {
      method: 'GET',
			path: '/like/{post_uid}/{state}',
			options: {
        auth: 'jwt',
        pre: [
          {
            method: PostService.findPost
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
			}
    }
  }
};