'use strict';

class AuthRoutes {
  constructor() {}

  async registrationInit(req, h) {
    const data = this.authService.registrationInit();
    return { response: data };
  }
}

module.exports = AuthRoutes;