var express = require('express');
var pagesRouter = express.Router();
var tokenVerifier = require('../api/middlewares/token-verifier');

pagesRouter.get('/', function (request, response) {
  response.render('index');
});

pagesRouter.get('/login', function (request, response) {
  response.render('login');
});


module.exports = pagesRouter;
