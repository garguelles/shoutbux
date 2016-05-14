var express = require('express');
var pagesRouter = express.Router();

pagesRouter.get('/', function (request, response) {
  response.render('index');
});


module.exports = pagesRouter;
