'use strict';

module.exports = {
  method: 'GET',
  path: '/reset_password',
  handler: async function (req, h) {

    return { ok: true, message: 'password reseted' };
  }
};