import {CollectionView} from 'backbone.marionette';
import ShoutView from './view';
import Radio from 'backbone.radio';

const ShoutChannel = Radio.channel('shouts')

export default CollectionView.extend({
  childView: ShoutView,

  tagName: 'div',

  className: 'timeline',

  collectionEvents: {
    'sync': 'render',
  },

  initialize() {
    ShoutChannel.on('shout:posted', this._addShout, this);
  },

  attachHtml(collectionView, childView, index) {
    if (collectionView.isBuffering) {
      // buffering happens on reset events and initial renders
      // in order to reduce the number of inserts into the
      // document, which are expensive.
      collectionView._bufferedChildren.splice(index, 0, childView);
    }
    else {
      // prepend instead of append
      collectionView.$el.prepend(childView.el);
    }
  },

  _addShout(model) {
    this.collection.add(model);
  }

});
