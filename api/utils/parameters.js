'use strict';

let _ = require('lodash');

module.exports = {

  /*
   * sanitize parameters
   * @param {object} params - request.body
   * @param {array} permittedParams - array of permitted keys
   */
  permit(params, permittedParams) {
    let permitted = permittedParams;
    if (_.isEmpty(permitted)) {
      return params;
    } else {
      return _.pick(params, permitted);
    }
  }

}
