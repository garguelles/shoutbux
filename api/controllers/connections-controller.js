'use strict';

let express = require('express');
let connectionsController = express.Router();
let ConnectionService = require('../services/connection-service');
let tokenVerifier = require('../middlewares/token-verifier');

/*
 * GET /connections/followers
 */
connectionsController.get('/followers', tokenVerifier, function (request, response) {
  let connectionService = new ConnectionService(request.decoded);
  connectionService.followers((err, result) => {
    if (err) {
      response.status(500).json({ error: 'something went wrong' });
    } else {
      response.status(200).json(result.followers);
    }
  });
});

/*
 * GET /connections/following
 */
connectionsController.get('/following', tokenVerifier, function(request, response ) {
  let connectionService = new ConnectionService(request.decoded);
  connectionService.following((err, result) => {
    if (err) {
      response.status(500).json({ error: 'something went wrong' });
    } else {
      response.status(200).json(result.following);
    }
  });
});

/*
 * POST /connections/following
 */
connectionsController.post('/following', tokenVerifier, function(request, response) {
  let connectionService = new ConnectionService(request.decoded);
  connectionService.follow(request.body.username, (err, followedUser) => {
    if (err) {
      response.status(500).json({ error: 'something' });
    } else {
      response.status(200).json(followedUser);
    }
  });
});

module.exports = connectionsController;
