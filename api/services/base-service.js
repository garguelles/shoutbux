'use strict';

let _ = require('lodash');

class Service {
  constructor(currentUser) {
    this.currentUser = currentUser || {};
  }
}

module.exports = Service
