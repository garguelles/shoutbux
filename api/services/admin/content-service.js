'use strict';

var Content = require('../../models/content');

module.exports = {

  getAll(callback) {

    Content.find({}, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });

  },

  create(content, callback) {

    var content = new Content(content);

    content.save((err) => {
      if (err)
        callback(err, null);
      else
        callback(null, content);
    });

  },

  update(name, params, callback) {

    Content.findOneAndUpdate({ name }, {
      description: params.description,
      text: params.text
    }, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });

  }

};
