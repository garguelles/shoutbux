'use strict';

let request = require('supertest');
let should = require('should');
let tokenHelper = require('../../helpers/token')

describe('User Session', function() {

  let server = {};
  let token = '';
  let shoutId = '';

  beforeEach(function () {
    delete require.cache[require.resolve('../../../bin/www')];
    server = require('../../../bin/www');
  });

  afterEach(function (done) {
    server.close(done)
  });

  before(function (done) {
    tokenHelper.createAccessToken(function (err, res) {
      if (err) throw new Error(err);
      token = res;
      done();
    });
  });

  it('responds to GET /me', function (done) {
    request(server)
      .get('/me')
      .set('Content-Type', 'application/json')
      .set('x-access-token', token)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        res.body.should.not.be.empty();
        res.body.should.be.an.Object();
        res.body.should.have.properties(['shouts', 'user']);
      })
      .end(function (err) {
        if (err) return done(err)
        done()
      })
  });

  it('responds to GET /me/shouts', function (done) {
    request(server)
      .get('/me/shouts')
      .set('Content-Type', 'application/json')
      .set('x-access-token', token)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        res.body.should.be.an.Array;
      })
      .end(function (err) {
        if (err) return done(err)
        done()
      });
  });
});