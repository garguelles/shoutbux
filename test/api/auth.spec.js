"use strict";

request = require('supertest');

describe('Authentication', function (done) {
  let server = {};
  let token = '';

  beforeEach(function () {
    delete require.cache[require.resolve('../../bin/www')]
  });

  afterEach(function (done) { server.close(done) });
});
/*
describe 'Authentication', ->
  server = {}
  token = ""

  beforeEach ->
    @timeout 5000
    delete require.cache[require.resolve('../../bin/www')]
    server = require('../../bin/www')

  afterEach (done) ->
    server.close(done)

  it 'reponds to /auth/token', (done) ->
    @timeout 5000
    request(server)
      .post('/auth/token')
      .set('Content-Type', 'application/json')
      .send(
        "username": "admin@fem.com"
        "password": "administrator"
      )
      .set('Accept', /application\/json/)
      .expect(200)
      .expect((res) ->
        res.body.should.have.property(['token'])
        token = res.body.token
      )
      .expect('Content-Type', /json/)
      .end((err, res) ->
        return done(err) if err
        done()
      )


  it 'allows access to protected resource', (done) ->
    request(server)
      .get('/test/protected')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) ->
        return done(err) if err
        done()
      )

  it 'rejects access to protected resources without a token', (done) ->
    request(server)
      .get('/test/protected')
      .expect(403)
      .end((err, res) ->
        return done(err) if err
        done()
      )
*/
