'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ShoutSchema = new Schema({
  body: {
    type: String,
    required: true,
    maxLength: 34
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true
  }
}, {
  timestamps: true
});

let ShoutModel = mongoose.Model('Shout', ShoutSchema);
module.exports = ShoutModel;
