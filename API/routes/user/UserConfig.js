'use strict';

const Joi = require('@hapi/joi');

module.exports = {
  prefix: '/user',
  data: {
    changePassword: {
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
			}
    }
  }
};