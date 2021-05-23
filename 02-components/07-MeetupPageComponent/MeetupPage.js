import MeetupView from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

const MeetupPage = {
  name: 'MeetupPage',

  data() {
    return {
      meetup: null,
    };
  },

  mounted() {
    fetchMeetup(MEETUP_ID).then((meetup) => (this.meetup = meetup));
  },

  components: {
    MeetupView,
  },

  template: `<div v-if="meetup">
    <meetup-view :meetup="meetup"></meetup-view>
  </div>`,
};

export default MeetupPage;
