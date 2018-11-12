'use strict';

const createServer = require('./src/infrastructure/webserver/server');

const start = async () => {

  try {
    const server = await createServer();
    await server.start();

    console.log('Servidor rodando em:', server.info.uri);
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();