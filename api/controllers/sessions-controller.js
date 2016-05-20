'use strict';

let express = require('express');
let sessionsController = express.Router();
let SessionService = require('../services/session-service');
let tokenVerifier = require('../middlewares/token-verifier');

/*
 * GET /me
 */
sessionsController.get('/', tokenVerifier, function (request, response) {
  let sessionService = new SessionService(request.decoded);
  sessionService.getUserData((err, result) => {
    if (err) {
      response.status(500).json({ error: 'something went wrong' });
    }
    else {
      response.status(200).json(result);
    }
  });
});

/*
 * GET /me/shouts
 */
sessionsController.get('/shouts', tokenVerifier, function (request, response) {
  let sessionService = new SessionService(request.decoded);
  sessionService.shouts((err, documents) => {
    if (err) {
      response.status(500).json({ error: 'something went wrong' });
    } else {
      response.status(200).json(documents);
    }
  });
});

/*
 * GET /me/timeline
 */
sessionsController.get('/timeline', tokenVerifier, function(request, response) {
  let sessionService = new SessionService(request.decoded);
  sessionService.timeline((err, shouts) => {
    if (err) {
      response.status(500).json({ error: 'something went wrong' });
    } else {
      response.status(200).json(shouts);
    }
  });
});

module.exports = sessionsController;
