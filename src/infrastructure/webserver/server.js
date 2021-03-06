'use strict';

const Hapi = require('hapi');

const createServer = async () => {

  const server = Hapi.server({
    port: process.env.PORT || 3000
  });

  await server.register([
    require('blipp'),
    require('./plugins/oauth')
  ]);

  server.route(require('./routes'));

  return server;
};

module.exports = createServer;