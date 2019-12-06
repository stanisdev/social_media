'use strict';

const fs = require('fs');
const _ = require('lodash');
const urlJoin = require('url-join');
const { join } = require('path');

async function register(server, options) {
  const { routesDir } = server.app.config;

  const directories = fs.readdirSync(routesDir, { withFileTypes: true })
    .filter(entity => entity.isDirectory())
    .map(dir => dir.name);

  /**
   * iterate over folders
   */
  for (let i = 0; i < directories.length; i++) {
    const directory = directories[i];

    const entity = _.startCase(_.toLower(directory));
    const routesClassPath = join(routesDir, directory, entity + 'Routes');
    const routesConfigPath = join(routesDir, directory, entity + 'Config');
    const routesServicePath = join(routesDir, directory, entity + 'Service');

    const RoutesClass = require(routesClassPath);
    const ServiceClass = require(routesServicePath);
    const config = require(routesConfigPath);
    const routesInstance = new RoutesClass();
    const handlers = Object.getOwnPropertyNames(RoutesClass.prototype).filter(m => m !== 'constructor');
    
    /**
     * iterate over class methods
     */
    for (let i = 0; i < handlers.length; i++) {
      const handlerName = handlers[i];
      const options = config.data[handlerName];
      if (!(options instanceof Object) || Object.keys(options) < 1) {
        throw new Error(`You should define config for the "${entity}.${handlerName}" method`);
      }
      const { prefix } = config;

      if (!_.isEmpty(prefix)) {
        let path = urlJoin(prefix, options.path);
        if (path.endsWith('/')) {
          path = path.slice(0, -1);
        }
        options.path = path;
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