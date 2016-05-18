'use strict';

let Shout = require('../models/shout');
let Service = require('../services/base-service');

class SessionService extends Service {

  constructor(currentUser) {
    super(currentUser);
  }

  /*
   * Loads initial data
   * @param {function} callback - callback method
   */
  getUserData(callback) {
    let data = {};
    data.user = this.currentUser;
    Shout.find({ userId: this.currentUser._id }).lean().exec((err, documents) => {
      if (err) return callback(err, null);
      data.shouts = documents;
      callback(null, data);
    });
  }

  /*
  * Get shouts posted by user
  *
  */
  shouts(callback) {
    Shout.find({ userId: this.currentUser._id }).lean().exec((err, documents) => {
      if (err) return callback(err, null);
      data.shouts = documents;
      callback(null, data);
    });
  }
}

module.exports = SessionService;
