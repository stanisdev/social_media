'use strict';

const fs = require('fs');
const _ = require('lodash');
const urlJoin = require('url-join');
const { join } = require('path');

async function register(server, options) {
  const { routesDir } = server.app.config;

  const directories = fs.readdirSync(routesDir, { withFileTypes: true })
    .filter(entity => entity.isDirectory())
    .map(dir => dir.name)
    .filter((d) => d === 'auth'); // @todo: remove this

  for (let i = 0; i < directories.length; i++) {
    const directory = directories[i];

    const entity = _.startCase(_.toLower(directory));
    const routesClassPath = join(routesDir, directory,  entity + 'Routes');
    const routesConfigPath = join(routesDir, directory,  entity + 'Config');
    const routesServicePath = join(routesDir, directory,  entity + 'Service');

    const RoutesClass = require(routesClassPath);
    const ServiceClass = require(routesServicePath);
    const config = require(routesConfigPath);
    const routesInstance = new RoutesClass();
    const handlers = Object.getOwnPropertyNames(RoutesClass.prototype).filter(m => m !== 'constructor');
    
    for (let i = 0; i < handlers.length; i++) {
      const handlerName = handlers[i];
      const options = config.data[handlerName];
      if (!(options instanceof Object) || Object.keys(options) < 1) {
        throw new Error(`You should define config for the "${entity}.${handlerName}" method`);
      }
      const { prefix } = config;

      if (!_.isEmpty(prefix)) {
        options.path = urlJoin(prefix, options.path);
      }
      options.handler = routesInstance[handlerName].bind({
        [`${directory.toLowerCase()}Service`]: new ServiceClass(server.app)
      });

      server.route(options);
    }
  }
}

module.exports = {
  name: 'Bootstrapping of routes',
	register
};