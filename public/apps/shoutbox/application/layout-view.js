import {LayoutView} from 'backbone.marionette'
import tpl from './layout-template.jade'

export default LayoutView.extend({

  el: '.application',

  template: tpl,

  regions: {
    content: '.content__region',
    header: '.header__region',
    footer: '.footer__region'
  }
});
