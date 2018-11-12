const Promise = require('bluebird');

const UserRepository = require('../../../src/application/repositories/UserRepository');
const MockUserRepository = class extends UserRepository {};
const mockUserRepository = new MockUserRepository();

const ListUsers = require('../../../src/application/use_cases/ListUsers');
const useCase = new ListUsers(mockUserRepository);

test('Retornar lista do usuário do repositório', () => {
  mockUserRepository.find = () => Promise.resolve(['eliseu', 'erica']);
  const promise = useCase.execute();

  return expect(promise).resolves.toEqual(['eliseu', 'erica']);
});
