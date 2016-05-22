import {ItemView} from 'backbone.marionette';
import tpl from './template';

export default ItemView.extend({
  template: tpl,

  className: 'post-shout',

  modelEvents: {
    'invalid': '_renderFlash',
    'error': '_onPostError',
    'sync': '_onShoutPosted'
  },

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
    remainingChars: '.remaining-characters',
    flash: '.alert-danger'
  },

  events: {
    'keyup @ui.shoutTextArea': '_countCharacters',
    'click @ui.postShoutButton': '_postShout'
  },

  _countCharacters(ev) {
    let length = ev.target.value.length;
    this.ui.remainingChars.text(this.maxCharacters - length);
  },

  _renderFlash(model, response, options) {
    this.ui.flash.removeClass('hidden');
    this.ui.flash.text(response);
  },

  _postShout() {
    let body = this.ui.shoutTextArea.val();
    this.model.set({ body });
    this.model.save();
  },

  _onShoutPosted() {
    this.ui.flash.addClass('hidden');
    this.ui.shoutTextArea.val('');
  },

  _onPostError(model, response, options) {
    this.ui.flash.removeClass('hidden');
    this.ui.flash.text(response.body);
  }
});
