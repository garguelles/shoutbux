import $ from 'jquery';

class LoginModel {

  constructor(credentials) {
    this.username = credentials.username;
    this.password = credentials.password;
  }

  authenticate() {

    return new Promise((resolve, reject) => {

      if (!this._isValid()) return reject({ errorMessage: 'Invalid Credentials' });

      $.post('/auth/token', this.toObject()).then((response) => {
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
  // if none exists show form
  if (localStorage.getItem('accessToken'))
    window.location.href = '/';
  else
    $('.login-form').css('visibility', 'visible');

  let alert = $('.alert-danger');
  let loginLabel = $('span.login');
  let spinner = $('.fa-spin')

  $('#loginButton').click( (ev) => {
    let $target = $(ev.target);
    let username = $('[name="username"]').val();
    let password = $('[name="password"]').val();
    let loginModel = new LoginModel({ username , password });

    loginLabel.addClass('hidden');
    spinner.removeClass('hidden');


    loginModel.authenticate()
      .then((response) => {
        localStorage.setItem('accessToken', response.token);
        window.location.href = '/';
      })
      .catch((error) => {
        let msg = '';

        if (error.responseText) {
          msg = JSON.parse(error.responseText).errorMessage;
        } else {
          msg = error.errorMessage;
        }

        alert.removeClass('hidden').html(msg);
        loginLabel.removeClass('hidden');
        spinner.addClass('hidden');
      });
  });

})();
