import {ItemView} from 'backbone.marionette';
import tpl from './template.jade';

export default ItemView.extend({
  template: tpl,

  modelEvents: {
    'invalid': '_onValidationError'
  },

  templateHelpers() {
    let user = this.model.get('user') || {};
    return {
      username: user.username,
      fullname: `${user.firstName} ${user.lastName}`
    };
  },

  initialize() {
    this.user = localStorage.getItem('user');
  },

  ui: {
    'shoutBody': '.shout-body',
    'editShout': '.edit',
    'dismissShout': '.dismiss'
  },

  events: {
    'click @ui.editShout': '_toggleEditState',
    'keydown @ui.shoutBody': '_updateShout',
    'click @ui.dismissShout': '_removeShout'
  },

  _toggleEditState() {
    if (this.user == this.model.get('user')._id) {
      this.ui.shoutBody.attr('contenteditable', true).focus();
    } else {
      alert('cannot edit shouts that is not yours');
    }
  },

  _updateShout(ev) {
    if (ev.keyCode == 13) {
      ev.preventDefault();
      this.ui.shoutBody.removeAttr('contenteditable');
      let body = this.ui.shoutBody.text();
      this.model.set({ body }).save().then(() => {
        alert('shout updated');
      });
    }
  },

  _removeShout() {
    if (this.user == this.model.get('user')._id) {
      this.model.destroy().then((response) => {
        alert('shout deleted');
      });
    } else {
      alert('cannot delete shouts that is not yours');
    }
  },

  _onValidationError(model, response) {
    alert(response);
  }
});
