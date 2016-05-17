let Shout = require('../models/shout');
let _ = require('lodash');
let Service = require('./base-service');

class ShoutService extends Service {

  constructor(currentUser, params) {
    super(currentUser, params)
  }

  /*
   * define params
   */
  _parmittedParams() {
    return ['body']
  }

  /*
   * create shout
   */
  create(callback) {
    let shout = new Shout(this.params);
    shout.userId = currentUser._id; // shout owner
    shout.save((err, doc, rowsAffected) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, doc.toObject());
    });
  }
};

module.exports = ShoutService;
