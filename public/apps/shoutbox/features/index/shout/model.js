import {Model} from 'backbone';

export default Model.extend({

  urlRoot: '/shouts',

  idAttribute: '_id',

  default: {
    body: ''
  },

  validate(attrs, options) {
    if (attrs.body.length > 34) {
      return 'Shout is more than 34 characters';
    }
  }
});
