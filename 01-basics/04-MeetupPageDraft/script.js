import Vue from './vendor/vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

const fetchMeetup = (id) => fetch(`${API_URL}/meetups/${id}`).then((res) => res.json());
const checkUrl = (url) => fetch(url).then((res) => res.status);

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение по идентификатору, например, изображение митапа
 * @param imageId {number} - идентификатор изображения
 * @return {string} - ссылка на изображение
 */
function getImageUrlByImageId(imageId) {
  return `${API_URL}/images/${imageId}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов пунктов программы
 */
const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов пунктов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

new Vue({
  data() {
    return {
      rawMeetup: null,
      meetupImageUrl: null,
    };
  },

  computed: {
    meetup() {
      if (!this.rawMeetup) {
        return null;
      }
      const tmpMeetup = { ...this.rawMeetup };
      tmpMeetup.agenda.map((item) => {
        item.title = this.checkAgendaItemTitle(item.title, item.type);
        item.icon = this.getAgendaItemIcon(item.type);
      });
      return { ...tmpMeetup, cover: this.meetupImageUrl, coverStyle: { '--bg-url': this.meetupImageUrl } };
    },

    localizedDate() {
      if (!this.rawMeetup) {
        return null;
      }
      return new Date(this.rawMeetup.date).toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },

  mounted() {
    fetchMeetup(MEETUP_ID)
      .then((meetup) => {
        this.rawMeetup = meetup;
        return meetup.id;
      })
      .then((meetupId) => {
        const url = getImageUrlByImageId(meetupId);
        checkUrl(url).then((status) => {
          this.meetupImageUrl = status === 200 ? `url(${url})` : ``;
        });
      });
  },

  methods: {
    checkAgendaItemTitle(itemTitle, itemType) {
      return itemTitle ? itemTitle : agendaItemDefaultTitles[itemType];
    },

    getAgendaItemIcon(itemType) {
      return `/assets/icons/icon-${agendaItemIcons[itemType]}.svg`;
    },
  },
}).$mount('#app');
