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
    // get current user
    User.findById(this.currentUser._id, (err, currentUser) => {
      if (err) return callback(err, null)
      currentUser.follow(username, (_err, followedUser) => {
        if (_err) return callback(_err, null)
        // add follower - this user
        followedUser.addFollower(this.currentUser._id, (__err) => {
          if (__err) return callback(__err, null)
          // return followed user
          callback(null, followedUser);
        })
      });
    });

    /*
    User.follow(username, (err, user) => {
      if (err) return callback(err, null);
      User.findById(username, (_err, doc) => {
        if (_err) return callback(_err, null);

      });
      callback(null, user);

    });*/
  }

  /*
   * unfollow a user
   * @param {string} username - username of the user you want to unfollow
   */
  unfollow(username, callback) {

  }
}

module.exports = ConnectionService;
