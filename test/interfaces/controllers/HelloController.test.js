const Promise = require('bluebird');
const SayHello = require('../../../src/application/use_cases/SayHello');
const HelloController = require('../../../src/interfaces/controllers/HelloController');

beforeEach(() => {
  SayHello.prototype.execute = jest.fn();
});

afterEach(() => {
  SayHello.prototype.execute.mockReset();
});

describe('#sayHelloWorld', () => {
  test('Rtornar', () => {
    SayHello.prototype.execute.mockImplementationOnce(() => Promise.resolve('Bom dia !'));
    const controller = new HelloController();

    const promise = controller.sayHelloWorld();

    expect(promise).resolves.toBe('Bom dia !');
    expect(SayHello.prototype.execute).toHaveBeenCalled();
  });
});

describe('#sayHelloPerson', () => {
  test('Retornar', () => {
    SayHello.prototype.execute.mockImplementationOnce(() => Promise.resolve('Bom dia eliseu !'));
    const controller = new HelloController();
    const request = { params: { name: 'eliseu' } };

    const promise = controller.sayHelloPerson(request);

    expect(promise).resolves.toBe('Bom dia eliseu !');
    expect(SayHello.prototype.execute).toHaveBeenCalledWith('eliseu');
  });
});
