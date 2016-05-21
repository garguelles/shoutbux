import {ItemView} from 'backbone.marionette';
import tpl from './template.jade';

export default ItemView.extend({
  template: tpl,

  templateHelpers() {
    let user = this.model.get('user') || {};
    return {
      username: user.username,
      fullname: `${user.firstName} ${user.lastName}`
    };
  }
});
