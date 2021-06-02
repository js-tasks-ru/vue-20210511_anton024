<template>
  <div class="container">
    <h1>Meetup Page {{ meetupId }}</h1>
    <template v-if="meetup">
      <h3>{{ meetup.title }}</h3>
      <p>
        <router-link :to="{ name: 'meetup.description', params: { meetupId } }">Description</router-link>
      </p>
      <p>
        <router-link :to="{ name: 'meetup.agenda', params: { meetupId } }">Agenda</router-link>
      </p>
      <router-view :meetup="meetup" />
    </template>
    <template v-else>
      <h3>Loading...</h3>
    </template>
  </div>
</template>

<script>
import { fetchMeetup } from '../data';

export default {
  name: 'MeetupPage',

  beforeRouteEnter(to, from, next) {
    fetchMeetup(to.params.meetupId).then((meetup) => {
      next((vm) => {
        vm.setMeetup(meetup);
      });
    });
  },

  beforeRouteUpdate(to, from, next) {
    if (to.params.meetupId === from.params.meetupId) {
      next();
    } else {
      fetchMeetup(to.params.meetupId).then((meetup) => {
        this.setMeetup(meetup);
        next();
      });
    }
  },

  props: {
    meetupId: {
      required: true,
    },
  },

  data() {
    return {
      meetup: null,
    };
  },

  methods: {
    setMeetup(meetup) {
      this.meetup = meetup;
    },
  },
};
</script>

<style scoped></style>
