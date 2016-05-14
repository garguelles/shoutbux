"use strict";

let express = require('express');
let testController = express.Router();
let User = require('../models/user');

testController.get('/', function (request, response) {
  /*let user = new User({
    firstName: 'gerard',
    lastName: 'arguelles',
    email: 'gerard@shoutbux.com',
    username: 'gerard@shoutbux.com',
    password: 'password'
  });

  user.save()

    .then(function () {
      response.status(200).json({ test: 'ok' });
    })

    .catch(function (err) {
      response.status(422).json({ error: err });
    });*/
  response.status(200).json({ test: 'ok' });
});

module.exports = testController;
