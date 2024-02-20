import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { toast } from 'vue3-toastify';
import { setDecode } from '@/util';
import { useLayoutStore } from '@/store/layout';
import { useHead } from '@vueuse/head';
import { map } from 'lodash-es';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home.vue'),
      meta: {
        authRequired: false,
        layout: 'hasLayout',
        nav: false,
      },
    },

    {
      path: '/game',
      name: 'game',
      component: () => import('../views/game.vue'),
      meta: {
        authRequired: true,
        layout: 'clearLayout',
        nav: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue'),
      meta: {
        authRequired: false,
        layout: 'hasLayout',
        nav: true,
      },
    },

    {
      path: '/sign-up',
      name: 'signUp',
      component: () => import('../views/signUp/index.vue'),
      meta: {
        nav: true,
        layout: 'hasLayout',
        authRequired: false,
      },
    },

    {
      path: '/logout',
      name: 'logout',
      redirect: '/login',
      meta: {
        nav: true,
        layout: 'hasLayout',
        authRequired: true,
      },
    },

    { path: '/:pathMatch(.*)*', redirect: '/404' },
    { path: '/:catchAll(.*)*', redirect: '/404' },

    {
      path: '/404',
      name: '404',
      component: () => import('../views/404.vue'),
      meta: {
        layout: 'hasLayout',
        authRequired: true,
      },
    },
  ],
});

router.beforeEach(async (to, _from, next) => {
  const storageInfo = localStorage.getItem('k');
  const storeInfo =
    useAuthStore.userID &&
    useAuthStore.accessToken &&
    useAuthStore.refreshToken &&
    useAuthStore.gameName &&
    useAuthStore.turnInGroup &&
    useAuthStore.currentGroupIndex;

  if (storageInfo && !storeInfo) {
    try {
      const data = JSON.parse(setDecode(storageInfo, 'login-info'));
      useAuthStore.userID = data.userID;
      useAuthStore.accessToken = data.accessToken;
      useAuthStore.refreshToken = data.refreshToken;
      useAuthStore.gameName = data.gameTable;
      useAuthStore.turnInGroup = data.turnInGroup;
      useAuthStore.currentGroupIndex = data.currentGroupIndex;
      useAuthStore.signedIn = true;
    } catch (e) {
      console.log(e);
      localStorage.clear();
      useAuthStore.userID = '';
      useAuthStore.accessToken = '';
      useAuthStore.refreshToken = '';
      useAuthStore.currentGroupIndex = 0;
      useAuthStore.turnInGroup = 0;
      useAuthStore.gameName = '';
      useAuthStore.signedIn = false;
    }
  }
  if (!storageInfo) {
    localStorage.clear();
    useAuthStore.userID = '';
    useAuthStore.accessToken = '';
    useAuthStore.refreshToken = '';
    useAuthStore.currentGroupIndex = 0;
    useAuthStore.turnInGroup = 0;
    useAuthStore.gameName = '';
    useAuthStore.signedIn = false;
  }

  if (to.meta.authRequired && !useAuthStore.signedIn) {
    next({ name: 'login' });
    useLayoutStore.currentNav = 'login';
    setTimeout(() => toast.error('로그인 해주세요.'), 500);
    return;
  }
  if (to.path === '/login' || to.path === '/sign-up') {
    localStorage.clear();
    useAuthStore.userID = '';
    useAuthStore.accessToken = '';
    useAuthStore.refreshToken = '';
    useAuthStore.currentGroupIndex = 0;
    useAuthStore.turnInGroup = 0;
    useAuthStore.gameName = '';
    useAuthStore.signedIn = false;
  }

  const rawPageName = to.name.toString().split('');
  const pageName = map(
    rawPageName,
    (e) => (e = isNaN(+e) && e === e.toUpperCase() ? `-${e.toUpperCase()}` : e.toUpperCase()),
  );

  useHead({ title: pageName.join('') });
  useLayoutStore.currentNav = to.name.toString();

  next();
});

export default router;
