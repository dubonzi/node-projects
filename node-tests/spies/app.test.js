const expect = require('expect');
const rewire = require('rewire');

const app = rewire('./app');

describe('App', () => {
  
  const db = {
    saveUser: expect.createSpy()
  }
  app.__set__('db', db);

  it('should call the spy correctly', () => {
    const spy = expect.createSpy();
    spy('Hello', 20);
    expect(spy).toHaveBeenCalledWith('Hello', 20);
  });

  it('should call saveUser with user object', () => {
    let email = 'eduardo@exemplo.com';
    let password = '12345';

    app.handleSignup(email, password);

    expect(db.saveUser).toHaveBeenCalledWith({email, password});
  });

});