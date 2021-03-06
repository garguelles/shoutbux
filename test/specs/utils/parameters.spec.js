'use strict';

let _ = require('lodash');
let should = require('should');
let parameters = require('../../../api/utils/parameters');
let params = { updatedAt: new Date(), body: 'a shout', something: 'not good' };

describe('Utils - Parameters', function (done) {
  it('removes un-permitted parameters', (done) => {
    let result = parameters.permit(params, ['body']);
    result.should.not.have.property('something');
    result.should.not.have.property('updatedAt');
    result.should.have.property('body');
    done();
  });
});
