const request = require('supertest');
const expect = require('expect');
const app = require('./server').app;

it('should return hello world response', (done) => {
  request(app)
    .get('/')
    .expect(404)
    .expect((res) => {
      expect(res.body).toInclude({
        name: 'App 1.0'
      });
    })
    .end(done);
});

it('should include user in array', (done) => {
  request(app)
    .get('/users')
    .expect(200)
    .expect((res) => {
      expect(res.body)
        .toExist()
        .toInclude({name: 'Eduardo', age: 27});
    })
    .end(done);
});