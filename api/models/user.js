'use strict';

let mongoose = require('mongoose');
let passwords = require('../utils/passwords');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  _id: String,
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    unique: true,
    index: true
  },
  password: String,
  passwordSalt: String,
  followers: [{ type: String, ref: 'User' }],
  following: [{ type: String, ref: 'User' }]
});

/**********************************
* Static Methods
*********************************/

/*
* Authenticates user based on username and hashed password
* @param {object} params - contains username and password
*/
UserSchema.statics.authenticate = function (params) {
  return new Promise((resolve, reject) => {
    this.findOne({ username: params.username }).lean().exec(function (err, user) {
      if (err) {
        return reject(err, null);
      }
      if (user) {
        passwords.compare(
          params.password,
          user.password
        ).then(function(result) {
          if (result) {
            resolve(user);
          }
          else {
            reject("Invalid Credentials");
          }
        }).catch(function(err) {
          reject(err);
        });
      } else {
        reject("Invalid Credentials");
      }
    });
  });
};

/*
* Get all users this account is following
* @param {string} id - user ObjectId
* @param {function} callback - callback method
*/
UserSchema.statics.followers = function(id, callback) {
  this.findById(id)
  .populate('followers', 'firstName lastName')
  .select('followers')
  .lean()
  .exec((err, documents) => {
    if (err) return callback(err, null);
    callback(null, documents);
  });
};

/*
* Get all users this account is following
* @param {string} id - user ObjectId
* @param {function} callback - callback method
*/
UserSchema.statics.following = function(id, callback) {
  this.findById({ _id: id })
  .populate('following', 'firstName lastName')
  .select('following')
  .lean()
  .exec((err, documents) => {
    if (err) return callback(err, null);
    callback(null, documents);
  });
};


/**********************************
* Instance Methods
*********************************/
UserSchema.methods.follow = function(id, callback) {
  this.model('User').findById(id, (err, userToFollow) => {
    if (err) return callback(err, null);
    this.following.push(userToFollow._id);
    this.save((_err, doc) => {
      if (err) return callback(err, null)
      // return user to follow
      callback(null, userToFollow);
    });
  });
};

UserSchema.methods.addFollower = function(id, callback) {
  this.followers.push(id);
  this.save((err, doc) => {
    if (err) return callback(err, null);
    callback(null, this);
  });
};

/**********************************
* Hooks
*********************************/

/**
* hash password and set password salt
*/
UserSchema.pre('save', function(next) {
  passwords.hash(this.password)
  .then((result) => {
    this.password = result.hash;
    this.passwordSalt = result.salt;
    next();
  })
  .catch((err) => {
    next(new Error(err));
  });
});


let UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
