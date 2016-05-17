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
   * @param {object} params - shout object
   * @param {function} callback - callback method
   */
  create(params, callback) {
    params = _.merge(params, { userId: this.currentUser._id });
    let shout = new Shout(params);
    shout.save((err, doc, rowsAffected) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, doc);
    });
  }

  /*
   * update shout
   * @param {object} params - shout object
   * @param {string} id - shout object id
   * @param {function} callback - callback method
   */
  update(params, id, callback) {
    Shout.findOneAndUpdate({
      _id: id,
      userId: this.currentUser._id
    }, params, { runValidators: true }, (err, doc) => {
      if (err) return callback(err, null);
      callback(null, doc);
    });
  }

  /*
   * delete shout
   * @param {string} id - shout object id
   * @param {function} callback - callback method
   */
  delete(id, callback) {
    Shout.findOneAndRemove({ _id: id }, function (err, doc) {
      if (err) return callback(err, null);
      callback(null, doc);
    });
  }
};

module.exports = ShoutService;
