'use strict';

class UserRoutes {
  async changePassword(req, h) {
    const { payload, user } = req;
    payload.user = user;
    await this.userService.changePassword(payload);
    return { ok: true };
  }
}

module.exports = UserRoutes;