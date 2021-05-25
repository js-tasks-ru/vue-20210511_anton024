/** Короткий псевдоним для создания Date (клонирования, преобразования) */
const mkDate = (date) => new Date(date);
/** Получение дня недели числом от 1 (ПН) до 7 (ВС) из даты {Date} */
const getWeekday = (date) => date.getUTCDay() || 7;
/** Увеличение и уменьшение даты на определённое число дней или месяцев */
const addDays = (date, days) => mkDate(date.getTime() + 1000 * 60 * 60 * 24 * days);
const addMonth = (date, n) => mkDate(mkDate(date).setUTCMonth(date.getUTCMonth() + n));
/** Получение первой даты месяца */
const getFirstDateOfMonth = (date) => mkDate(mkDate(date).setUTCDate(1));

const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `
    <div class="rangepicker">
      <div class="rangepicker__calendar">
        <div class="rangepicker__month-indicator">
          <div class="rangepicker__selector-controls">
            <button class="rangepicker__selector-control-left" @click="setPreviousMonth"></button>
            <div>{{ localCurrentMonthAndYear }}</div>
            <button class="rangepicker__selector-control-right" @click="setNextMonth"></button>
          </div>
        </div>
        <div class="rangepicker__date-grid">
          <div
            v-for="cell in calendarCells"
            :key="cell.id"
            class="rangepicker__cell"
            :class="{ rangepicker__cell_inactive: !cell.isCurrentMonth }"
          >
            {{ cell.date }}
            <a
              v-for="meetup in cell.meetups"
              :key="meetup.id"
              href="#"
              class="rangepicker__event"
            >{{ meetup.title }}</a>
          </div>
        </div>
      </div>
    </div>`,

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      currentDate: getFirstDateOfMonth(new Date()),
    };
  },

  computed: {
    meetupsByDate() {
      const result = {};
      for (const meetup of this.meetups) {
        const dateString = new Date(meetup.date).toDateString();
        if (!result[dateString]) {
          result[dateString] = [meetup];
        } else {
          result[dateString].push(meetup);
        }
      }
      return result;
    },

    calendarCells() {
      const firstDateOfNextMonth = getFirstDateOfMonth(addMonth(this.currentDate, 1));
      const lastDateOfMonth = addDays(firstDateOfNextMonth, -1);
      const startDate = addDays(this.currentDate, -(getWeekday(this.currentDate) - 1));
      const finishDate = addDays(lastDateOfMonth, 7 - getWeekday(lastDateOfMonth));
      const cells = [];

      for (let dayOfCalendar = startDate; dayOfCalendar <= finishDate; dayOfCalendar = addDays(dayOfCalendar, 1)) {
        cells.push({
          Date: dayOfCalendar,
          timestamp: +dayOfCalendar,
          year: dayOfCalendar.getUTCFullYear(),
          month: dayOfCalendar.getUTCMonth(),
          date: dayOfCalendar.getUTCDate(),
          isCurrentMonth: dayOfCalendar.getUTCMonth() === this.currentDate.getUTCMonth(),
          meetups: this.meetupsByDate[dayOfCalendar.toDateString()],
        });
      }

      return cells;
    },

    localCurrentMonthAndYear() {
      return `${this.currentDate.toLocaleDateString(navigator.language, {
        month: 'long',
      })} ${this.currentDate.getFullYear()}`;
    },
  },

  methods: {
    setPreviousMonth() {
      this.currentDate = addMonth(this.currentDate, -1);
    },

    setNextMonth() {
      this.currentDate = addMonth(this.currentDate, 1);
    },
  },
};

export default MeetupsCalendar;
