import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import { routeOptions } from '@/hooks/mapRouter'
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
          path: '/main/control',
          name: '/main/control',
          component: () => import('@/views/admin-panel/main-control/main-control.vue'),
        },
        {
          path: '/',
          redirect: '/main/control',
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
        title: '',
      },
    },
  ],
})

// 验证权限添加路由
export const checkRouter = (routerArr: any[]) => {
  //
  for (let item of routerArr) {
    if (item.frontpath == '/') continue
    for (let route of routeOptions) {
      if (route.path == item.frontpath) {
        router.addRoute('index', route)
      }
    }
    // child
    if (item.child) checkRouter(item.child)
  }
}

// 路由守卫
router.beforeEach((to, from) => {
  document.title = to.meta.title as string
  NProgress.start()
  const token = localStorage.getItem('token')
  if (to.path !== '/login' && !token) {
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
