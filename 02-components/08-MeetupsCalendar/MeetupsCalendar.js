const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

const getDateObjectsFromPreviousMonth = (month, year, firstDayOfCurrentMonthWeekDay) => {
  const daysInPreviousMonth = getDaysInMonth(month - 1, year);
  const result = [];
  for (let j = firstDayOfCurrentMonthWeekDay - 1; j > 0; j--) {
    result.push({ date: new Date(year, month - 1, daysInPreviousMonth - j + 1), isActive: false });
  }
  return result;
};

const getDateObjectsFromNextMonth = (month, year, lastDayOfCurrentMonthWeekDay) => {
  const result = [];
  for (let j = 1; j <= 7 - lastDayOfCurrentMonthWeekDay; j++) {
    result.push({ date: new Date(year, month + 1, j), isActive: false });
  }
  return result;
};

const getDateObjects = (month, year) => {
  const firstDayOfCurrentMonth = new Date(year, month, 1);
  const lastDayOfCurrentMonth = new Date(year, month, getDaysInMonth(month, year));
  let result = [...getDateObjectsFromPreviousMonth(month, year, getNormalizedWeekDay(firstDayOfCurrentMonth.getDay()))];
  for (let i = 1; i <= lastDayOfCurrentMonth.getDate(); i++) {
    result.push({ date: new Date(year, month, i), isActive: true });
  }
  return [...result, ...getDateObjectsFromNextMonth(month, year, getNormalizedWeekDay(lastDayOfCurrentMonth.getDay()))];
};

const getNormalizedWeekDay = (weekDay) => {
  return weekDay === 0 ? 7 : weekDay;
};

const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  data() {
    return {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    };
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  methods: {
    dateMeetups(date) {
      return this.meetups.filter((meetup) => {
        const meetupDate = new Date(meetup.date);
        return (
          meetupDate.getFullYear() === date.getFullYear() &&
          meetupDate.getMonth() === date.getMonth() &&
          meetupDate.getDate() === date.getDate()
        );
      });
    },
  },

  computed: {
    monthYear() {
      return new Date(this.year, this.month).toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
      });
    },

    dateObjects() {
      const dateObjects = getDateObjects(this.month, this.year);
      return dateObjects.map((dateObject) => {
        return { ...dateObject, meetups: this.dateMeetups(dateObject['date']) };
      });
    },
  },

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="--month"></button>
          <div>{{monthYear}}</div>
          <button class="rangepicker__selector-control-right" @click="++month"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid" v-if="dateObjects">
        <div v-for="dateObject in dateObjects" :class="{'rangepicker__cell': true, 'rangepicker__cell_inactive':
        !dateObject['isActive']}">{{dateObject['date'].getDate()}}
          <a class="rangepicker__event" v-for="meetup in dateObject['meetups']">{{meetup.title}}</a>
        </div>
      </div>
    </div>
  </div>`,
};

export default MeetupsCalendar;
