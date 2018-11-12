const Promise = require('bluebird');
const User = require('../../../src/domain/entities/User');

const UserRepository = require('../../../src/application/repositories/UserRepository');
const MockUserRepository = class extends UserRepository {};
const mockUserRepository = new MockUserRepository();

const CreateUser = require('../../../src/application/use_cases/CreateUser');
const useCase = new CreateUser(mockUserRepository);

test('Valida insert de usuário', () => {
  const persistedUser = new User(123, 'eliseu', 'santos', 'eliseu.santos@email.com', '123456');
  mockUserRepository.persist = jest.fn(() => Promise.resolve(persistedUser));

  const promise = useCase.execute('eliseu', 'santos', 'eliseu.santos@email.com', '123456');

  expect(mockUserRepository.persist).toHaveBeenCalledWith(new User(null, 'eliseu', 'santos', 'eliseu.santos@email.com', '123456'));
  return expect(promise).resolves.toEqual(persistedUser);
});
