'use strict';

let mongoose = require('mongoose');
let passwords = require('../utils/passwords');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    unique: true
  },
  password: String,
  passwordSalt: String
});

/*
 * @Description: Authenticates user based on username and hashed password
 * @Param: { credentials:object }
 * @Return: Promise
 *
 */
UserSchema.statics.authenticate = function (params) {

  return new Promise((resolve, reject) => {
    this.findOne({ username: params.username }).lean().exec(function (err, user) {
      if (err) {
        reject(err, null);
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

/**********************************
 * Hooks
 *********************************/

/**
 * @Description: hash password and set password salt
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
