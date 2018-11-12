const AccessTokenManager = require('../../../src/application/security/AccessTokenManager');
const MockAccessTokenManager = class extends AccessTokenManager {};
const mockAccessTokenManager = new MockAccessTokenManager();

const VerifyAccessToken = require('../../../src/application/use_cases/VerifyAccessToken');
const useCase = new VerifyAccessToken(mockAccessTokenManager);

test('Retornar os dados do usuário (ID) decodificados quando o token de acesso do JWT for válido', () => {
  mockAccessTokenManager.decode = () => {
    return { uid: 1234 };
  };

  const promise = useCase.execute('some-jwt-access-token');

  return expect(promise).resolves.toEqual({ uid: 1234 });
});

test('Rejeitar quando o token de acesso do JWT for inválido', () => {
  mockAccessTokenManager.decode = () => null;
  const promise = useCase.execute('a-wrong-jwt-access-token');

  return expect(promise).rejects.toThrow('Token de acesso inválido');
});
