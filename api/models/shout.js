'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ShoutSchema = new Schema({
  body: {
    type: String,
    required: true,
    maxlength: [34, 'shout cannot exceed 34 characters']
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true
  }
}, {
  timestamps: true
});

let ShoutModel = mongoose.model('Shout', ShoutSchema);
module.exports = ShoutModel;
