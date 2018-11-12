const SayHello = require('../../../src/application/use_cases/SayHello');
const useCase = new SayHello();

test('Retorno "Hello world!" quando nome não está definido (undefined ou null)', () => {
  const promise = useCase.execute();
  return expect(promise).resolves.toBe('Hello world!');
});

test('Retorno "Hello _name_!" quando nome está definido', () => {
  const name = 'eliseu';

  const promise = useCase.execute(name);

  return expect(promise).resolves.toBe('Hello eliseu!');
});

