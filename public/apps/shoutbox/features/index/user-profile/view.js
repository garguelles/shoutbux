import {ItemView} from 'backbone.marionette';
import tpl from './template.jade';

export default ItemView.extend({
  template: tpl,

  modelEvents: {
    'sync': 'render'
  },

  templateHelpers() {
    let user = this.model.get('user') || {};
    return {
      fullname: `${user.firstName} ${user.lastName}`
    }
  }
});
