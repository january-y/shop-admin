import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/home/home.vue'),
      children: [
        {
          path: '/test',
          name: 'test',
          component: () => import('@/components/test.vue'),
        },
      ],
      meta: {
        title: '后台首页',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login.vue'),
      meta: {
        title: '登入后台',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/notFound/notFound.vue'),
      meta: {
        title: '404 NotFound',
      },
    },
  ],
})
// 路由守卫
router.beforeEach((to, from) => {
  document.title = to.meta.title as string
  NProgress.start()
  const token = localStorage.getItem('token')
  if (to.path == '/' && !token) {
    ElMessage.error('请先登入!')
    return '/login'
  }
  if (to.path == '/login' && token) {
    ElMessage.success('已登入!')
    return '/'
  }
})
router.afterEach(() => {
  NProgress.done()
})

export default router
