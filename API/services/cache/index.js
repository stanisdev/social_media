'use strict';

const path = require('path');
const glob = require('glob');
const _ = require('lodash');

class Cache {
  constructor({ redis, db }) {
    this.redis = redis;
    this.db = db;
  }

  getModels() {
    const { redis, db } = this;
    const modelsPath = path.join(__dirname, 'models');
    const files = glob.sync(modelsPath + '/*.js');
    const models = {};

    files.forEach(file => {
      const ModelClass = require(file);
      const name = _.startCase(_.toLower(path.basename(file).slice(0, -3)));
      models[name] = new ModelClass(redis, db);
    });

    return models;
  }
}

module.exports = Cache;