"use strict";

let express = require('express');
let testController = express.Router();
let User = require('../models/user');
let tokenVerifier = require('../middlewares/token-verifier');

testController.get('/', function (request, response) {
  response.status(200).json({ test: 'ok' });
});

testController.get('/protected', tokenVerifier, function (request, response) {
  response.status(200).json({ test: 'ok' });
});

module.exports = testController;
