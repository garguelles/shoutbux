import _ from 'lodash'
import {history} from 'backbone'
import {ItemView} from 'backbone.marionette'
import tpl from './template.jade'

export default ItemView.extend({
  template: tpl,

  tagName: 'nav',
  className: 'header navbar navbar-default navbar-fixed-top',

  attributes: {
    role: 'navigation'
  },

  collectionEvents: {
    all: 'render'
  },

  ui: {
    collapse: '#navbar-collapse',
    logoutButton: 'a.logout'
  },

  events: {
    'click @ui.logoutButton': 'logout'
  },

  templateHelpers() {
    return {
      menus: this.collection.toJSON()
    }
  },

  logout: function(e) {
    console.log('logging out');
    e.preventDefault();
    localStorage.removeItem('accessToken');
    window.location.replace('/login');
  }

});
