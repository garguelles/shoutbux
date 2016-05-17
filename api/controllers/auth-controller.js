'use strict';

let express = require('express');
let authController = express.Router();
let AuthService = require('../services/auth-service');

/*
 * POST /auth/token
 */
authController.post('/token', function (request, response) {
  AuthService.createAccessToken({
    username: request.body.username,
    password: request.body.password
  }, function (err, token) {
    if (err) {
      response.status(403).json({ errorMessage: err });
    } else {
      response.status(200).json({ token });
    }
  });

});

module.exports = authController;
