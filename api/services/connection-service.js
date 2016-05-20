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
      currentUser.follow(username, (err, followedUser) => {
        if (err) return callback(err, null)
        // add follower - this user
        followedUser.addFollower(this.currentUser._id, (err) => {
          if (err) return callback(err, null)
          // return followed user
          callback(null, followedUser);
        })
      });
    });
  }

  /*
   * unfollow a user
   * @param {string} username - username of the user you want to unfollow
   */
  unfollow(username, callback) {
    // get current user
    User.findById(this.currentUser._id, (err, currentUser) => {
      if (err) return callback(err, null);
      currentUser.unfollow(username, (err) => {
        if (err) return callback(err);
        // remove follower
        User.findById(username, (err, unfollowedUser) => {
          unfollowedUser.removeFollower(currentUser._id, (err) => {
            if (err) return callback(err, null);
            callback(null);
          })
        });
      });
    });
  }
}

module.exports = ConnectionService;
