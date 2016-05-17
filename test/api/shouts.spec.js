"use strict";

let request = require('supertest');
let should = require('should');
let tokenHelper = require('../helpers/token');

describe('Shouts', function (done) {

  let server = {};
  let token = '';
  let shoutId = '';
  const UPDATED_SHOUT = 'updated shout';

  beforeEach(function () {
    delete require.cache[require.resolve('../../bin/www')];
    server = require('../../bin/www');
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

  it('responds to POST /shouts', function(done) {
    request(server)
      .post('/shouts')
      .set('Content-Type', 'application/json')
      .set('x-access-token', token)
      .send({
        'shout': 'A sample shout'
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        console.log(res);
        res.boody.should.be.an.Object;
      })
      .end(function (err, response) {
        console.log("ERROR", err);
        if (err) return done(err)
        done();
      });

  });

  it('responds to PUT /shouts', function (done) {
    request(server)
      .put(`/shouts/${shoutId}`)
      .send({
        'shout': UPDATED_SHOUT
      })
      .expect(204)
      .end(function (err, response) {
        if (err) return done(err)
        done();
      });
  });

  it('responds to DELETE /shouts', function (done) {
    request(server)
      .delete(`shouts/${shoutId}`)
      .send({})
      .expect(204)
      .end(function (err, response) {
        if (err) return done(err)
        done();
      });
  })

});
