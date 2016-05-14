'use strict';

let jwt = require('jsonwebtoken');
let User = require('../models/user');

let authService = {

  createAccessToken(credentials, callback) {
    User.authenticate(credentials).then(function (user) {
      _user = this._sanitize(user);
      let token = jwt.sign(_user, process.env.JWT_SECRET, {
        expiresIn: '30 days'
      });
      callback(null, token);
    }).catch(function (err) {
      callback(err, null);
    });
  },

  _sanitize(user) {
    delete user.password;
    delete user._id
    return user;
  }

};

module.exports = authService;
