import Vue from './vendor/vue.esm.browser.js';

const fetchMeetup = (id) => fetch('https://course-vue.javascript.ru/api/meetups/' + id).then((res) => res.json());

new Vue({
  data() {
    return {
      meetupsCount: 5,
      selectedMeetupId: null,
      selectedMeetupTitle: null,
    };
  },

  watch: {
    selectedMeetupId: function () {
      this.getMeetupTitle();
    },
  },

  methods: {
    getMeetupTitle() {
      fetchMeetup(this.selectedMeetupId).then((meetup) => {
        this.selectedMeetupTitle = meetup.title;
      });
    },
  },
}).$mount('#app');
