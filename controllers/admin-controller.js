'use strict';

let express = require('express');
let adminRouter = express.Router();

adminRouter.get('/login', (request, response) => {
  response.render('admin/login');
});

adminRouter.get('/', (request, response) => {
  response.render('admin/index');
});

module.exports = adminRouter;
