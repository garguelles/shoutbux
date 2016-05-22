import {Collection} from 'backbone';
import Shout from '../shout/model';

/*
 * timeline collection
 */
export default Collection.extend({
  model: Shout,

  url: '/me/timeline'
});
