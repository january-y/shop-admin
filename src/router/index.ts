import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/home.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/notFound/notFound.vue'),
    },
  ],
})

// 路由守卫
router.beforeEach((to, from) => {
  const token = localStorage.getItem('token')
  if (to.path == '/home' && !token) {
    return '/login'
  }
  if (to.path == '/login' && token) {
    return '/home'
  }
})

export default router
