import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router: any = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/Index/IndexView.vue'),
      meta: {
        title: '在线后台管理系统',
        isLogin: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/LoginView.vue'),
      meta: {
        title: '登录',
        isLogin: false
      }
    },
    {
      path: '/password',
      name: 'password',
      component: () => import('@/views/Login/PasswordView.vue'),
      meta: {
        title: '找回密码',
        isLogin: false
      }
    }
  ]
})

router.beforeEach((to: any, from: any, next: any) => {

  const isLogin: boolean = localStorage.tsToken ? true : false;

  // if (to.meta.title) document.title = to.meta.title;

  if (!to.meta.isLogin) {
    next();
  } else {
    isLogin ? next() : next('/login');
  }
})

export default router