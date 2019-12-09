'use strict';

class UserService {
  constructor({ db, cacheManager }) {
    this.db = db;
    this.cacheManager = cacheManager;
  }

  async changePassword({ user, newPassword, oldPassword }) {
    await this.cacheManager.sendQuery({
      action: 'user.updatePassword',
      data: {
        userId: user.id,
        newPassword
      }
    });
  }
}

module.exports = UserService;