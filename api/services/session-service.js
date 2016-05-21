'use strict';

let Shout = require('../models/shout');
let User = require('../models/user');
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
    Shout.find({ user: this.currentUser._id }).lean().exec((err, documents) => {
      if (err) return callback(err, null);
      data.shouts = documents;
      User.stats(this.currentUser._id, (err, stats) => {
        if (err) return callback(err, null);
        data.stats = stats;
        data.stats.shouts = documents.length;
        callback(null, data);
      });
    });
  }

  /*
   * Get shouts posted by user
   * @param {function} callback - callback method
   */
  shouts(callback) {
    Shout.find({ userId: this.currentUser._id }).lean().exec((err, documents) => {
      if (err) return callback(err, null);
      callback(null,documents);
    });
  }

  /*
   * Get User timeline
   * @param {function} callback - callback method
   */
  timeline(callback) {
    User.findById(this.currentUser._id, (err, user) => {
      if (err) return callback(err, null);
      let usernames = user.following;
      usernames.push(user._id);
      Shout.timeline(usernames, (err, shouts) => {
        if (err) return callback(err, null);
        callback(null, shouts);
      });
    });
  }
}

module.exports = SessionService;
