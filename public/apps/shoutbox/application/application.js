import {history} from 'backbone';
import Radio from 'backbone.radio';
import {Application} from 'backbone.marionette';
import LayoutView from './layout-view';
import _ from 'lodash'

const routerChannel = Radio.channel('router');

const App = Application.extend({

  initialize() {
    this.body = $('body');
    this.layout = new LayoutView();
    this.layout.render();
    this.routers = {};
  },

  onStart() {
    if (history)
      history.start();
  }
});

export default App;
