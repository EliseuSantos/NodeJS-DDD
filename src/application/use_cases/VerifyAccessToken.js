'use strict';

const Promise = require('bluebird');

module.exports = class {

  constructor(accessTokenManager) {
    this.accessTokenManager = accessTokenManager;
  }

  execute(accessToken) {
    const decoded = this.accessTokenManager.decode(accessToken);
    if (!decoded) {
      return Promise.reject(new Error('Token de acesso inválido'));
    }
    return Promise.resolve({uid: decoded.uid});
  }
};