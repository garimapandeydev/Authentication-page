import { createRouter, createWebHistory } from 'vue-router';
import store from './store/store';
import { IS_USER_AUTHENTICATE_GETTER } from './store/storeconstants';

import HoMe from './components/HoMe.vue';
import LogIn from './pages/LogIn.vue';
import SignUp from './pages/SignUp.vue';
import PoSt from './pages/PoSt.vue';

const routes = [
  { path: '', component:HoMe },

  { path: '/login', component: LogIn, meta: { auth: false } },
  { path: '/Signup', component: SignUp, meta: { auth: false } },
  { path: '/posts', component: PoSt, meta: { auth: true } },



];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (
      'auth' in to.meta &&
      to.meta.auth &&
      !store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
  ) {
      next('/login');
  } else if (
      'auth' in to.meta &&
      !to.meta.auth &&
      store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
  ) {
      next('/posts');
  } else {
      next();
  }
});
export default router;

