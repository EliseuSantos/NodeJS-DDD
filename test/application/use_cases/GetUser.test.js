const Promise = require('bluebird');
const User = require('../../../src/domain/entities/User');

const UserRepository = require('../../../src/application/repositories/UserRepository');
const MockUserRepository = class extends UserRepository {};
const mockUserRepository = new MockUserRepository();

const GetUser = require('../../../src/application/use_cases/GetUser');
const useCase = new GetUser(mockUserRepository);

test('Valida usuário no DB com entidade', () => {
  const correspondingUser = new User(123, 'eliseu', 'santos', 'eliseu.santos@email.com', '123456');
  mockUserRepository.get = jest.fn((userId) => Promise.resolve(correspondingUser));

  const promise = useCase.execute(123);

  expect(mockUserRepository.get).toHaveBeenCalledWith(123);
  return expect(promise).resolves.toEqual(correspondingUser);
});
