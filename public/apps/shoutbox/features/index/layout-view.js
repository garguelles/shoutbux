import {LayoutView} from 'backbone.marionette';
import tpl from './template';

export default LayoutView.extend({
  template: tpl,
  className: 'index',

  regions: {
    'profile': '.profile__region',
    'feeds': '.feeds__region',
    'shout': '.shout__region'
  }
});
