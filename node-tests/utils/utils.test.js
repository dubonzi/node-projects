const expect = require('expect');
const utils = require('./utils');

it('should add two numbers', () => {
  let result = utils.add(2, 5);

  expect(result).toExist().toBeA('number').toBe(7);
});

it('should return a number squared', () => {
  let result = utils.square(8);
  expect(result).toExist().toBeA('number').toBe(64);
});

it('should verify first and last names are set', () => {
  let user = {};
  user = utils.setName(user, "Eduardo Bonzi");

  expect(user).toInclude({
    firstName: 'Eduardo',
    lastName: 'Bonzi'
  });
});

// Async
it('should async add two numbers', (done) => {
  utils.asyncAdd(4, 3, (sum) => {
    expect(sum).toExist().toBe(7);
    done();
  });
});

it('should async square a number', (done) => {
  utils.asyncSquare(10, (sqr) => {
    expect(sqr).toExist().toBe(100);
    done();
  });
});