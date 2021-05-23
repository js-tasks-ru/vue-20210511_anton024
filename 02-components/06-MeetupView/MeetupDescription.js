const MeetupDescription = {
  name: 'MeetupDescription',

  props: {
    description: {
      type: String,
    },
  },

  template: `<p class="meetup-description">{{description}}</p>`,
};

export default MeetupDescription;
