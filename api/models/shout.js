'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ShoutSchema = new Schema({
  body: {
    type: String,
    required: true,
    maxlength: [34, 'shout cannot exceed 34 characters']
  },
  user: {
    type: String,
    ref: 'User',
    required: true,
    index: true
  }
}, {
  timestamps: true
});

/*******************
* Statics Methods
********************/

ShoutSchema.statics.timeline = function(usernames, callback) {
  this.find({ user: { $in: usernames } })
    .populate('user', '_id username firstName lastName')
    .sort('createdAt')
    .exec((err, shouts) => {
      if (err) return callback(err, null);
      callback(null, shouts);
    });
};

let ShoutModel = mongoose.model('Shout', ShoutSchema);
module.exports = ShoutModel;
