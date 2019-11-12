'use strict';

const Joi = require('@hapi/joi');

const plugin = {
  name: 'Completion of registration',
  register: async function (server, options) {
    server.route({
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
      },
      handler: async function (req, h) {
        const data = Object.assign(req.payload, req.params);
        await options.authService.registrationComplete(data);
        return { ok: true };
      }
    });
  }
};

module.exports = plugin;
