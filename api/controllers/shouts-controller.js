"use strict";

let express = require('express');
let shoutsController = express.Router();
let tokenVerfier = require('../middlewares/token-verifier');
let parameters = require('../utils/parameters');
let ShoutService = require('../services/shout-service');

shoutsController.post('/', tokenVerfier, function (request, response) {
  let shoutService = new ShoutService(request.decoded);
  params = parameters.permit(request.body, ['body']);
  shoutService.create(params, function (err, doc) {
    if (err) {
      response.status(422).json(err);
    } else {
      response.status(201).json(doc);
    }
  });
});

module.exports = shoutsController;
