'use strict';

let request = require('supertest');
let should = require('should');
let tokenHelper = require('../../helpers/token');
let Shout = require('../../../api/models/shout');
const INVALID_SHOUT = 'If other is a function check if this function throws AssertionError on given object or return false - it will be assumed as not matched';
const UPDATED_SHOUT = 'updated shout';

describe('Shouts', function() {

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

  it('responds to POST /shouts', function(done) {
    request(server)
    .post('/shouts')
    .set('Content-Type', 'application/json')
    .set('x-access-token', token)
    .send({
      'body': 'A sample shout'
    })
    .expect(201)
    .expect('Content-Type', /json/)
    .expect(function (res) {
      res.body.should.be.an.Object;
      res.body.should.have.property('_id');
      shoutId = res.body._id;
    })
    .end(function (err, response) {
      if (err) return done(err)

      done();
    });

  });

  it('responds to PUT /shouts', function (done) {
    request(server)
    .put(`/shouts/${shoutId}`)
    .set('Content-Type', 'application/json')
    .set('x-access-token', token)
    .send({
      'body': UPDATED_SHOUT
    })
    .expect(204)
    .expect(function (res) {
      res.body.should.be.empty();
    })
    .end(function (err, response) {
      if (err) return done(err)
      done();
    });
  });

  it('should validate shout length', function (done) {
    Shout.findOneAndUpdate({
      _id: shoutId
    }, { body: INVALID_SHOUT }, { runValidators: true }, (err, doc) => {
      // should throw an error
      err.should.not.be.empty();
      done();
    });
  });

  it('properly updates the \'shout\' ', function (done) {
    Shout.findOne({ _id: shoutId }).lean().exec((err, doc) => {
      if (err) return done(err);
      doc.body.should.be.eql(UPDATED_SHOUT);
      done();
    });
  });

  it('responds to DELETE /shouts', function (done) {
    request(server)
    .delete(`/shouts/${shoutId}`)
    .set('x-access-token', token)
    .send()
    .expect(204)
    .end(function (err, response) {
      if (err) return done(err)
      done();
    });
  })

});
