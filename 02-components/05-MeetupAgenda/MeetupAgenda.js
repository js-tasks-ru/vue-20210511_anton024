import MeetupAgendaItem from './MeetupAgendaItem.js';

const MeetupAgenda = {
  name: 'MeetupAgenda',

  components: {
    MeetupAgendaItem,
  },

  props: {
    agenda: {
      type: Array,
    },
  },

  template: `
    <div class="meetup-agenda">
      <meetup-agenda-item :key="agendaItem.id" :agenda-item="agendaItem" v-for="agendaItem in agenda"></meetup-agenda-item>
    </div>`,
};

export default MeetupAgenda;
