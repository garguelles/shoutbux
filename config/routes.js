"use strict";

let pagesController = require('../controllers/pages-controller');

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
    this.app.use('/auth', require('../api/controllers/auth-controller'));
    this.app.use('/test', require('../api/controllers/test-controller'));
    this.app.use('/shouts', require('../api/controllers/shouts-controller'));
    this.app.use('/me', require('../api/controllers/sessions-controller'));
    return this;
  }

}

module.exports = RoutesInitializer
