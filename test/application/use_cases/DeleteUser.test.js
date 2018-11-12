const Promise = require('bluebird');

const UserRepository = require('../../../src/application/repositories/UserRepository');
const MockUserRepository = class extends UserRepository {};
const mockUserRepository = new MockUserRepository();

const DeleteUser = require('../../../src/application/use_cases/DeleteUser');
const useCase = new DeleteUser(mockUserRepository);

test('Retornar nenhum resultado', () => {
  mockUserRepository.remove = jest.fn((userId) => Promise.resolve());
  const promise = useCase.execute(123);

  expect(mockUserRepository.remove).toHaveBeenCalledWith(123);
  return expect(promise).resolves.toBe();
});
