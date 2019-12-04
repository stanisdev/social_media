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
    registrationComplete: {},
    login: {},
    resetPassword: {}
  }
};