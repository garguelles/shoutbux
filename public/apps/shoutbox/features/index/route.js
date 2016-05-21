import {Route} from 'backbone-routing';
import View from './layout-view';
import UserProfileView from './user-profile/view';
import TimelineView from './timeline/collection-view';
import Shouts from './timeline/collection';
import UserProfile from './user-profile/model';

export default Route.extend({

  initialize(options = {}) {
    this.container = options.container;
    this.userProfile = new UserProfile();
    this.shouts = new Shouts();

    this.userProfileView = new UserProfileView({
      model: this.userProfile
    });

    this.timelineView = new TimelineView({
      collection: this.shouts
    });
  },

  fetch() {
    this.userProfile.fetch();
  },

  render() {
    this.view = new View();
    this.container.show(this.view);
    this.view.getRegion('profile').show(this.userProfileView);
    this.view.getRegion('timeline').show(this.timelineView);
  }
});
