'use strict';

module.exports = {
  method: 'GET',
  path: '/register',
  handler: async function (req, h) {

    return { ok: true, message: 'registered' };
  }
};