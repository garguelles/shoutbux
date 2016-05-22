import {Route} from 'backbone-routing';
import View from './layout-view';
import UserProfileView from './user-profile/view';
import TimelineView from './timeline/collection-view';
import ShoutView from './shout/view';
import Shouts from './timeline/collection';
import UserProfile from './user-profile/model';
import Shout from './shout/model';

export default Route.extend({

  initialize(options = {}) {
    this.container = options.container;
    this.userProfile = new UserProfile();
    this.shouts = new Shouts();
    this.shout = new Shout();

    this.userProfileView = new UserProfileView({
      model: this.userProfile
    });

    this.timelineView = new TimelineView({
      collection: this.shouts
    });

    this.shoutView = new ShoutView({
      model: this.shout
    });
  },

  fetch() {
    this.userProfile.fetch();
    this.shouts.fetch();
  },

  render() {
    this.view = new View();
    this.container.show(this.view);
    this.view.getRegion('profile').show(this.userProfileView);
    this.view.getRegion('feeds').show(this.timelineView);
    this.view.getRegion('shout').show(this.shoutView);
  }
});
