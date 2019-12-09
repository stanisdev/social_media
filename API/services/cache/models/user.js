'use strict';

class User {
  schema = {
    id: Number,
    email: String,
    password: String,
    salt: String,
  };

  constructor(redis, db) {
    this.redis = redis;
    this.db = db;
  }

  async warmUp() {

  }

  findByEmail(email) {

  }
}

module.exports = User;