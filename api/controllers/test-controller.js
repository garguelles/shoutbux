"use strict";

let express = require('express');
let testController = express.Router();

testController.get('/', function (request, response) {
  response.status(200).json({ test: 'ok' });
});

module.exports = testController;
