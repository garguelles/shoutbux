let _ = require('lodash');

class Service {

  constructor(currentUser = {}, params = {}) {
    this.params = this._sanitizeParams(params);
    this.currentUser = currentUser;
  }

  /*
   * abstract: return an array of accepted properties
   */
  permittedParams() { return [] }

  /*
   * allow only permitted parameters from request
   */
  _sanitizeParams() {
    let permitted = this.permittedParams();
    if (_.isEmpty(permitted)) {
      return this.params;
    } else {
      return _.pick(this.params, permitted);
    }
  }
}

module.exports = Service
