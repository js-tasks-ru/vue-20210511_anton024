import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',

  base: '/04-SPA/03-ScrollBehavior',

  scrollBehavior(to, from, savedPosition) {
    // Если есть hash, прокручиваем к элементу по селектору
    if (to.hash) {
      return { selector: to.hash };
    }

    // Если есть savedPosition, возвращаем его же (при переходе назад)
    if (savedPosition) {
      return savedPosition;
    }

    // Если оба маршрута в мета правилах имели saveScrollPosition, не меняем положение.
    // Можно также использовать прямой вариант, если нужно точное совпадение, и дочерний маршрут может отменить правило
    // if (to.meta.saveScrollPosition && from.meta.saveScrollPosition)
    const hasSavePosition = (route) => route.matched.some((matched) => matched.meta.saveScrollPosition);
    if (hasSavePosition(to) && hasSavePosition(from)) {
      return false;
    }

    // По умолчанию прокручиваем вверх
    return { x: 0, y: 0 };
  },

  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/MeetupsPage'),
    },
    {
      path: '/meetups',
      name: 'meetups',
      component: () => import('../views/MeetupsPage'),
    },
    {
      path: '/meetups/:meetupId(\\d+)',
      name: 'meetup',
      props: true,
      redirect: (to) => ({ name: 'meetup.description', params: to.params }),
      meta: {
        showReturnToMeetups: true,
        saveScrollPosition: true,
      },
      component: () => import('../views/MeetupPage'),
      children: [
        {
          path: '',
          alias: 'description',
          name: 'meetup.description',
          props: true,
          component: () => import('../views/MeetupDescriptionPage'),
        },
        {
          path: 'agenda',
          name: 'meetup.agenda',
          props: true,
          component: () => import('../views/MeetupAgendaPage'),
        },
      ],
    },
  ],
});
