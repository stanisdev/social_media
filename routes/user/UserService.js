'use strict';

class UserService {
  constructor({ db }) {
    this.db = db;
  }

  changePassword({ user, newPassword, oldPassword }) {
  }
}

module.exports = UserService;