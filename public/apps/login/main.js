import $ from 'jquery';

class LoginModel {

  constructor(credentials) {
    this.username = credentials.username;
    this.password = credentials.password;
  }

  authenticate() {

    return new Promise((resolve, reject) => {

      if (!this._isValid()) return reject({ errorMessage: 'Invalid Credentials' });

      $.post('/v1/auth/token', this.toObject()).then((response) => {
        resolve(response);
      }).fail((xhr, textStatus, errorThrown) => {
        reject(xhr);
      });

    });

  }

  _isValid() {
    return !(this.username === '' || this.password === '');
  }

  toObject() {
    return { username: this.username, password: this.password };
  }

};

export default (() => {

  // check if accessToken exists
  // login form is not show by default check access token first
  // if none exists show form
  if (localStorage.getItem('accessToken'))
    window.location.href = '/admin';
  else
    $('.login-form').css('visibility', 'visible');

  $('#loginButton').click( (ev) => {

    let username = $('[name="username"]').val();
    let password = $('[name="password"]').val();

    let loginModel = new LoginModel({ username , password });

    loginModel.authenticate()
      .then((response) => {
        localStorage.setItem('accessToken', response.token);
        window.location.href = '/admin';
      })
      .catch((error) => {
        console.log(error);
      });

  });

})();
