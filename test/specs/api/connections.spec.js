'use strict';

let request = require('supertest');
let should = require('should');
let tokenHelper = require('../../helpers/token');
let User = require('../../../api/models/user');

describe('Connections', function () {

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

  /*
  * Get Followers
  */
  it('responds to GET /connections/followers', function (done) {
    request(server)
    .get('/connections/followers')
    .set('Content-Type', 'application/json')
    .set('x-access-token', token)
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(function (res) {
      res.body.should.be.an.Array;
    })
    .end(function (err, response) {
      if (err) return done(err)
      done();
    });
  });

  /*
  * Get Following
  */
  it('responds to GET /connections/following', function (done) {
    request(server)
    .get('/connections/following')
    .set('Content-Type', 'application/json')
    .set('x-access-token', token)
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(function (res) {
      res.body.should.be.an.Array;
    })
    .end(function (err, response) {
      if (err) return done(err)
      done();
    });
  });

  /*
  * follow request
  */
  it('responds to POST /connections/following', function (done) {
    request(server)
    .post('/connections/following')
    .set('Content-Type', 'application/json')
    .set('x-access-token', token)
    .send({
      username: 'tompaine'
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(function (res) {
      console.log(res.body);
      res.body.should.be.an.Object;
      res.body.should.have.properties(['firstName', 'lastName', 'username']);
    })
    .end(function (err, response) {
      if (err) return done(err)
      done();
    });
  });

  /*
  * unfollow
  */
  it('responds to PUT /connections/following', function (done) {
    request(server)
    .put('/connections/following')
    .set('Content-Type', 'application/json')
    .set('x-access-token', token)
    .send({
      username: 'anotheruser'
    })
    .expect(204)
    .expect('Content-Type', /json/)
    .expect(function (res) {
      res.body.should.be.an.Object;
      res.body.should.have.properties(['firstName', 'lastName', 'username']);
    })
    .end(function (err, response) {
      if (err) return done(err)
      done();
    });
  });
});
