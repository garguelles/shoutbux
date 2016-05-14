'use strict';

let bcrypt = require('bcryptjs');

module.exports = {

  /**
   *  @description: hash password using password+salt
   *  @params: password
   *  @returns { salt, hash }
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

  /**
   * @description: hash password synchronously
   * @params: password, salt
   * @returns: salt:string
   **/
  hashSync(password, salt) {
    return bcrypt.hashSync(password, salt);
  },

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
