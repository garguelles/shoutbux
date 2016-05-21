import {CollectionView} from 'backbone.marionette';
import ShoutView from './view';

export default CollectionView.extend({
  childView: ShoutView,

  tagName: 'div',

  className: 'col-md-9 timeline',

  collectionEvents: {
    'sync': 'render'
  },

  onRender() {
    console.log('timeline', this.collection.toJSON());
  }
});
