"use strict";

let request = require('supertest');
let should = require('should')

describe('Authentication', function (done) {
  let server = {};
  let token = '';

  before(function () {
    delete require.cache[require.resolve('../../../bin/www')];
    server = require('../../../bin/www');
  });

  after(function (done) {
    server.close(done)
  });

  it('responds to /test', function (done) {
    request(server)
      .get('/test')
      .set('Content-Type', 'application/json')
      .expect(200)
      .expect(function(response) {
        response.body.should.have.property('test');
      })
      .expect('Content-Type', /json/)
      .end(function (err, response) {
        if (err) return done(err)
        done();
      });
  });

  it('responds to /auth/token', function (done) {
    request(server)
      .post('/auth/token')
      .set('Content-Type', 'application/json')
      .set('Accept', /application\/json/)
      .send({
        "username": "gerardarguelles",
        "password": "password"
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        res.body.should.be.an.Object;
        res.body.should.have.property('token');
        token = res.body.token;
      })
      .end(function(err, res) {
        if (err) return done(err)
        done();
      })
  });

  it('[with token] allow access to protected endpoints - GET /protected', function (done) {
    request(server)
      .get('/test/protected')
      .set('Content-Type', 'application/json')
      .set('x-access-token', token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, response) {
        if (err) return done(err)
        done();
      });
  });

  it('[without token] restrict access to protected endpoints - GET /protected', function (done) {
    request(server)
      .get('/test/protected')
      .set('Content-Type', 'application/json')
      .expect(403)
      .expect('Content-Type', /json/)
      .end(function (err, response) {
        if (err) return done(err)
        done();
      });
  });

});
