'use strict';

let _ = require('lodash');
let should = require('should');
let parameters = require('../../api/utils/parameters');
let params = { updatedAt: new Date(), body: 'a shout', something: 'not good' };

describe('Parameters', function (done) {

  it('removes un-permitted parameters', (done) => {
    let result = parameters.permit(params, ['body']);
    result.should.not.have.property('something');
    result.should.not.have.property('udatedAt');
    result.should.have.property('body');
    done();
  });
  
})
