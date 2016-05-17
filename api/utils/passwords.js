'use strict';

let bcrypt = require('bcryptjs');

module.exports = {

  /**
   *  hash password using password+salt
   *  @params {string} password - user password
   **/
  hash(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            reject(err);
          } else {
            resolve({ salt, hash });
          }
        });
      });
    });
  },

  /*
   * hash password synchronously
   * @param {string} password - user password
   * @param {string} salt - generated salt
   */
  hashSync(password, salt) {
    return bcrypt.hashSync(password, salt);
  },

  /*
   * compare hashed and user entered password
   * @param {string} password - user password
   * @param {string} hash - hashed user password
   *
   */
  compare(password, hash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err, result) => {
        if (err)
          reject(err);
        else
          resolve(result)
      });
    });
  }
};
