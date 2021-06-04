<template>
  <div class="meetups-list">
    <meetup-list-item v-for="meetup in meetups" :key="meetup.id" :meetup="meetup" />
  </div>
</template>

<script>
import MeetupListItem from './MeetupsListItem';

export default {
  name: 'MeetupsList',

  components: {
    MeetupListItem,
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.meetups-list {
}
</style>
