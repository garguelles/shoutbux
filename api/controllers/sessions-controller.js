'use strict';

let express = require('express');
let sessionsController = express.Router();
let SessionService = require('../services/session-service');

/*
 * GET /me
 */
sessionsController.get('/', function (request, response) {
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
sessionsController.get('/shouts', function (request, response) {
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
 *
 */

module.exports = sessionsController;
