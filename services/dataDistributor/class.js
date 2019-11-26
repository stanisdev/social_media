'use strict';

class DataDistributor {
  constructor({ config, db }) {
    this.config = config;

    if (config.cacheEnabled) {
      this.storage = {};
      // await warming up of cache and switch storage to redis
    } else {
      this.storage = db;
    }
  }

  findUserByEmail(email) {
    return this.storage.User.findByEmail(email);
  }
}

module.exports = DataDistributor;