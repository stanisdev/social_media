'use strict';

const Joi = require('@hapi/joi');

module.exports = {
  prefix: '/auth',
  data: {
    registrationInit: {
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
      }
    },
    registrationComplete: {
      method: 'POST',
      path: '/registration-complete/{code}',
      options: {
        auth: false,
        validate: {
          params: {
            code: Joi.string()
              .length(25)
              .required()
              .description('confirmation code')
          },
          payload: {
            firstName: Joi.string()
              .min(1)
              .max(70)
              .required(),
            lastName: Joi.string()
              .min(1)
              .max(70),
            birthDate: Joi.date().required(), // expected format: 1976-11-28
            gender: Joi.number()
              .integer()
              .min(0)
              .max(1)
              .required(),
            password: Joi.string()
              .min(5)
              .required(),
            passwordConfirm: Joi.ref('password')
          }
        }
      }
    },
    login: {
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
			}
    },
    resetPassword: {
      method: 'GET',
			path: '/reset_password'
    }
  }
};