import {Router} from 'backbone-routing';
import HeaderService from '../header/service';
import IndexRoute from './route';

export default Router.extend({
  initialize(options = {}) {
    this.container = options.container;
    this.listenTo(this, 'before:enter', this.onBeforeEnter);
  },

  onBeforeEnter() {
    HeaderService.request('activate', {
      path: ''
    });
  },

  routes: {
    '': 'index'
  },

  index() {
    return new IndexRoute({
      container: this.container
    });
  }
});
