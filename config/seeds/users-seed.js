'use strict';

var UserModel = require('../../api/v1/models/user');

module.exports = {

  seed() {

    let user = new UserModel({
      firstName: 'Francis',
      lastName: 'Zamora',
      username: 'fz',
      email: 'fz@gmail.com',
      password: 'password'
    });

    user.save((err) => {
      if (err) throw err;
      console.log('admin user created');
    });

  }

};
