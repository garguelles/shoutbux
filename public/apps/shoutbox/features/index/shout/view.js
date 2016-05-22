import {ItemView} from 'backbone.marionette';
import tpl from './template';

export default ItemView.extend({
  template: tpl,

  className: 'post-shout',

  initialize() {
    this.characterCount = 0;
    this.maxCharacters = 34;
  },

  templateHelpers() {
    return {
      remainingCharacters: 34
    }
  },

  ui: {
    shoutTextArea: 'textarea.shout',
    postShoutButton: 'button.post-shout',
    remainingChars: '.remaining-characters'
  },

  events: {
    'keyup @ui.shoutTextArea': 'countCharacters'
  },

  countCharacters(ev) {
    let length = ev.target.value.length;
    this.ui.remainingChars.text(this.maxCharacters - length);
  }
});
