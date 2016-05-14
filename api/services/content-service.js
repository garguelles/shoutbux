'use strict';

var Content = require('../models/content');

class ContentService {

  getAll() {

    Content.all()

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

  update() {

  }

};

module.exports = {

  createInstance() {
    return new ContentService();
  }

};
