"use strict";

const Hapi = require("@hapi/hapi");
const config = require("./config");

init();

async function init() {
  const server = Hapi.server({
    port: config.port,
    host: config.host
  });

  await server.register({
    plugin: require("./services/databaseConnector")
  });

  await server.register({
    plugin: require("./routes")
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
}

// @todo: Fix the error "UnhandledPromiseRejectionWarning"
