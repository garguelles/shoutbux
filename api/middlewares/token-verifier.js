'use strict';

var jwt = require('jsonwebtoken');

module.exports = function(request, response, next) {
  // check token location
  let token = request.body.token || request.query.token || request.headers['x-access-token']
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        response.status(403).json({ errorMessage: 'Invalid Token' });
      request.decoded = decoded;
      next();
    });
  } else {
    response.status(403).json({ errorMessage: 'Invalid Token' });
  };
};
