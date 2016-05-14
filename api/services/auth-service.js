'use strict';

let jwt = require('jsonwebtoken');
let User = require('../models/user');

let authService = {

  createAccessToken(credentials, callback) {

    User.authenticate(credentials).then(function (user) {

      let token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '30 days'
      });

      callback(null, token);

    }).catch(function (err) {

      callback(err, null);

    });
  }

};

module.exports = authService;
