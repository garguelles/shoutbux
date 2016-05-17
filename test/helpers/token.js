'use strict';

let AuthService = require('../../api/services/auth-service');

module.exports = {
  createAccessToken(callback) {
    let credentials = {
      username: 'gerard@shoutbux.com',
      password: 'password'
    };

    AuthService.createAccessToken(credentials, (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    });
  }
}
