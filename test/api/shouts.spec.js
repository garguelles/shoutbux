"use strict";

let request = require('supertest');
let should = require('should');

describe('Shouts', function (done) {

  let server = {};
  let token = '';

  beforeEach(function () {
    delete require.cache[require.resolve('../../bin/www')];
    server = require('../../bin/www');
  });

  afterEach(function (done) {
    server.close(done)
  });


  it('responds to POST /shouts', function(done) {
    request(server)
      .post('/shouts')
      .set('Content-Type', 'application/json')
      .send({
        'shout': 'A sample shout'
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        res.boody.should.be.an.Object;
      })
      .end(function (err, response) {
        if (err) return done(err)
        done();
      });

  });

});
