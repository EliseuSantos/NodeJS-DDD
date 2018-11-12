'use strict';

const Promise = require('bluebird');
const User = require('../../domain/entities/User');
const UserRepository = require('../../application/repositories/UserRepository');

module.exports = class extends UserRepository {

  _initializeRepositoryWithTwoUsers() {
    const eliseu = new User(null, 'eliseu', 'santos', 'eliseu.santos@mail.com', 'ABCD1234');
    const erica = new User(null, 'erica', 'renata', 'erica.renata@mail.com', 'EFGH5678');
    this.persist(eliseu).then(() => this.persist(erica));
  }

  _dataAsArray() {
    return Object.keys(this.data).map(key => this.data[key]);
  }

  constructor() {
    super();
    this.index = 1;
    this.data = {};
    this._initializeRepositoryWithTwoUsers();
  }

  persist(userEntity) {
    const row = Object.assign({}, userEntity);
    const rowId = this.index++;
    row.id = rowId;
    this.data[rowId] = row;
    return Promise.resolve(row);
  }

  merge(userEntity) {
    let row = this.data[userEntity.id];
    Object.assign(row, userEntity);
    return Promise.resolve(row);
  }

  remove(userId) {
    delete this.data[userId];
    return Promise.resolve();
  }

  get(userId) {
    return Promise.resolve(this.data[userId]);
  }

  getByEmail(userEmail) {
    const users = this._dataAsArray();
    return Promise.resolve(users.find(user => user.email === userEmail));
  }

  find() {
    return Promise.resolve(this._dataAsArray());
  }

};