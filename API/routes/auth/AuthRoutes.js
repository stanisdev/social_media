'use strict';

class AuthRoutes {
  constructor() {}

  async registrationInit(req, h) {
    const { email } = req.payload;
    // @todo: handle the error if email already used
    await this.authService.registrationInit(email);
    return { ok: true };
  }

  async registrationComplete(req, h) {
    const data = Object.assign(req.payload, req.params);
    await this.authService.registrationComplete(data);
    return { ok: true };
  }

  async login(req, h) {
    const token = await this.authService.login(req.payload);
    return { ok: true, token };
  }

  async resetPassword(req, h) {
    await this.authService.resetPassword();
    return { ok: true };
  }
}

module.exports = AuthRoutes;