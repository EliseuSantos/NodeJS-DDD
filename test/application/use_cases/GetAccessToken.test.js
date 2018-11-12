const Promise = require('bluebird');

const UserRepository = require('../../../src/application/repositories/UserRepository');
const MockUserRepository = class extends UserRepository {};
const mockUserRepository = new MockUserRepository();

const AccessTokenManager = require('../../../src/application/security/AccessTokenManager');
const MockAccessTokenManager = class extends AccessTokenManager{};
const mockAccessTokenManager = new MockAccessTokenManager();

const GetAccessToken = require('../../../src/application/use_cases/GetAccessToken');
const useCase = new GetAccessToken(mockUserRepository, mockAccessTokenManager);

test('Retornar com um token JWT quando as credenciais estão ok', () => {
  mockUserRepository.getByEmail = () => Promise.resolve({ password: 'abcd-1234'});
  mockAccessTokenManager.generate = () => 'generated-jwt-access-token';

  const promise = useCase.execute('eliseu@mail.com', 'abcd-1234');

  return expect(promise).resolves.toBe('generated-jwt-access-token');
});

test('Rejeitar quando usuário não for encontrado', () => {
  mockUserRepository.getByEmail = () => Promise.resolve(null);

  const promise = useCase.execute('eliseu@mail.com', 'abcd-1234');

  return expect(promise).rejects.toThrow('Ccredenciais Inválida');
});

test('Rejeitar quando a senha estiver incorreta', () => {

  mockUserRepository.getByEmail = () => Promise.resolve({ password: 'abcd-1234'});

  const promise = useCase.execute('eliseu@mail.com', '18818638612873');

  return expect(promise).rejects.toThrow('Credenciais Inválida');
});
