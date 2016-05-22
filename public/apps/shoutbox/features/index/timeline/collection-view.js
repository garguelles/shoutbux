import {CollectionView} from 'backbone.marionette';
import ShoutView from './view';

export default CollectionView.extend({
  childView: ShoutView,

  tagName: 'div',

  className: 'timeline',

  collectionEvents: {
    'sync': 'render'
  }
});
