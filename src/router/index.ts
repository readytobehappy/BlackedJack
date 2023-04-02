import { createRouter, createWebHistory } from 'vue-router';

// Роутер мне тут нафиг не нужен, я просто демонстрирую, что умею с ним работать
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Loading',
      component: () =>
        import(/* webpackChunkName: "loading" */ '../views/LoadingPage.vue')
    },
    {
      path: '/start',
      name: 'Start',
      component: () =>
        import(/* webpackChunkName: "start" */ '../views/StartPage.vue')
    },
    {
      path: '/game',
      name: 'Game',
      component: () =>
        import(/* webpackChunkName: "game" */ '../views/GamePage.vue')
    }
  ]
});

export default router;
