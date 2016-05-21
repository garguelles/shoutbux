import {LayoutView} from 'backbone.marionette';
import tpl from './template';

export default LayoutView.extend({
  template: tpl,
  className: 'index',

  regions: {
    'profile': '.profile__region',
    'timeline': '.timeline__region'
  }
});
