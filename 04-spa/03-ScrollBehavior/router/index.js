import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',

  base: '/04-SPA/03-ScrollBehavior',

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

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.meta.saveScrollPosition || from.meta.saveScrollPosition) {
      if (to.meta.saveScrollPosition && from.meta.saveScrollPosition) {
        return false;
      } else {
        return { x: 0, y: 0 };
      }
    } else if (
      to.matched.some((record) => record.meta.saveScrollPosition) ||
      from.matched.some((record) => record.meta.saveScrollPosition)
    ) {
      return false;
    } else if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});
