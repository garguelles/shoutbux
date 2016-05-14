'use strict';

/***
 * Auth Controller
 ***/

var express = require('express');
var router = express.Router();
var authService = require('../services/auth-service');

/**
 * POST /v1/auth/token
 **/
router.post('/token', function (request, response) {
  AuthService.createAccessToken({
    username: request.body.username,
    password: request.body.password
  }, function (err, token) {
    if (err) {
      response.status(403).json({ errorMessage: 'Invalid Credentials' });
    } else {
      response.status(200).json({ token });
    }
  });

});

module.exports = router;
