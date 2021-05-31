import VueRouter from 'vue-router';
import BasePage from '../views/BasePage';
import PageA from '../views/PageA';
import PageB from '../views/PageB';

const router = new VueRouter({
  mode: 'history',
  base: '04-spa/01-ContentTabs',
  routes: [
    {
      path: '/',
      component: BasePage,
      children: [
        {
          path: 'a',
          component: PageA,
        },
        {
          path: 'b',
          name: 'b',
          component: PageB,
        },
      ],
    },
  ],
});

export default router;
