"use strict";

let authController = require('../api/controllers/auth-controller');
let pagesController = require('../controllers/pages-controller')

class RoutesInitializer {

  constructor(app) {
    this.app = app
  }

  /*
   * registers pages routes routes
   */
  registerRoutes() {
    this.app.use('/', pagesController);
    return this;
  }

  /*
   * register api routes
   */
  registerAPIRoutes() {
    this.app.use('/auth', authController);
    return this;
  }

}

module.exports = RoutesInitializer
