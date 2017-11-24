process.env.NODE_ENV = 'production';

const request = require('supertest');
const app = require('../index');

describe('GET /', () => {
  it('responds with 200', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end(done);
  });
});

describe('GET /api/messages', () => {
  it('responds with JSON', (done) => {
    request(app)
      .get('/api/messages')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done);
  });
});

