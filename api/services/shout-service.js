'use strict';

let Shout = require('../models/shout');
let _ = require('lodash');
let Service = require('./base-service');

class ShoutService extends Service {

  /*
   * constructor
   * @param {object} currentUser - current logged in user
   */
  constructor(currentUser) {
    super(currentUser);
  }

  /*
   * create shout
   */
  create(params, callback) {
    let shout = new Shout(params);
    shout.userId = this.currentUser._id; // shout owner
    shout.save((err, doc, rowsAffected) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, doc);
    });
  }
};

module.exports = ShoutService;
