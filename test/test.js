process.env.NODE_ENV = 'production';

const request = require('supertest');
const app = require('../index');

describe('/ Route', () => {
  test('it should respond OK to GET requests', () => {
    request(app).get('/').then(res => (
      expect(res.statusCode).toBe(200)
    ));
  });
});

describe('/api/messages Route', () => {
  test('it should respond OK to GET requests', () => {
    request(app).get('/api/messages').then(res => (
      expect(res.statusCode).toBe(200)
    ));
  });
  test('it should respond with json', () => {
    request(app).get('/api/messages').then(res => (
      expect(res.type).toBe('application/json')
    ));
  });
});
