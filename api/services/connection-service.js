'use strict';

let Service = require('./base-service');
let User = require('../models/user');

class ConnectionService extends Service {

  constructor(currentUser) {
    super(currentUser);
  }

  /*
   * get all users you are following
   * @param {function} callback - callback method
   */
  following(callback) {
    User.following(this.currentUser._id, (err, documents) => {
      if (err) return callback(err, null);
      callback(null, documents);
    });
  }

  /*
   * get all your followers
   * @param {function} callback - calback method
   */
  followers(callback) {
    User.followers(this.currentUser._id, (err, documents) => {
      if (err) return callback(err, null);
      callback(null, documents);
    });
  }

  /*
   * follow a user
   * @param {string} username - username of the user you want to follow
   */
  follow(username, callback) {

  }

  /*
   * unfollow a user
   * @param {string} username - username of the user you want to unfollow
   */
  unfollow(username, callback) {

  }
}
