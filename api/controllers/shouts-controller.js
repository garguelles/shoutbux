"use strict";

let express = require('express');
let shoutsController = express.Router();
let tokenVerifier = require('../middlewares/token-verifier');
let parameters = require('../utils/parameters');
let ShoutService = require('../services/shout-service');

/*
 * POST /shouts
 */
shoutsController.post('/', tokenVerifier, function (request, response) {
  let shoutService = new ShoutService(request.decoded);
  let params = parameters.permit(request.body, ['body']);
  shoutService.create(params, function (err, doc) {
    if (err) {
      response.status(422).json(err);
    } else {
      response.status(201).json(doc);
    }
  });
});

/*
 * PUT /shouts/:id
 */
shoutsController.put('/:id', tokenVerifier, function (request, response) {
  let shoutService = new ShoutService(request.decoded);
  let params = parameters.permit(request.body, ['body']);
  shoutService.update(params, request.params.id, (err, doc) => {
    if (err) {
      response.status(422).json(err);
    } else {
      response.status(204).json();
    }
  });
});

/*
 * DELETE /shouts/:id
 */
shoutsController.delete('/:id', tokenVerifier, function (request, response) {
  let shoutService = new ShoutService(request.decoded);
  shoutService.delete(request.params.id, (err, doc) => {
    if (err) {
      response.status(422).json(err);
    } else {
      response.status(204).json();
    }
  });
});

module.exports = shoutsController;
