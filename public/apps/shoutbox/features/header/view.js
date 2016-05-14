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
    collapse: '#navbar-collapse'
  },

  templateHelpers() {
    return {
      menus: this.collection.toJSON()
    }
  }

});
