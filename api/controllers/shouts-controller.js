"use strict";

let express = require('express');
let shoutsController = express.Router();
let tokenVerfier = require('../middlewares/token-verfier');
let ShoutService = require('../services/shout-service');

shoutsController.post('/', tokenVerfier, function (request, response) {
  let shoutService = new ShoutService(request.decoded, );
  shoutService.create(request.body, function (err, doc) {
    if (err) {
      response.status(422).json(err);
    } else {
      response.status(201).json(doc);
    }
  });
});

module.exports = shoutsController;
